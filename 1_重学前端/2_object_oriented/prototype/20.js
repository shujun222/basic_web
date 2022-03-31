// 假设这是个第三方插件，别人也在滥用原型
Object.prototype.hide = function() {
    this.setAttribute("display", true);
}