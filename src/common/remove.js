/**
 * Created by zhengguo.chen on 2015/11/11.
 */
var $ = require("jquery");

module.exports = function(e) {
  var $ele = $(e.target);
  $ele.fadeOut($ele.remove);
}