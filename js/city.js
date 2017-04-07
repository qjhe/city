function initCity(cityData){
	cityData.sort(compareEle);
	drawHtml(cityData);
}
function drawHtml(cityData){
	var cur_ = '', sortL = [];
	var html_ = $.map(cityData,function(o, i){
		var sp = o.sortLetter.substring(0,1), fL ="";
		if(cur_!= sp){
			cur_ = sp;
			fL = '<span id="'+ sp +'" class="sort">'+ sp +'</span>';
			sortL.push(sp);
		}

		return '<li class="tit">'+ fL +
			'<div class="city">' + '<a href="data.html?areaCode='+ o.areaCode +'"></a>' + o.areaName +'</div>'+
			'</li>';
	}).join('');
	$("#city-con").html(html_);
	var sortLHtml = $.map(sortL,function(o, i){
		return '<li data-pi="'+ o +'"><a href="#'+ o +'"></a><span>'+ o +'</span></li>';
	}).join('');
	$("#d_city").html(sortLHtml);
}

events();
function events(){
	$(document).on("input","#val",function(){
		var _this = $(this);
		var val_ = _this.val();
		searchArea(val_);
		val_!="" ? _this.siblings(".clear_img").show() : _this.siblings(".clear_img").hide();
	});
	$(document).on("click",".clear_img",function(){
		$("#val").val("");
	});
	$(document).on("click","#d_city li",function(){
		var pi = $(this).data("pi");
		$(".fund_mask").show().find("div").html(pi);
		setTimeout(function(){
			$(".fund_mask").hide();
		},500);
	});
}
//搜索
function searchArea(val){
	if(val==""){
		drawHtml(cityData);
	}else{
		var arr_ = [];
		$.map(cityData,function(o, i){
			if( o.areaName.indexOf(val)>=0 || o.sortLetter.toLowerCase().indexOf(val.toLowerCase())>=0 ){
				arr_.push(o);
			}
		});
		drawHtml(arr_);
	}
}
//设置当前城市
function locate(data){
	var areaList = $("#area-list li").eq(0);

	if(data.status==0){
		var curCity = data.content.address;
		var obj = null;
		$.map(cityData,function(o, i){
			if( o.areaName.indexOf(curCity)>=0 || o.sortLetter.toLowerCase().indexOf(curCity.toLowerCase())>=0 ){
				obj = o;
			}
		});
		if(obj!=null){
			areaList.html('<a href="data.html?areaCode='+ obj.areaCode +'"></a><div class="curr_city" style="display:block;"><span>当前城市：</span><span style="color:#333;">'+ curCity +'(点击进入)</span></div>');
		}
	}else{
		areaList.hide();
	}
}
//排序函数
function compareEle(a, b) {
	var a1 = a.sortLetter.charAt(0);
	var b1 = b.sortLetter.charAt(0);
	if (a1.localeCompare(b1) > 0) {
		return 1;
	} else if (a1.localeCompare(b1) < 0) {
		return -1;
	} else {
		return 0;
	}
}