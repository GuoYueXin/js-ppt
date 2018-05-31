
var $wrapper = $('.wrapper'),
	$silder = $('.silder'),
	silderLen = $silder.length;

/*动态添加dom结构*/
function createDom(len) {
	if(len > 1){
		var str = '';
		for(var i = 0; i < len ; i++){
			if(i == 0){
				str += '<li class="active"></li>';
			}else{
				str += '<li></li>'
			}
		}
		var pointStr = '<div class="silder_point"><ul>'+str+'</ul></div>';
		var btnStr = '<div class="silder_btn">\
			<span class="left_btn"></span>\
			<span class="right_btn"></span>\
		</div>';
		$wrapper.append(pointStr).append(btnStr);
	}
}
createDom(silderLen);

var $leftBtn = $('.left_btn'),
	$rightBtn = $('.right_btn'),
	$point = $('.silder_point li'),
	activeIndex = 0,
	lastIndex;
var flag = true;
/*为btn按钮以及下方的原点绑定点击事件*/
$leftBtn.on('click',function(){
	clickFun('left');
})

$rightBtn.on('click',function(){
	clickFun('right');
})

$point.on('click',function(){
	var index = $(this).index();
	clickFun(index);
})

/*点击方法*/
function clickFun(index){
	if(flag){
		$.getSilderIndex(index);
		if(lastIndex != activeIndex){
			flag == false;
			$silder.eq(lastIndex).trigger('go').end().eq(activeIndex).trigger('come');
			pointStyle(activeIndex);
		}
	}
}

/*获取索引值*/
$.extend({
	getSilderIndex:function(direction){
		lastIndex = activeIndex;
		if(direction == 'left' || direction == 'right'){
			if(direction == 'left'){
				activeIndex = activeIndex == 0 ? silderLen - 1 : activeIndex-1;
			}else{
				activeIndex = activeIndex == silderLen-1 ? 0 : activeIndex +1;
			}
		}else{
			activeIndex = direction;
		}
	}
})

$silder.on('go',function(){
	$silder.eq(lastIndex).fadeOut(100).find($('.content-left')).delay(300).css({fontSize:'10px'}).end().find($('.content-right')).delay(300).css({width:'0%'});
})

$silder.on('come',function(){
	$silder.eq(activeIndex).delay(300).fadeIn(300).find($('.content-left')).delay(300).animate({fontSize:'20px'},300).end().find($('.content-right')).delay(300).animate({width:'40%'},function(){
		flag == true;
	});
})

/*改变下方原点样式方法*/
function pointStyle(activeIndex){
	$('.active').removeClass('active');
	$point.eq(activeIndex).addClass('active');
}