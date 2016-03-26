
// обработка добавления новой заметки
var newTitle = document.getElementById("new-title");
var newText = document.getElementById("new-text");
var listNotes = document.querySelector(".list-notes");
var allTitleNotes = document.querySelectorAll(".list-notes .title");

for (var i = 0; i < allTitleNotes.length; i++) {
	allTitleNotes[i].onclick = function(event) {
		if (event.target.parentElement.children[1].style.display) {
			event.target.parentElement.children[1].style.display = "";
		} else {
			event.target.parentElement.children[1].style.display = "block";
		}
	}
}

newTitle.onclick = function(event) {
	newText.disabled = false;
}

// добавление заметки
function addNote(event) {
	if (event.keyCode == 13) {
		// создаем шаблон заметки
		var note = document.createElement('li');
		var divTitle = document.createElement('div');
		var divText = document.createElement('div');
		var title = document.createTextNode(newTitle.value);
		var text = document.createTextNode(newText.value);
		divTitle.setAttribute('class', 'title');
		divText.setAttribute('class', 'text');
		
		divTitle.appendChild(title);
		divText.appendChild(text);
		note.appendChild(divTitle);
		note.appendChild(divText);
		listNotes.appendChild(note);

		newTitle.value = "";
		newText.value = "";
		allTitleNotes = document.querySelectorAll(".list-notes .title");
	}	
}

// добавление только заголовка
newTitle.onkeyup = function(event) {
	addNote(event);
}

// добавление заметки с текстом
newText.onkeyup = function(event) {
	addNote(event);
}

