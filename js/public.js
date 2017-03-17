//下拉菜单
$(function(){
	(function(){
		$('.navlist li').hover(function(){
			$that = $(this);
			$that.parent().find('.yc').hide().end().end().children().show();		
		},function(){
			$that.parent().find('.yc').hide();	
		})
	})()
	//关注我们
	$('.concern').hover(function(){
		$(this).find('.gz').show();
	},function(){
		$(this).find('.gz').hide();
	})
});





