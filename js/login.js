//登录页面验证
$(function(){
	var reg = /(^[1-3]\d{10}$)|(^\w+@\w(\w+\.)+\w+$)/;
	var reg2 = /^[a-z0-9_-]{6,18}$/;
	//验证登录帐号
	$(".d_user").on("change", function() {
		if($(".d_user").val() == "") {
			$(".error").text('请输入注册时的邮箱或手机号码。').show();
		}else if(reg.test($(".d_user").val()) == false) {
			$(".error").text('您输入的邮箱或手机号码不正确。').show();
		}else{
			$(".error").hide();
		}
	})
	//验证登录密码
	$(".d_password").on("change", function() {
		if($(".d_password").val()== "") {
			$(".error").text('请输入您的密码').show();
		}else if(reg2.test($(".d_password").val()) == false){
			$(".error").text('用户密码长度范围在6~16位之间。').show();
		} else {
			$(".error").hide();
		}
	})
	
	//点击登录按钮时判断
	$(".btn").click(function(){
		if($(".d_user").val() == "" && $(".d_password").val() == ""){
			$(".error").text("请完善登录信息。").show();
		}else{
			$(".error").hide();
		}
	})
});
