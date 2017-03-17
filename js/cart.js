//获取数据
$.ajax({
	url:'json/cart.json',
	dataType:'json',
	async:false,
	success:function(data){
		//获取数据
		for(var i=0;i<data.piclist.length;i++){
			$('.goodsinfo').eq(i).find('.loadimg').attr('src',data.piclist[i].img);
			$('.goodsinfo').eq(i).find('.loadimg').attr('sid',data.piclist[i].sid);
			$('.goodsinfo').eq(i).find('.loadt').html(data.piclist[i].title);
			$('.goodsinfo').eq(i).find('.loadpcp').html(data.piclist[i].price);
		}
		
		//存储cookie的数据
		if(getCookie('cartsid')){
			var s=getCookie('cartsid').split(',');
			var n=getCookie('cartnum').split(',');
			for(var i=0;i<s.length;i++){
				createcart(s[i],n[i]);
			}
		}
	}
});
//购物车
//如果商品存在于购物车数量累加，否则创建商品信息进购物车
var sidarr=[];//存放商品编号
var numarr=[];//存放商品数量

function cookieToArray(){//取出cookie转换成数组
	if(getCookie('cartsid')){
		sidarr=getCookie('cartsid').split(',');
	}else{
		sidarr=[];
	}
	
	if(getCookie('cartnum')){
		numarr=getCookie('cartnum').split(',');
	}else{
		numarr=[];
	}
}




$('.p-btn a').on('click',function(){
	var $sid=$(this).parents('.goodsinfo').find('.loadimg').attr('sid');//取到和按钮对应的图片下面的sid
	cookieToArray();//获取cookie，转换成数组
	if($.inArray($sid,sidarr)!=-1){//商品列表存在:数量累加
		$('.goods-item:visible').each(function(){
			if($sid==$(this).find('img').attr('sid')){
				var $num=$(this).find('.quantity-form').find('input').val();
				$num++;
				$(this).find('.quantity-form').find('input').val($num);
				var $dj=parseFloat($(this).find('.b-price').children('strong').html());
				$(this).find('.b-sum').find('strong').html(($dj*$num).toFixed(2));
				numarr[sidarr.indexOf($sid)]=$num;
				addCookie('cartnum',numarr.toString(),7);
				
			}
		});
		totalprice();
	}else{//不存在，创建
		
		sidarr.push($sid);
		addCookie('cartsid',sidarr.toString(),7);
		numarr.push(1);
		addCookie('cartnum',numarr.toString(),7);
		createcart($sid,1);//创建购物车商品列表，传入对应的参数(当前的商品编号，商品的数量)
		totalprice();
	}
});

function createcart(sid,num){
	$.ajax({
		url:'json/cart.json',
		dataType:'json',
		async:false,
		success:function(data){
			for(var i=0;i<data.piclist.length;i++){
				if(sid==data.piclist[i].sid){
					var $clone=$('.goods-item:hidden').clone(true);
					$clone.find('.goods-pic').find('img').attr('src',data.piclist[i].img);
					$clone.find('.goods-pic').find('img').attr('sid',data.piclist[i].sid);
					$clone.find('.goods-d-info').find('a').html(data.piclist[i].title);
					$clone.find('.b-price').find('strong').html(data.piclist[i].price);
					$clone.find('.quantity-form').find('input').val(num);
					var $dprice=parseFloat(data.piclist[i].price);
					$clone.find('.b-sum').find('strong').html(($dprice*num).toFixed(2));
					$clone.css('display','block');//让克隆的盒子显示出来；
					$('#cart-floatbar').show();
					$('.cart-thead').show();
					$('.cart_null').hide();
					$('.item-list').append($clone);
					kong();
				}
			}
		}
	});
}

kong();
function kong(){
	if(getCookie('cartsid')){
		$('.empty-cart').css('display','none');
	}else{
		$('.empty-cart').css('display','block');
	}
}

