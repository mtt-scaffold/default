/**
 * Created by zhengguo.chen on 2015/11/11.
 */
var $ = require("jquery");
//jquery plugin
require("/src/common/auto-fix-top");
//common plugin
var autoChangeMenu = require("/src/common/auto-change-menu");

var $rightMenu = $(".right-menu");
$rightMenu.autoFixTop();
autoChangeMenu.bind($rightMenu);