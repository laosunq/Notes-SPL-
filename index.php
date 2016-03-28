<?php
	if(isset($_COOKIE["id"]) && isset($_COOKIE["hash"])) {

		$con = new MongoClient(); 
		$collection = $con -> nootes -> users;
		$user = $collection -> find(array('_id' => new MongoId($_COOKIE["id"])));

		if ($user['hash'] === $_COOKIE["hash"]) {
			header("Refresh:0;URL=main.html");
		}
	}
?>

<!DOCTYPE html>
<html>
<head>
	<title>Nootes - быстрые заметки для каждого</title>

	<meta charset="utf-8" />
	<link rel="stylesheet" type="text/css" href="styles_index.css"/>
</head>

<body>
	<div class="note">
		<h1>Welcome to Nootes!</h1>
		<div class="sign_in">
			<!-- форма входа в аккаунт -->
			<form action="auth.php" method="POST">
				<input name="login" type="text" placeholder="электронная почта" autofocus required />
				<input name="pass" type="password" placeholder="пароль" required />
				<input id="sign" type="submit" value="Войти"/>
			</form>
		</div>

		<div class="registration">
			<!-- форма регистрации -->
			<form action="registration.php" method="POST">
				<input name="name" type="text" placeholder="имя" autofocus required />
				<input name="surname" type="text" placeholder="фамилия" required />
				<input name="login" type="text" placeholder="логин" required />
				<input name="pass" type="password" placeholder="пароль" required />
				<input id="reg" type="submit" value="Зарегистрироваться"/>

			</form>
		</div>

		<div class="sign_buttons">
			<span>Войти</span>
			<div class="new_account">Создать аккаунт</div>
		</div>
	</div>

	<script type="text/javascript" src="index.js"></script>
</body>
</html>