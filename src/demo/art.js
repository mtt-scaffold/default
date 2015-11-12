/**
 * Created by zhengguo.chen on 2015/11/12.
 */
var template = require("art-template");
// 设置helper
template.utils.$helpers.coloring = content => '<span style="color:red">' + content + "</span>";

module.exports = __inline("./_art.tmpl").bind(template.utils);