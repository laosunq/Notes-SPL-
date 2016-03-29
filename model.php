<?php  
	if ($_POST['purpose'] == "name") {
		$con = new MongoClient();
		$col = $con-> nootes-> users;
		$person = $col->findOne(array("_id"=>new MongoId($_COOKIE['id'])));
		if ($person["hash"]===$_COOKIE['hash'])
			echo $person["name"];
	}

	if ($_POST['purpose'] == "auth") {
		if (isset($_COOKIE['id']) and isset($_COOKIE['hash'])) {
			$con = new MongoClient();
			$col = $con-> nootes-> users;
			$person = $col->findOne(array("_id"=>new MongoId($_COOKIE['id'])));
			if ($person["hash"] === $_COOKIE['hash'])
				echo "ok";
			else
				echo "no cookie";
		}
		else
			echo "no cookie";
	}
	
	if ($_POST["purpose"] == "exit") {
		setcookie("id", "", time()-3600);
		setcookie("hash", "",time()-3600);
		echo "Done!";
	}

	if ($_POST["purpose"] == "newNote") {
		$con = new MongoClient();
		$col = $con-> nootes-> keeps;
		$data = array( 
    		"id" => $_COOKIE['id'], 
    		"Title" => $_POST['name'],
    		"Note" => $_POST["descript"]
			);
		$col -> insert($data);
		echo "ok";
		$con -> close();
	}

	if ($_POST["purpose"] == "deleteNote") {
		$con = new MongoClient();
		$col = $con-> nootes-> keeps;
		$person = $col->findOne(array("Title" => $_POST["Title"], "Note" => $_POST["Note"]));
		if ($person["id"] === $_COOKIE['id']) {

			$col -> remove(array("Title" => $_POST["Title"], "Note" => $_POST["Note"]), array('justOne' => true));
			echo "ok";
		}
	}

	if ($_POST["purpose"] == "import") {
		$con = new MongoClient;
		$colk = $con-> nootes-> keeps;
		$col = $con-> nootes-> users;
		$person = $col->findOne(array("_id"=>new MongoId($_COOKIE['id'])));
		if ($person["hash"] == $_COOKIE["hash"]) {

			$notes = $colk->find(array("id"=>$_COOKIE["id"]));
			echo json_encode(iterator_to_array($notes));
		}
		else
			echo "fail";	
	}

	if ($_POST["purpose"] == "studing") {
		$con = new MongoClient;
		$col = $con-> nootes-> users;
		$person = $col->findOne(array("_id"=>new MongoId($_COOKIE['id'])));
		
		if ($person["studing"] == "yes") {
			echo "yes";
		} else {
			echo "no";
		}
	}

	if ($_POST["purpose"] == "deleteStuding") {
		$con = new MongoClient;
		$col = $con-> nootes-> users;

		$col-> update(array("_id"=>new MongoId($_COOKIE['id'])),array('$set' => array("studing"=>"no")),array("upsert" => true));
	}
?>