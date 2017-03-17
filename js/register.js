//注册页面验证
$(function(){
	var reg = /(^[1-3]\d{10}$)|(^\w+@\w(\w+\.)+\w+$)/;
	var reg2 = /^[a-z0-9_-]{6,18}$/;
	var bstop = true;
	
	$('.z_user').on('blur',function(){
		var username=$('.z_user').val();
		if(reg.test(username)){
			$.ajax({
				type:'post',
				url:'php/reg.php',
				data:{//将数据传输给php页面
					name:username
				},
				success:function(data){
					if(!data){
						$('.error').html('该用户名可用').show();
						bstop = true;
					}else{
						$('.error').html('该用户名已经存在').show();
						bstop = false;
					}
				}
			});
		}else{
			$('.error').html('用户名格式错误').show();
			$('.z_user').focus();
			bstop=false;
		}
		
		$('form').on('submit',function(){
			if(!bstop){
				return false;
			}
		});
	});
	
	
	//验证用户名
	$(".z_user").on("blur", function() {
		if($(".z_user").val() == "") {
			$(".error").text('请输入您的手机号或常用邮箱。').show();
		}else if(reg.test($(".z_user").val()) == false) {
			$(".error").text('请输入正确的手机号或邮箱。').show();
		}else{
			$(".error").hide();
		}
	})
	//验证密码
	$(".z_password").on("blur", function() {
		if($(".z_password").val()== "") {
			$(".error").text('用户密码不能为空').show();
		}else if(reg2.test($(".z_password").val()) == false){
			$(".error").text('用户密码长度范围在6~16位之间。').show();
		} else {
			$(".error").hide();
		}
	})
	//密码二次验证
	$(".z_againpassword").on("blur", function() {
		if($(".z_password").val() != $(".z_againpassword").val()) {
			$(".error").text('两次密码不一致').show();
		}else if($(".z_password").val() == ""){
			$(".error").text('请重新输入一次上面的密码。').show();
		} else {
			$(".error").hide();
		}
	})
	
	//点击注册按钮之后判断
	$(".z_btn").on("click", function() {
		if($(".z_user").val() == "" && $(".z_password").val() == "" && $(".z_again").val() == ""){
			$(".error").text('请完善注册信息').show();
		}else{
			$(".error").hide();
		}
	})
			
});
