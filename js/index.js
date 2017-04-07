/* rem布局设置函数 */
function remFn(num){
	var docWidth = document.documentElement.clientWidth>640 ? 640 : document.documentElement.clientWidth;
	window.document.documentElement.style.fontSize = docWidth/num+'px';
}
remFn(10)
//重新计算rem
var viewtimer =null;
window.addEventListener("resize",function() {
	clearTimeout(viewtimer);
	viewtimer = setTimeout(function(){ remFn(10); }, 300);
},false);
//加载中 loading   loader.init();//初始化放在顶部  loader.showL();显示  loader.hideL();隐藏  
var loader = {
    loaderHTML : '<div class="loader"><div class="ball-spin-fade-loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>',
    mebaHTML : '<div class="meba-transparent"></div>',
    init : function(){
        $("body").append(loader.loaderHTML+loader.mebaHTML);
    },
    showL : function(){
        $(".loader,.meba-transparent").show();
    },
    hideL : function(){
        $(".loader,.meba-transparent").hide();
    }
};
//提示信息
function errInfo(errBox,errfo){
	$(errBox).html(errfo).addClass("active");
	setTimeout(function(){
		$(errBox).removeClass("active");
	},1500);
}
function getURLQueryString(name,url){
	var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)","i");
	var r = "";
	if(url){
		var i = url.indexOf("?");
		var j = url.indexOf("&");
		if(i>-1){
			r = decodeURI(url.substring(i)).substr(1).match(reg);;
		}else if(j>0){
			r = decodeURI(url).substr(1).match(reg);
		}
	}else{
		r = decodeURI(document.location.search).substr(1).match(reg);
	}
	if(r){
	   return unescape(r[2]);
	}
	return null;
}