/**
 * Created by zhengguo.chen on 2015/11/11.
 */
var $ = require("jquery");
var $win = $(window);
const SCROLL_EVENT = "scroll.autoFixTop";

$.fn.autoFixTop = $.fn.autoFixTop || function(option) {
  var $me = this;

  //command
  if(typeof option === "string") {
    switch(option) {
      case "destroy":
        $me.css({position: "static"});
        $win.off(SCROLL_EVENT);
        break;
      default:
        break;
    }
    return $me;
  }

  option = $.extend({
    scrollTop: 50,
    top: 20,
    right: 73
  }, option);

  $me.css({
    top: option.top,
    right: option.right
  });
  $win.on(SCROLL_EVENT, () => $me.css({
    position: $win.scrollTop() >= option.scrollTop ? "fixed" : "static"
  })).trigger(SCROLL_EVENT);

  return $me;
}