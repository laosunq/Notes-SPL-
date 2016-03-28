<?php

	$login = $_POST['login'];
	$pass = md5(sha1($_POST['pass']));

	// подключение к базе + поиск зарегистрированного
	$con = new MongoClient(); 
	$user = $con -> nootes -> users -> $login;

	$passDb = $user -> find();

	var_dump($passDb -> password);


?>