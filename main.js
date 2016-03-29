

var newTitle = document.getElementById("new-title");
var newText = document.getElementById("new-text");
var listNotes = document.querySelector(".list-notes");
var allTitleNotes = document.querySelectorAll(".list-notes .title");

ExistKeeps();
checkStuding();

// создаем объект обучения
var enjoyhint_instance = new EnjoyHint({});
var enjoyhint_script_steps = [
	{
		'next .notes': 'Перед вами основной интерфейс сервиса Nootes',
		'showSkip' : false,
		'nextButton' : {text: "Далее"}
	},
	{
		'key #new-title' : 'Введите заголовок вашей новой заметки и нажмите Tab',
		'keyCode' : 9,
		'showSkip' : false
	},
	{
		'key #new-text' : 'Введите текст и добавьте заметку при помощи сочетания Ctrl+Enter',
		'ctrlKey': true,
		'keyCode' : 13,
		'showSkip' : false
	},
	{
		'next .count-point' : 'Текущее количество заметок изменилось',
		'showSkip' : false,
		'nextButton' : {text: "Далее"}
	},
	{
		'click .title' : 'Нажмите на заголовок. Появится текст вашей заметки',
		'showSkip' : false
	},
	{
		'next .text' : 'Чтобы удалить, сделайте двойной клик по тексту',
		'showSkip' : false,
		'nextButton' : {text: "Далее"}
	},
	{
		'click .edit' : 'Попробуем отредактировать одну из заметок. Нажмите "Edit"',
		'showSkip' : false
	},
	{
		'next header div' : 'Добавляются изменения сочетанием Ctrl+Enter',
		'showSkip' : false,
		'nextButton' : {text: "Далее"}
	},
	{
		'next .notes': 'Спасибо, что пользуетесь Nootes! Рады, что вы с нами!',
		'showSkip' : false,
		'nextButton' : {text: "Закрыть"}
	}
];

// проверять куки на наличие каждые 2с
function checkCookie() {
	var xhr = new XMLHttpRequest();
	xhr.open("post",'model.php', true);
	var data = "purpose=auth";
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function() {
		if( xhr.readyState == 4 && xhr.status == 200 ) {
			if (xhr.responseText =="no cookie")
				location.href = "index.php";
		}
	}
	xhr.send(data);
	setTimeout("checkCookie()", 2000);
}

// получение данных об обучении
function checkStuding() {
	var xhr = new XMLHttpRequest();
	xhr.open("post",'model.php', true);
	var data = "purpose=studing";
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function()  {
		if ( xhr.readyState == 4 && xhr.status == 200 ) {
			if (xhr.responseText =="yes") {
				deleteStuding();
				enjoyhint_instance.set(enjoyhint_script_steps);
				enjoyhint_instance.run();
			}
		}
	}	
	xhr.send(data);
}

// выключение обучения
function deleteStuding() {
	var xhr = new XMLHttpRequest();
	xhr.open("post",'model.php', true);
	var data = "purpose=deleteStuding";
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function()  {
		if ( xhr.readyState == 4 && xhr.status == 200 ) {
			if (xhr.responseText =="yes") {
			}
		}
	}	
	xhr.send(data);	
}

// отображение имени пользователя
function userName() {
	var xhr = new XMLHttpRequest();
	xhr.open("post",'model.php', true);
	var data = "purpose=name";
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function()  {
		if( xhr.readyState == 4 && xhr.status == 200 ) {
			document.getElementById('name').textContent = xhr.responseText;
		}
	}
	xhr.send(data);
}

// подгрузка существующих заметок из БД
function ExistKeeps() {

	userName();
	/*checkCookie();*/
	
	var xhr = new XMLHttpRequest();
	xhr.open("post",'model.php', true);
	var data = "purpose=import";
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function()  {
		if( xhr.readyState == 4 && xhr.status == 200 ) {
			for(var f in JSON.parse(xhr.responseText)) {
				var title = JSON.parse(xhr.responseText)[f].Title;
				var note = JSON.parse(xhr.responseText)[f].Note;
				addNote(title, note);
			}
		}
	}
	xhr.send(data);	
}

