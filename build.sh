#!/bin/bash

#
#   统一打包脚本，先编译base.jsbundle基础包，再编译在biz_registry.js文件中导入的各业务包
#
#   参数定义：
#       $1  目标打包平台[android或者ios]
#
#   Created by bryanlau on 2019/4/12.
#

resultDir=./rn-bundle-splitting-result-$1
registryFile=./biz_js/biz_registry.js
bundlerCmd="node ./node_modules/react-native/local-cli/cli.js bundle --platform $1 --dev false"

if [ -e $resultDir ]; then
    rm -r $resultDir/*
else
    mkdir $resultDir
fi

#编译生成Base包
mkdir $resultDir/base
echo
$bundlerCmd --entry-file ./base.js --bundle-output $resultDir/base/base.jsbundle --verbose --assets-dest $resultDir/base --config ./base_bundle_serializer.js
echo

#生成所有在入口文件中导入的业务包
while read importLine || [[ -n ${importLine} ]]; do
    if [[ "$importLine" = "" || ${importLine:0:1} != "i" ]]; then
        continue
    fi

    entryJSFilePath=$(echo $importLine | cut -d "'" -f 2)
    entryJSFilePath=biz_js/$entryJSFilePath
    businessBundleName=""

    #模块名从js实现文件中截取，不用单独配置
    while read registryLine || [[ -n ${registryLine} ]]; do
        if [[ "$registryLine" = "" || ${registryLine:0:29} != "AppRegistry.registerComponent" ]]; then
            continue
        fi

        businessBundleName=$(echo $registryLine | cut -d "'" -f 2)
    done<$entryJSFilePath

    mkdir $resultDir/$businessBundleName
    businessBundlePath=$resultDir/${businessBundleName}/${businessBundleName}.jsbundle
    assetPath=$resultDir/${businessBundleName}/
    $bundlerCmd --entry-file $entryJSFilePath --bundle-output $businessBundlePath --verbose --assets-dest $assetPath --config ./biz_bundle_serializer.js
done<$registryFile

rm base.mainfest.json
