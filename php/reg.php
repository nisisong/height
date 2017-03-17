<?php
//包含数据库连接文件
include ('conn.php');

//直接预览此页面，输出非法访问
if (isset($_REQUEST['name'])||isset($_POST['submit'])) {
	$name1 = @$_REQUEST['name'];
}else{
	exit('非法访问!');
}


//检测用户名是否已经存在
$check_query = mysql_query("select rid from user where username='$name1' ");
if (mysql_fetch_array($check_query)) {
	echo true;//存在用户名
}else{
	echo false;//不存在用户名
}
//写入数据
if(isset($_POST['submit']) && $_POST['submit']=="注册"){
	$username = $_REQUEST['username'];
	$password = MD5($_REQUEST['password']);
	$query = "INSERT INTO user(username,password) VALUES('$username','$password')";
	
	if (mysql_query($query)) {
		header("Location: ../Login.html");  //跳转到login.html
	}
}

?>