// выход из аккаунта
function exit() {
	var xhr = new XMLHttpRequest();
	var data = "purpose=exit";

	xhr.open("post",'model.php', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function() 
	{
		if( (xhr.readyState == 4)&&(xhr.status == 200) ) {
			if(xhr.responseText == "Done!")
				location.href = "index.php";
		}
	}
	xhr.send(data);
}

// редактирование заметки
function getEditNote() {
	var allEditButtons = document.querySelectorAll("span.edit");
	for (var i = 0; i < allEditButtons.length; i++) {
		allEditButtons[i].onclick = function(event) {
			var title = event.target.parentElement.childNodes[0].textContent.trim();
			var text = event.target.parentElement.parentElement.children[1].textContent.trim();
			var xhr = new XMLHttpRequest();

			xhr.open("post",'model.php', true);
			var data ="purpose=deleteNote&Title=" + title + "&Note=" + text;
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {

				if ( xhr.readyState == 4 && xhr.status == 200 ) {

					if (xhr.responseText == "ok") {
						newTitle.value = title;
						newText.value = text;
						event.target.parentElement.parentElement.remove();
						getCountNotes();
					}
				}
			}
			xhr.send(data);
		}
	}
}

// удалить заметку
function getRemoveNote() {
	var allTextNotes = document.querySelectorAll(".list-notes .text");
	for (var i = 0; i < allTextNotes.length; i++) {
		allTextNotes[i].ondblclick = function(event) {

			var xhr = new XMLHttpRequest();
			xhr.open("post",'model.php', true);
			var data ="purpose=deleteNote&Title=" + event.target.parentElement.children[0].childNodes[0].data +
					"&Note=" + event.target.textContent;
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if( xhr.readyState == 4 && xhr.status == 200 ) {
					if(xhr.responseText == "ok") {
						event.target.parentElement.remove();
						getCountNotes();
					}
				}
			}
			xhr.send(data);
		}
	}
}

// переключатель отображения заметок
function getTextNote() {
	for (var i = 0; i < allTitleNotes.length; i++) {
		allTitleNotes[i].onclick = function(event) {
			if (event.target.parentElement.children[1].style.display) {
				event.target.parentElement.children[1].style.display = "";
			} else {
				event.target.parentElement.children[1].style.display = "block";
			}
		}
	}	
}

// обновление количества заметок
function getCountNotes(s=0) {
	allTitleNotes = document.querySelectorAll(".list-notes .title");
	var countNotes = document.querySelector('.count-point span');

	countNotes.textContent = allTitleNotes.length;

}

// добавление заметки
function addNote(title, note, s=0) {
	// создаем шаблон заметки
	var t, n;
	var template = document.createElement('li');
	var divTitle = document.createElement('div');
	var divText = document.createElement('div');
	var editButton = document.createElement('span');
	editButton.textContent = "edit";

	t = document.createTextNode(title);
	n =  document.createTextNode(note);

	if (note == "") n = document.createTextNode("Удалить заметку? (двойной клик)");


	editButton.setAttribute('class', 'edit');
	divTitle.setAttribute('class', 'title');
	divText.setAttribute('class', 'text');
	
	divTitle.appendChild(t);
	divTitle.appendChild(editButton);
	divText.appendChild(n);
	template.appendChild(divTitle);
	template.appendChild(divText);

	if ( s ) {

		// отправляем запрос в базу
		var xhr = new XMLHttpRequest();
		xhr.open("post",'model.php', true);
		var data = "purpose=newNote&name=" + t.textContent +
					"&descript=" + n.textContent;
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onreadystatechange = function()  {

			if ( xhr.readyState == 4 && xhr.status == 200 ) {
				if (xhr.responseText == "ok") {
					listNotes.appendChild(template);

					// очищаем поля и обновляем количество текущих заметок
					allTitleNotes = document.querySelectorAll(".list-notes .title");
					getTextNote();
					getRemoveNote();
					getEditNote();
					getCountNotes();

					// переносим фокус на введение заголовка нового заметки
					newTitle.focus();
				}
			}
		}

		xhr.send(data);
	}

	listNotes.appendChild(template);

	// очищаем поля и обновляем количество текущих заметок
	newTitle.value = "";
	newText.value = "";
	allTitleNotes = document.querySelectorAll(".list-notes .title");
	getTextNote();
	getRemoveNote();
	getEditNote();
	getCountNotes(1);

	// переносим фокус на введение заголовка нового заметки
	newTitle.focus();
}

// получение доступа к тексту заметки после введения заголовка
newTitle.onclick = function(event) {
	newText.disabled = false;
}

// добавление только заголовка
newTitle.onkeyup = function(event) {
	if (event.ctrlKey && event.keyCode == 13) {
		addNote(newTitle.value, newText.value, 1);
	}	
}

// добавление заметки с текстом
newText.onkeyup = function(event) {
	if (event.ctrlKey && event.keyCode == 13) {
		addNote(newTitle.value, newText.value, 1);
	}
}

