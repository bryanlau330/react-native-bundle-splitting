/*
 *   基础包序列化，把所有打包模块写入base.mainfest.json
 *
 *   Created by bryanlau on 2019/4/12.
 */

"use strict";

const fs = require('fs');
const createStaticModuleIdFactory = require('./static_module_id_factory').createModuleIdFactory;
const moduleIdFactory = createStaticModuleIdFactory();

function processModuleFilter(module) {
    fs.writeFileSync('base.mainfest.json', moduleIdFactory(module['path']) + '\n', {
        flag: 'a'
    });
    return true;
}

module.exports = {
    serializer: {
        createModuleIdFactory: createStaticModuleIdFactory,
        processModuleFilter: processModuleFilter
    }
};