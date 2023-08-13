// Keep track of JSON information
var jsonVerb, jsonSingNoun, jsonPlurNoun, jsonSingAdj;
var jsonPlurAdj, jsonPronoun, jsonPossess, jsonDemonst;
var jsonCompare, fetchList = [];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomString(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const generateRandomVerbSelection = (data) => {
  let randomVerb = data.verb[getRandomInt(0, data.verb.length - 1)];
  let conjType = getRandomString(['normal', 'past', 'imperative']);
  let proNoun;

  if (conjType == "imperative") {
    proNoun = getRandomString(['ty', 'vy']);
  } else if (conjType == "past") {
    proNoun = getRandomString(['m', 'f', 'n', 'p']);
  } else {
    proNoun = getRandomString(['ya', 'ty', 'on', 'my', 'vy', 'oni']);
  }

  let cyrillicPronoun;
  switch(proNoun) {
  	case "ya":
  		cyrillicPronoun = "Я";
  		break;
  	case "ty":
  		cyrillicPronoun = "Ты";
  		break;
  	case "m" || proNoun == "on":
  		cyrillicPronoun = "Он";
  		break;
  	case "my":
  		cyrillicPronoun = "Мы";
  		break;
  	case "vy":
  		cyrillicPronoun = "Вы";
  		break;
  	case "f":
  		cyrillicPronoun = "Она";
  		break;
  	case "n":
  		cyrillicPronoun = "Оно";
  		break;
  	case "p" || proNoun == "oni":
  		cyrillicPronoun = "Они";
  		break;
  }

  // Return type [infinitive, tense, pronoun, conjugated verb]
  return [randomVerb.name, conjType, cyrllicPronoun, randomVerb.conjugations[conjType][proNoun]];
}

const verb = () => {
	document.querySelector(".centered-title").textContent = "Verb Conjugations";

	if (fetchList.includes('verb') == false) {
	    fetch('./wordbank/verbs.json')
	      .then(response => response.json())
	      .then(data => { 
	      	var jsonVerb = data;
	      	fetchList.push('verb');
	    }).catch(error => console.error('Error loading JSON:', error))
    }

    // Possibly no data like present tense быть
	let question = generateRandomVerbSelection(jsonVerb);
	while (option == "-") {
		question = generateRandomVerbSelection(jsonVerb);
	}

	document.querySelector(".question").textContent += ;	
};

// Start with verbs on site load
document.addEventListener("DOMContentLoaded", (event) => {
	verb();
});

const singNoun = () => {
    document.querySelector(".centered-title").textContent = "Singular Noun Cases";
};

const plurNoun = () => {
    document.querySelector(".centered-title").textContent = "Plural Noun Cases";
};

const singAdj = () => {
    document.querySelector(".centered-title").textContent = "Singular Adjective Cases";
};

const plurAdj = () => {
    document.querySelector(".centered-title").textContent = "Plural Adjective Cases";
};

const pronoun = () => {
    document.querySelector(".centered-title").textContent = "Pronoun Cases";
};

const possesive = () => {
    document.querySelector(".centered-title").textContent = "Possesive Pronoun Cases";
};

const demonstrative = () => {
    document.querySelector(".centered-title").textContent = "Demonstrative (& Весь) Cases";
};

const comparative = () => {
    document.querySelector(".centered-title").textContent = "Comparative Creation";
};

const checkAnswer = () => {
	currExerciseType = document.querySelector(".centered-title").textContent;

	switch(currExerciseType) {
		case "Verb Conjugations":
			verb();
			break;
		case "Singular Noun Cases":
			singNoun();
			break;
		case "Plural Noun Cases":
			plurNoun();
			break;
		case "Singular Adjective Cases":
			singAdj();
			break;
		case "Plural Adjective Cases":
			plurAdj();
			break;
		case "Pronoun Cases":
			pronoun();
			break;
		case "Possesive Pronoun Cases":
			possesive();
			break;
		case "Demonstrative (& Весь) Cases":
			demonstrative();
			break;
		case "Comparative Creation":
			comparative();
			break;
		default:
			verb();
			console.err("Something went wrong in the check answer func!");
	}
};
