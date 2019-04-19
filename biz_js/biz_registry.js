/**
*
*	本文件用于登记WeGameApp项目所有需要参与调试或CI打包的JS模块的入口文件
*
*	注意：
*		1，build.sh脚本以字符串的形式处理本文件，所以导入模块的语法格式必须是：
*			import './文件相对路径/文件名.js';
*			
*		2，build.sh脚本会搜索入口文件中的AppRegistry.registerComponent调用并截取第一个参数作为输出bundle的文件名
*		   
*
*   Created by bryanlau on 2019/4/12.
*/

import './main_page.js';
import './detail_page.js';