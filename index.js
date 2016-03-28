
var sign = document.querySelector(".sign_buttons span");
var reg = document.querySelector(".new_account");

var signSubmit = document.getElementById("sign");
var regSubmit = document.getElementById("reg");

var signForm = document.querySelector(".sign_in");
var regForm = document.querySelector(".registration");


reg.onclick = function() {
	signForm.style.display = "none";
	regForm.style.display = "block";

	reg.style.display = "none";
	signSubmit.style.display = "none";
	sign.style.display = "block";
	regSubmit.style.display = "block";
}

sign.onclick = function() {
	signForm.style.display = "block";
	regForm.style.display = "none";

	reg.style.display = "block";
	regSubmit.style.display = "none";
	sign.style.display = "none";
	signSubmit.style.display = "block";
}