// Keep track of JSON information
var jsonVerb, jsonNoun, jsonAdj;
var jsonPronoun, jsonPossess, jsonDemonst;
var jsonCompare, correctAnswer, fetchList = [];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomString(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const generateRandomVerbSelection = (data) => {
  let randomVerb = data.verb[getRandomInt(0, data.verb.length - 1)];
  let conjType = getRandomString(['present', 'past', 'imperative']);
  let proNoun;

  if (conjType == "imperative") {
    proNoun = getRandomString(['ty', 'vy']);
  } else if (conjType == "past") {
    proNoun = getRandomString(['m', 'f', 'n', 'p']);
  } else {
    proNoun = getRandomString(['ya', 'ty', 'on', 'my', 'vy', 'oni']);
  }

  let cyrillicPronoun;
  console.log(proNoun);
  switch(proNoun) {
  	case "ya":
  		cyrillicPronoun = "Я";
  		break;
  	case "ty":
  		cyrillicPronoun = "Ты";
  		break;
  	case "m":
  		cyrillicPronoun = "Он";
  		break;
  	case "on":
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
  	case "p":
  		cyrillicPronoun = "Они";
  		break;
  	case "oni":
  		cyrillicPronoun = "Они";
  		break;
  }

  // Return type [infinitive, tense, pronoun, conjugated verb, translation]
  return [randomVerb.name, conjType, cyrillicPronoun,
  		  randomVerb.conjugations[conjType][proNoun],
  		  randomVerb.translation];
}

const verb = () => {
	document.querySelector(".centered-title").textContent = "Verb Conjugations";

	if (fetchList.includes('verb') == false) {
	    fetch('./wordbank/verbs.json')
	      .then(response => response.json())
	      .then(data => {
	      	jsonVerb = data;
	    })
	    .catch(error => console.error('Error loading JSON:', error))
        .finally(() => {
            fetchList.push('verb');
		    // Possibly no data like present tense быть
			let question = generateRandomVerbSelection(jsonVerb);
			while (question[3] == "-") {
				question = generateRandomVerbSelection(jsonVerb);
			}
			document.getElementById("question").textContent =  "Question: "
															   +question[2]+" ____"+" ("
															   +question[0]+" - \""+question[4]
															   +"\") "+"("+question[1]+")";
			correctAnswer = question[3];	
    });
    } else { // If already fetched
		// Possibly no data like present tense быть
		let question = generateRandomVerbSelection(jsonVerb);
		while (question[3] == "-") {
			question = generateRandomVerbSelection(jsonVerb);
		}
		document.getElementById("question").textContent =  "Question: "
														   +question[2]+" ____"+" ("
														   +question[0]+" - \""+question[4]
														   +"\") "+"("+question[1]+")";
		correctAnswer = question[3];
    }
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
	let answer = document.getElementById("inputAnswer").value.toLowerCase();
	if (answer.replace(/\s/g, '') == correctAnswer.toLowerCase()) {
		document.getElementById("result").innerHTML = "Result: <span style='color: green;'>Correct!</span>";
	} else {
		document.getElementById("result").innerHTML = "Result: <span style='color: red;'>Incorrect - "
													  +correctAnswer+"</span>";
	}

	// Wait 5 seconds for user to read corrected answer, then reset
	setTimeout(() => {
		// Reset Result and input answer field
		document.getElementById("result").innerHTML = "Result: ";
		document.getElementById("inputAnswer").value = "";

		// Find out which exercise we need to get a new question from
		// By looking at the current title that we set
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
				console.error("Something went wrong in checkAnswer()!");
		}
	}, 5000);
};
