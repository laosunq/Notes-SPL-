<?php

	$con = new MongoClient(); 
	
	// получение регистрационных данных
	$name = $_POST['name'];
	$surname = $_POST['surname'];
	$login = $_POST['login'];
	$password = md5(sha1($_POST['pass']));

	$user = $con -> nootes -> users -> $login;

	$user -> insert(
		array(
			password => $password,
			name => $name,
			surname => $surname
		)
		
	);

?>