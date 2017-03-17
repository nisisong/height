<?php
	header('Content-Type:text/html;charset="utf-8"');
	$conn=mysql_connect('localhost','root','123456');
	mysql_select_db('mxss');
	mysql_query('SET NAMES UTF8');
	
	
	$query="select * from pro";
	$result=mysql_query($query);
	
	$note;$i=0;
	while($info=mysql_fetch_array($result)){
		$note["src"]=$info['src'];
		$note["title"]=$info['title'];
		$note["state"]=$info['state'];
		$notes[$i++]=$note;
	}
	echo json_encode($notes);
?>