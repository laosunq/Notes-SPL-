

var newTitle = document.getElementById("new-title");
var newText = document.getElementById("new-text");
var listNotes = document.querySelector(".list-notes");
var allTitleNotes = document.querySelectorAll(".list-notes .title");

getTextNote();
getRemoveNote();
getEditNote();
getCountNotes(1);

// редактирование заметки
function getEditNote() {
	var allEditButtons = document.querySelectorAll("span.edit");
	for (var i = 0; i < allEditButtons.length; i++) {
		allEditButtons[i].onclick = function(event) {
			var title = event.target.parentElement.childNodes[0].textContent;
			var text = event.target.parentElement.parentElement.children[1].textContent;
			newTitle.value = title.trim();
			newText.textContent = text.trim();
			event.target.parentElement.parentElement.remove();
			getCountNotes();
		}
	}
}

// удалить заметку
function getRemoveNote() {
	var allTextNotes = document.querySelectorAll(".list-notes .text");
	for (var i = 0; i < allTextNotes.length; i++) {
		allTextNotes[i].ondblclick = function(event) {
			event.target.parentElement.remove();
			getCountNotes();
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

	if (s) {
		var allCountNotes = document.querySelector('.all-count-point span');
		allCountNotes.textContent = allTitleNotes.length;	
	}
}

// добавление заметки
function addNote(event, s=0) {
	if (event.ctrlKey && event.keyCode == 13) {
		// создаем шаблон заметки
		var note = document.createElement('li');
		var divTitle = document.createElement('div');
		var divText = document.createElement('div');
		var editButton = document.createElement('span');
		editButton.textContent = "edit";
		var title = document.createTextNode(newTitle.value);

		if (s) var text = document.createTextNode("Удалить заметку? (двойной клик)");
		else var text = document.createTextNode(newText.value);

		editButton.setAttribute('class', 'edit');
		divTitle.setAttribute('class', 'title');
		divText.setAttribute('class', 'text');
		
		divTitle.appendChild(title);
		divTitle.appendChild(editButton);
		divText.appendChild(text);
		note.appendChild(divTitle);
		note.appendChild(divText);
		listNotes.appendChild(note);

		// обновляем общее количество добавленных за все время заметок
		var allCountNotes = document.querySelector('.all-count-point span');
		var countNotes = +allCountNotes.textContent + 1;
		allCountNotes.textContent = "";
		var count = document.createTextNode(countNotes);
		allCountNotes.appendChild(count);

		// очищаем поля и обновляем количество текущих заметок
		newTitle.value = "Введите заголовок заметки";
		newText.value = "Введите текст заметки";
		allTitleNotes = document.querySelectorAll(".list-notes .title");
		getTextNote();
		getRemoveNote();
		getEditNote();
		getCountNotes();

		// переносим фокус на введение заголовка нового заметки
		newTitle.focus();
	}	
}

// получение доступа к тексту заметки после введения заголовка
newTitle.onclick = function(event) {
	newText.disabled = false;
}

// добавление только заголовка
newTitle.onkeyup = function(event) {
	addNote(event, 1);
}

// добавление заметки с текстом
newText.onkeyup = function(event) {
	addNote(event);
}

