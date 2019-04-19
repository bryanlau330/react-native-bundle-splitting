/*
 *   根据文件内容生成Module Id
 *
 *   Created by bryanlau on 2019/4/12.
 */

"use strict";

const fs = require('fs');
const crypto = require('crypto');
const pathSep = require('path').sep;

function createStaticModuleIdFactory() {
    const projectRootPath = __dirname;
    let fileMd5Cache = new Map()
    return path => {
        const magicPrefix = 'require-';
        if (path.indexOf(magicPrefix) == 0) {
            path = path.substr(magicPrefix.length);
        }

        if (!fs.existsSync(path)) {
            if (path.indexOf('node_modules' + pathSep + 'react-native' + pathSep + 'Libraries' + pathSep) > 0) {
                path = path.substr(path.lastIndexOf(pathSep) + 1);
            } else if (path.indexOf(projectRootPath) == 0) {
                path = path.substr(projectRootPath.length + 1);
            }

            let regExp = pathSep == '\\' ? new RegExp('\\\\', "gm") : new RegExp(pathSep, "gm");
            return path.replace(regExp, '_');
        }

        if (fileMd5Cache[path]) {
            return fileMd5Cache[path];
        }

        const hash = crypto.createHash('md5');
        hash.update(fs.readFileSync(path));
        const md5HashValue = hash.digest('base64');
        fileMd5Cache[path] = md5HashValue;
        return md5HashValue;
    };
}

module.exports = {
    createModuleIdFactory: createStaticModuleIdFactory
};