//banner 轮播
$(function(){
	var lblist = $(".piclist");
	var arrowLeft = $("#left");
	var arrowRight = $("#right");

	arrowLeft.click(function() {
		turnImg("left");
	})
	arrowRight.click(function() {
		turnImg("right");
	});
	var timer = setInterval(function() {
		turnImg("right");
	}, 3000);
	

	function turnImg(direction) {
		lblist[0].index = lblist[0].index || 0;
		if(direction == "left") {
			lblist[0].index--;
			if(lblist[0].index == -1) {
				lblist.css("left", -960 * 5);
				lblist[0].index = 3;
			}
			lblist.animate({
				left: lblist[0].index * -960
			});
		}
		if(direction == "right") {
			lblist[0].index++;
			if(lblist[0].index == 6) {
				lblist.css("left", 0);
				lblist[0].index = 1;
			}
			lblist.animate({
				left: lblist[0].index * -960
			});
		}
	}
	$("#banner").hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(function() {
			turnImg("right");
		}, 3000);
	})
});

//顶部悬浮
$(function() {
	var headHeight = $("#header").height() + 10;
	var oFix = $("#fix_box");
	$(window).scroll(function(){
		if($(this).scrollTop() > headHeight + 15) {
			oFix.fadeIn(500)
		} else {
			oFix.fadeOut(500)
		}
	});
});


//请求数据
$(function() {
	$.ajax({
		url: 'php/index.php',
		dataType: 'json'
	}).done(function(data) {
		var json = data;
		var str = '';
		for(var i = 0; i < json.length; i++) {
			str += '<li><a href="#"><img src="' + json[i].src + '" alt="" /><p>' + json[i].title + '</p><div class="state">' + json[i].state + '</div></a></li>'
		}
		$('.cho_ul').html(str);
	})
});

//楼梯
$(function() {
	$(window).on('scroll', function() {
		var $scroll = $(this).scrollTop();
		if($scroll >= 170) {
			$('#loutinav').show();
		} else {
			$('#loutinav').hide();
		}

		$('.louti').each(function() {
			var $loutitop = $('.louti').eq($(this).index()).offset().top + 30;
			
			if($loutitop > $scroll) {
				$('#loutinav li').removeClass('active');
				$('#loutinav li').eq($(this).index()).addClass('active');
				return false;
			}
		});
	});
	
	var $loutili = $('#loutinav li').not('.last');
	$loutili.on('click', function() {
		$(this).addClass('active').siblings('li').removeClass('active');
		var $loutitop = $('.louti').eq($(this).index()).offset().top;
		
		$('html,body').animate({
			scrollTop: $loutitop
		})
	});
	//回到顶部
	$('.last').on('click', function() {
		$('html,body').animate({
			scrollTop: 0
		})
	});
});


//loding懒加载
$(function() {
	var bstop = [];
	for(var i = 0; i < $('#test').size(); i++) {
		bstop[i] = true;
	}
	$(window).on('scroll load', function() {
		var $scrolltop = $(window).scrollTop();
		var $clientH = $(window).height();
		$('#test').each(function(i) {
			$offset = $('#test').eq(i).offset().top+400;
			if($offset <= $scrolltop + $clientH) {
				if(bstop[i]) {
					$.ajax({
						url: 'php/loding.php',
						dataType: 'json',
						beforeSend: function() {
							$('#test').eq(i).html('<img src="images/styleimg/loding.gif" class="loading">');
						}
					}).done(function(data) {
//						alert(data);
//						console.log(data);
						$('#test').eq(i).find('.loading').hide();
						
						var str = '';
						str+='<a href="#" ><img title="新会员专享福利 888元优惠券即领即用" src="'
						+data[0].img+
						'"/></a><a href="#"><img class="lastimg" src="'
						+data[1].img+
						'"/></a>';
						$('#test').eq(i).html(str);
						bstop[i] = false;
					})
				}
			}
		});
	});
});

//轮播
$(function(){
	var piclist = $(".cho_ul");
	var oLeft = $(".cho_l");
	var oRight = $(".cho_r");
	var bstop = true;
	
	
	$('.cho_l').click(function() {
            if (bstop) {
                turnImg("left");
            }
            bstop = false;
        });
    $('.cho_r').click(function() {
        if (bstop) {
            turnImg("right");
        }
        bstop = false;
    });

//	oLeft.click(function() {
//		turnImg("left");
//	})
//	oRight.click(function() {
//		turnImg("right");
//	});
	var timer = setInterval(function() {
		turnImg("right");
	}, 3000);
	

	function turnImg(direction) {
		piclist[0].index = piclist[0].index || 0;
		if(direction == "left") {
			piclist[0].index--;
			if(piclist[0].index == -1) {
				piclist.css("left", -192 * 20);
				piclist[0].index =1;
			}
			piclist.animate({
				left: piclist[0].index * -192
			});
		}
		if(direction == "right") {
			piclist[0].index++;
			if(piclist[0].index == 21) {
				piclist.css("left", 0);
				piclist[0].index = 1;
			}
			piclist.animate({
				left: piclist[0].index * -192
			});
		}
		bstop = true;
	}
	$(".cho_ul").hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(function() {
			turnImg("right");
		}, 3000);
	})
});