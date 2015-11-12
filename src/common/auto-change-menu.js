/**
 * 鼠标滚动到底部或顶部时，根据菜单自动跳转
 * Created by zhengguo.chen on 2015/11/11.
 */
var $ = require("jquery");
require("jquery-mousewheel");

var undef,
    win = window,
    $win = $(win),
    $doc = $(document);

var _edgeTimes = 0;

const SCROLL_EVENT = "mousewheel.autoChangeMenu",
      EDGE_TIMES = 3;

/**
 * 查找下一个链接
 * @param $ele ul的wrapper
 * @param prev 是前一个还是下一个
 * @private
 */
var _findNextHref = ($ele, prev) => $ele.find("> ul > li.active")[prev ? "prev" : "next"]()
                                        .find("> a").attr("href");
/**
 * 绑定事件到一个ul的wrapper
 * @param $ele ul的wrapper
 */
var bind = $ele => $win.on(SCROLL_EVENT, function(e, delta) {
  let scrollTop = $win.scrollTop(),
      url;
  if(scrollTop === 0 || scrollTop >= $doc.height() - $win.height()) {
    url = _findNextHref($ele, delta === 1);
    _edgeTimes++;
  } else {
    _edgeTimes = 0;
  }
  url !== undef && _edgeTimes >= EDGE_TIMES && (win.location.href = url);
});

/**
 * 解除绑定
 */
var unbind = () => $win.off(SCROLL_EVENT);

module.exports = {
  bind,
  unbind
};