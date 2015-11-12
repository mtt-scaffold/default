/**
 * Created by zhengguo.chen on 2015/11/12.
 */
var $ = require("jquery"),
    template = require("art-template");

// 设置helper
template.utils.$helpers.coloring = content => '<span style="color:red">' + content + "</span>";

// 通过__inline获得预编译方法，并绑定utils上下文。
var render = __inline("./_art.tmpl").bind(template.utils);

var data = {
  mtt: true,
  list: [
    {user: "@DevilZh"},
    {user: "@irenexixi"},
    {user: "@Luomando"},
    {user: "@mmillet"}
  ]
};

var html = render(data);

$("#output").html(html);

//模版作为单独的js
var artRender = require("/src/demo/art");
var html = artRender({mtt: true});
console.log(html);