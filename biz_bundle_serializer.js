/*
 *   业务包序列化，过滤在base.mainfest.json记录了的模块，这些依赖模块已经打入base.jsbundle
 *
 *   Created by bryanlau on 2019/4/12.
 */

"use strict";

const fs = require('fs');
const createStaticModuleIdFactory = require('./static_module_id_factory').createModuleIdFactory;
const moduleIdFactory = createStaticModuleIdFactory();
const baseModuleMd5Set = new Set(fs.readFileSync('base.mainfest.json').toString().split('\n'));

function processModuleFilter(module) {
    return !baseModuleMd5Set.has(moduleIdFactory(module['path']));
}

module.exports = {
    serializer: {
        createModuleIdFactory: createStaticModuleIdFactory,
        processModuleFilter: processModuleFilter
    }
};