//tab切换
$(function(){
	$('.tab ul li').click(function(){
		$(this).addClass('active').siblings('li').removeClass('active')		
		$('.qh').eq($(this).index()).show().siblings('.qh').hide()
	});
});

//回到顶部
$(function(){
	$('.scroll_top').on('click',function(){
		$('html,body').animate({
			scrollTop:0
		},2000)
	});
	
	//弹出框
	var $documentH = $(document).height();
	$('.qq').on('click',function(){
		$('.dialog').fadeIn();
		$('.zz').show().height($documentH);
	})
	$('.x').on('click',function(){
		$('.dialog').fadeOut();
		$('.zz').hide();
	})
	
});

/*//放大镜//*/
//设置放大镜的尺寸
$(function(){
    $('.fdj').css({
		width: $('.left_box').width() * $('.right_box').width() / $('.pic_r').width() + 'px',
		height: $('.left_box').height() * $('.right_box').height() / $('.pic_r').height() + 'px'
	})
//求比例,倍数关系。
var scalex = $('.left_box').width() / $('.fdj').width();
var scaley = $('.left_box').height() / $('.fdj').height();
//hover
$('.left_box').mousemove(
	function(e) {
		var e = e ||window.event;
		var offset = $(this).offset();
		var x = (e.pageX - offset.left-$('.fdj').width()/2);
		var y = (e.pageY - offset.top-$('.fdj').height()/2);
		
		$('.fdj').css("visibility", "visible");
		$('.right_box').css("visibility", "visible");

		if(x < 0) {
			x = 0;
		} else if(x >= $('.left_box').width() - $('.fdj').width()) {
			x = $('.left_box').width() - $('.fdj').width();
		}

		if(y < 0) {
			y = 0;
		} else if(y >= $('.left_box').height() - $('.fdj').height()) {
			y = $('.left_box').height() - $('.fdj').height();
		}

		$('.fdj').css('left', x+ "px");
		$('.fdj').css('top', y+ "px");

		$('.pic_r').css('left', -scalex*x + "px");
		$('.pic_r').css('top', -scaley*y + "px");

	});

$('.left_box').mouseout(
		function() {
			$('.fdj').css("visibility", "hidden");
			$('.right_box').css("visibility", "hidden");
		})
//5张图片
$('.lue li').mousemove(function(){
//	alert($(this).index());
    var num=$(this).index();
	$(this).addClass('activ').siblings().removeClass('activ');
	$('.pic_r').attr({src:'images/test/s'+num+'.jpg'});
	$('.pic_l').attr({src:'images/test/s'+num+'.jpg'});
});

});

$(function(){
	$('.size ul li').on('click',function(){
		$(this).not('.n').addClass('red').siblings().removeClass('red');
	})

});

