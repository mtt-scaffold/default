/**
 * 演示ES6使用
 * Created by zhengguo.chen on 2015/11/12.
 */
import $ from "jquery";
import VERSION, {es6Alert} from "/src/common/mod-es6.js";
var modCommon = require("/src/common/mod-common.js");

console.log("Current mod version is:", VERSION);

class Test {
  constructor($ele, name) {
    this.$me = $ele;
    this.name = name;
    this.bindEvent();
  }
  bindEvent() {
    this.$me.on("click", () => {
      es6Alert(this.name);
      modCommon(this.name);
    })
  }
}

var test = new Test($("#test-es6"), "Have a try");