//删除商品列表
function delgoodslist(sid,sidarray){
	var arr=[];
	for(var i=0;i<sidarray.length;i++){
		if(sid!=sidarray[i]){
			arr.push(sidarray[i]);
		}
	}
	numarr.splice(sidarray.indexOf(sid),1);//改变原数组
	sidarr=arr;
	addCookie('cartsid',sidarr.toString(),7);
	addCookie('cartnum',numarr.toString(),7);
}

//删除当个商品
$('.b-action').find('a:first').on('click',function(){
	cookieToArray();
	$(this).parents('.goods-item').remove();
	delgoodslist($(this).parents('.goods-item').find('img').attr('sid'),sidarr);
	$('#cart-floatbar').hide();
	$('.cart-thead').hide();
	$('.cart_null').show();
	
	totalprice();
});


//删除全部
$('.operation a:first').on('click',function(){
	$('.goods-item:visible').each(function(){
		if($(this).find('input:checkbox').is(':checked')){
			$(this).remove();
			delgoodslist($(this).find('img').attr('sid'),sidarr);
		}
	});
	totalprice();
});

//计算购物车所有商品的总价格
totalprice();
function totalprice(){
	var total=0;
	$('.goods-item:visible').each(function(){
		if($(this).find('input:checkbox').is(':checked')){
			total+=parseFloat($(this).find('.b-sum').find('strong').html());
		}
	});
	$('.totalprice').html('￥'+total.toFixed(2));
	$('.amount-sum').find('em').html($('.goods-item:visible').find('.cart-checkbox input:checked').length);
}

//全选
$('.allsel').on('change',function(){
	if($(this).prop('checked')){
		$('.goods-item:visible').find('input:checkbox').prop('checked',true);
	}else{
		$('.goods-item:visible').find('input:checkbox').prop('checked',false);
	}
	$('.allsel').prop('checked',$(this).prop('checked'));
	totalprice();
});

var $input=$('.goods-item:visible').find('input:checkbox');
$('.goods-item:visible').find('input:checkbox').on('change',function(){
	if($('.goods-item:visible').find('input:checked').length==$input.size()){
		$('.allsel').prop('checked',true);
	}else{
		$('.allsel').prop('checked',false);
	}
	totalprice();
});


//改变数量++
$('.quantity-add').on('click',function(){
	var $count=$(this).parents('.goods-item').find('.quantity-form input').val();
	$count++;
	if($count>=99){
		$count=99;
	}
	$(this).parents('.goods-item').find('.quantity-form input').val($count);
	$(this).parents('.goods-item').find('.b-sum').find('strong').html(singlegoodsprice($(this)));
	totalprice();
	setcookie($(this));
	
});


//改变数量--
$('.quantity-down').on('click',function(){
	var $count=$(this).parents('.goods-item').find('.quantity-form input').val();
	$count--;
	if($count<=1){
		$count=1;
	}
	$(this).parents('.goods-item').find('.quantity-form input').val($count);
	$(this).parents('.goods-item').find('.b-sum').find('strong').html(singlegoodsprice($(this)));
	totalprice();
	setcookie($(this));
});

$('.quantity-form input').on('input',function(){
	var $reg=/^\d+$/g;//只能输入数字
	var $value=$(this).val();
	if($reg.test($value)){
		if($value>=99){
			$(this).val(99);
		}else if($value<=1){
			$(this).val(1);
		}else{
			$(this).val($value);
		}
	}else{
		$(this).val(1);
	}
	$(this).parents('.goods-item').find('.b-sum').find('strong').html(singlegoodsprice($(this)));
	totalprice();
	setcookie($(this));
});

//计算单个商品的价格
function singlegoodsprice(row){
	var $dj=parseFloat(row.parents('.goods-item').find('.b-price').find('strong').html());
	var $cnum=parseInt(row.parents('.goods-item').find('.quantity-form input').val());
	return ($dj*$cnum).toFixed(2);
}


//将改变后的数量的值存放到cookie
function setcookie(obj){
	cookieToArray();
	var $index=obj.parents('.goods-item').find('img').attr('sid');
	numarr[sidarr.indexOf($index)]=obj.parents('.goods-item').find('.quantity-form input').val();
	addCookie('cartnum',numarr.toString(),7);
}
