<?php
	$conn = mysql_connect("localhost", "root", "123456");
	if (!$conn) {
		die("连接数据库失败：" . mysql_error());
	}
	mysql_select_db("state", $conn);//选择数据库
	
	mysql_query("set names uft8");//设置字符
?>