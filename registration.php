<?php

	function generateCode($length = 6) {
		$string = "qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM";
		$data = "";
		while (strlen($data) < $length) {
			$date .= $string[mt_rand(0, (strlen($string) - 1))];
		}
		return $data;
	}

	$con = new MongoClient(); 
	
	// получение регистрационных данных
	$name = $_POST['name'];
	$surname = $_POST['surname'];
	$login = $_POST['login'];
	$password = md5(sha1($_POST['pass']));

	$collection = $con -> nootes -> users;
	$user = $collection -> findOne(array('login' => $login));

	if (empty($user['login'])) {

		$hash = md5(generateCode(10));

		$collection -> insert(
			array(
				"login" => $login,
				"password" => $password,
				"name" => $name,
				"surname" => $surname,
				"hash" => $hash
			)
		);

		setcookie("hash", $hash, time()+3600);
		setcookie("id", $user["_id"], time()+3600);

	} else {
		echo "error";
	}



/*	echo "is used";*/

/*	$user = $con -> nootes -> users -> $login;

	$user -> insert(
		array(
			password => $password,
			name => $name,
			surname => $surname
		)
		
	);*/

?>