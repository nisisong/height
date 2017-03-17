<?php
	header('Content-Type:text/html;charset="utf-8"');
	$conn=mysql_connect('localhost','root','123456');
	mysql_select_db('test');
	mysql_query('SET NAMES UTF8');
	
	
	$query="select * from picture";
	$result=mysql_query($query);
	
	$note;$i=0;
	while($info=mysql_fetch_array($result)){
		$note["img"]=$info['img'];
		$notes[$i++]=$note;
	}
	echo json_encode($notes);
?>