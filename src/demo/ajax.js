/**
 * Created by zhengguo.chen on 2015/11/11.
 */
var $ = require("jquery");

const SUCCESS = 200;

var $loadData = $("#load-data"),
    $data = $("#data");

$loadData.on("click", () =>
  $.ajax({
    method: "GET",
    url: "/api/getMembers"
  }).then(res => {
    if(res.code === SUCCESS) {
      $data.html(JSON.stringify(res, null, 2)).removeClass("hidden");
    }
  })
);
