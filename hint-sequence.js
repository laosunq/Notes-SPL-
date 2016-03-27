
// создаем основной объект
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
		'next .list-notes' : 'Готово! Заметка была успешна добавлена!',
		'showSkip' : false,
		'nextButton' : {text: "Далее"}
	},
	{
		'next .list-notes' : 'Научимся теперь удалять заметки',
		'showSkip' : false,
		'nextButton' : {text: "Далее"}
	},
	{
		'click .title' : 'Нажмите на заголовок. Появится текст вашей заметки',
		'showSkip' : false
	},
	{
		'click .text' : 'Для удаления достаточно сделать двойной клик по тексту',
		'showSkip' : false
	},
	{
		'next .list-notes' : 'Как видите, заметка исчезла',
		'showSkip' : false,
		'nextButton' : {text: "Далее"}
	},
	{
		'next .count-point' : 'Текущее количество заметок',
		'showSkip' : false,
		'nextButton' : {text: "Далее"}
	},
	{
		'next .all-count-point' : 'Общее количество заметок',
		'showSkip' : false,
		'nextButton' : {text: "Далее"}
	},
	{
		'next .notes': 'Спасибо, что пользуетесь Nootes! Рады, что вы с нами!',
		'showSkip' : false,
		'nextButton' : {text: "Закрыть"}
	}

];

enjoyhint_instance.set(enjoyhint_script_steps);
enjoyhint_instance.run();