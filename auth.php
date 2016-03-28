<?php

	$login = $_POST['login'];
	$pass = md5(sha1($_POST['pass']));

	// подключение к базе + поиск зарегистрированного
	$con = new MongoClient(); 
	$collection = $con -> nootes -> users;

	$passDb = $user -> find();



?>