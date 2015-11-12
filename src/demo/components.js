/**
 * Created by zhengguo.chen on 2015/11/11.
 */
var $ = require("jquery"),
    remove = require('/src/common/remove');

$("#test-remove").on("click", remove);

var autoChangeMenu = require("/src/common/auto-change-menu");
require("/src/common/auto-fix-top");
$("#test-destroy").on("click", () => {
  $(".right-menu").autoFixTop("destroy");
  autoChangeMenu.unbind();
});