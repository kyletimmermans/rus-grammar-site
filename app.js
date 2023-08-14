// Keep track of JSON information
var jsonVerb, jsonNoun, jsonAdj, jsonPronoun;
var jsonQuestion, jsonPossess, jsonDemonst;
var jsonCompare, correctAnswer, fetchList = [];

// Start with verbs on site load
document.addEventListener("DOMContentLoaded", (event) => {
	verb();
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomString(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const randomVerb = (data) => {
  let randomVerb = data.verb[getRandomInt(0, data.verb.length - 1)];
  // 60% present, 30% past, 10% imperative
  let conjType = getRandomString(['present', 'present', 'present', 'present', 'present',
  								  'present', 'past', 'past', 'past', 'imperative']);
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

const randomNoun = (data, amount) => {
	let randomNoun = data.noun[getRandomInt(0, data.noun.length - 1)];
	let gramcase = getRandomString(['gn', 'dt', 'ac', 'in', 'pr']);
	let finalCase;

	switch (gramcase) {
		case "gn":
			finalCase = "Genitive";
			break;
		case "dt":
			finalCase = "Dative";
			break;
		case "ac":
			finalCase = "Accusative";
			break;
		case "in":
			finalCase = "Instrumental";
			break;
		case "pr":
			finalCase = "Prepositional";
			break;
	}

	// nm case of noun, translation, case, gender, animate, final noun
	return [randomNoun.name, randomNoun.translation, finalCase, 
			randomNoun.gender, randomNoun.animate,
			randomNoun.conjugations[amount][gramcase]]
}

const randomAdjective = (data, amount) => {
	let randomAdj = data.adjective[getRandomInt(0, data.adjective.length - 1)];
	let gramcase = getRandomString(['gn', 'dt', 'aca', 'aci', 'in', 'pr']);
	let finalCase;
	let gender;
	if (amount == "s") {
		gender = getRandomString(['m', 'f', 'n']);
	} else {
		gender = 'p';
	}

	switch (gramcase) {
		case "gn":
			finalCase = "Genitive";
			break;
		case "dt":
			finalCase = "Dative";
			break;
		case "aca":
			finalCase = "Accusative Animate";
			break;
		case "aci":
			finalCase = "Accusative Inanimate";
			break;
		case "in":
			finalCase = "Instrumental";
			break;
		case "pr":
			finalCase = "Prepositional";
			break;
	}

	// nm case of noun, translation, case, gender, animate, final noun
	return [randomAdj.name, randomAdj.translation, finalCase, 
			gender, randomAdj.conjugations[gender][gramcase]];
}

const randomPronoun = (data) => {
	let randomPronoun = data.pronoun[getRandomInt(0, data.pronoun.length - 1)];
	let preposition;
	let gramcase = getRandomString(['gn', 'dt', 'ac', 'in', 'pr']);
	let finalCase;
	switch (gramcase) {
		case "gn":
			finalCase = "Genitive";
			break;
		case "dt":
			finalCase = "Dative";
			break;
		case "ac":
			finalCase = "Accusative";
			break;
		case "in":
			finalCase = "Instrumental";
			break;
		case "pr":
			finalCase = "Prepositional";
			break;
	}

	if (["он / оно", "она", "они"].includes(randomPronoun.name)) {
		preposition = getRandomInt(0, 1);
	}

	return [randomPronoun.name, finalCase, preposition,
			randomPronoun.conjugations[gramcase]]
}

const randomPossessive = (data) => {
}

const randomDemonstrative = (data) => {
}

const randomComparative = (data) => {
}

const randomQuestionWord = (data) => {
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
			let q = randomVerb(jsonVerb);
			while (q[3] == "-") {
				q = randomVerb(jsonVerb);
			}
			document.getElementById("question").innerHTML =  q[2]+" ____"+" ("
															 +"<b>"+q[0]+"</b>"+" - \""+q[4]
															 +"\") "+"("+q[1]+")";
			correctAnswer = q[3];	
    });
    } else { // If already fetched
		// Possibly no data like present tense быть
		let q = randomVerb(jsonVerb);
		while (q[3] == "-") {
			q = randomVerb(jsonVerb);
		}
		document.getElementById("question").innerHTML =  q[2]+" ____"+" ("
														 +"<b>"+q[0]+"</b>"+" - \""+q[4]
														 +"\") "+"("+q[1]+")";
		correctAnswer = q[3];
    }
};

const singNoun = () => {
	document.querySelector(".centered-title").innerHTML = "Singular Noun Cases";

	if (fetchList.includes('noun') == false) {
	    fetch('./wordbank/nouns.json')
	      .then(response => response.json())
	      .then(data => {
	      	jsonNoun = data;
	    })
	    .catch(error => console.error('Error loading JSON:', error))
        .finally(() => {
            fetchList.push('noun');
            let q = randomNoun(jsonNoun, "s");
            if (q[4] == true) { // Animate or not
				document.getElementById("question").innerHTML = "Singular "
																 +q[2]+" "+"<b>"+q[0]+"</b>"
																 +" (\""+q[1]+"\", "
																 +q[3]+", animate)";
			} else {
				document.getElementById("question").innerHTML = "Singular "
																 +q[2]+" "+"<b>"+q[0]+"</b>"
																 +" (\""+q[1]+"\", "
																 +q[3]+")";
			}	
			correctAnswer = q[5];	
    });
    } else {
		let q = randomNoun(jsonNoun, "s");
        if (q[4] == true) {
			document.getElementById("question").innerHTML = "Singular "
															 +q[2]+" "+"<b>"+q[0]+"</b>"
															 +" (\""+q[1]+"\", "
															 +q[3]+", animate)";
		} else {
			document.getElementById("question").innerHTML = "Singular "
															 +q[2]+" "+"<b>"+q[0]+"</b>"
															 +" (\""+q[1]+"\", "
															 +q[3]+")";
		}
		correctAnswer = q[5];
    }
};

const plurNoun = () => {
    document.querySelector(".centered-title").textContent = "Plural Noun Cases";

	if (fetchList.includes('noun') == false) {
	    fetch('./wordbank/nouns.json')
	      .then(response => response.json())
	      .then(data => {
	      	jsonNoun = data;
	    })
	    .catch(error => console.error('Error loading JSON:', error))
        .finally(() => {
            fetchList.push('noun');
            let q = randomNoun(jsonNoun, "p");
            if (q[4] == true) {
				document.getElementById("question").innerHTML = "Plural "
																 +q[2]+" "+"<b>"+q[0]+"</b>"
																 +" (\""+q[1]+"\", "
																 +q[3]+", animate)";
			} else {
				document.getElementById("question").innerHTML = "Plural "
																 +q[2]+" "+"<b>"+q[0]+"</b>"
																 +" (\""+q[1]+"\", "
																 +q[3]+")";
			}	
			correctAnswer = q[5];	
    });
    } else {
		let q = randomNoun(jsonNoun, "p");
        if (q[4] == true) {
			document.getElementById("question").innerHTML = "Plural "
															 +q[2]+" "+"<b>"+q[0]+"</b>"
															 +" (\""+q[1]+"\", "
															 +q[3]+", animate)";
		} else {
			document.getElementById("question").innerHTML = "Plural "
															 +q[2]+" "+"<b>"+q[0]+"</b>"
															 +" (\""+q[1]+"\", "
															 +q[3]+")";
		}
		correctAnswer = q[5];
    }
};

const singAdj = () => {
    document.querySelector(".centered-title").textContent = "Singular Adjective Cases";

	if (fetchList.includes('adj') == false) {
	    fetch('./wordbank/adjectives.json')
	      .then(response => response.json())
	      .then(data => {
	      	jsonAdj = data;
	    })
	    .catch(error => console.error('Error loading JSON:', error))
        .finally(() => {
            fetchList.push('adj');
            let q = randomAdjective(jsonAdj, "s");
            let finalGender;
            switch (q[3]) {
            	case "m":
            		finalGender = "Masculine";
            		break;
            	case "f":
            		finalGender = "Feminine";
            		break;
            	case "n":
            		finalGender = "Neuter";
            		break;
            }
			document.getElementById("question").innerHTML = "Singular "+finalGender+" "
															 +q[2]+" "+"<b>"+q[0]+"</b>"
															 +" (\""+q[1]+"\")";
			correctAnswer = q[4];	
    });
    } else {
		let q = randomAdjective(jsonAdj, "s");
	    let finalGender;
        switch (q[3]) {
        	case "m":
        		finalGender = "Masculine";
        		break;
        	case "f":
        		finalGender = "Feminine";
        		break;
        	case "n":
        		finalGender = "Neuter";
        		break;
        }
		document.getElementById("question").innerHTML = "Singular "+finalGender+" "
														 +q[2]+" "+"<b>"+q[0]+"</b>"
														 +" (\""+q[1]+"\")";
		correctAnswer = q[4];
    }
};

const plurAdj = () => {
    document.querySelector(".centered-title").textContent = "Plural Adjective Cases";

	if (fetchList.includes('adj') == false) {
	    fetch('./wordbank/adjectives.json')
	      .then(response => response.json())
	      .then(data => {
	      	jsonAdj = data;
	    })
	    .catch(error => console.error('Error loading JSON:', error))
        .finally(() => {
            fetchList.push('adj');
            let q = randomAdjective(jsonAdj, "p");
			document.getElementById("question").innerHTML = "Plural "+q[2]+" "
															 +"<b>"+q[0]+"</b>"
															 +" (\""+q[1]+"\")";
			correctAnswer = q[4];	
    });
    } else {
		let q = randomAdjective(jsonAdj, "p");
		document.getElementById("question").innerHTML = "Plural "+q[2]+" "
														 +"<b>"+q[0]+"</b>"
														 +" (\""+q[1]+"\")";
		correctAnswer = q[4];
    }
};

const pronoun = () => {
    document.querySelector(".centered-title").textContent = "Pronoun Cases";

	if (fetchList.includes('pro') == false) {
	    fetch('./wordbank/pronouns.json')
	      .then(response => response.json())
	      .then(data => {
	      	jsonPronoun = data;
	    })
	    .catch(error => console.error('Error loading JSON:', error))
        .finally(() => {
            fetchList.push('pro');
            let q = randomPronoun(jsonPronoun);
            console.log(q[2]);
            if (q[2] === undefined || q[2] == 0){
				document.getElementById("question").innerHTML = q[1]+"<b> "+q[0]+"</b>";
				// No "(н)"
				if (q[3].substring(0, 3) == "(н)") {
					correctAnswer = q[3].slice(3);
				} else {
					correctAnswer = q[3];
				}
			} else if (q[2] == 1) {
				document.getElementById("question").innerHTML = q[1]+"<b> "+q[0]+"</b>"
																+" (After preposition)";
				// Remove parenthesis from (н)
				correctAnswer = q[3].replace(/\(|\)/g, "");					
			}
    });
    } else {
		let q = randomPronoun(jsonPronoun);
        if (q[2] === undefined || q[2] == 0){
			document.getElementById("question").innerHTML = q[1]+"<b> "+q[0]+"</b>";
			if (q[3].substring(0, 3) == "(н)") {
				correctAnswer = q[3].slice(3);
			} else {
				correctAnswer = q[3];
			}	
		} else if (q[2] == 1) {
			document.getElementById("question").innerHTML = q[1]+"<b> "+q[0]+"</b>"
															+" (After preposition)";
			// Remove parenthesis from (н)
			correctAnswer = q[3].replace(/\(|\)/g, "");					
		}
    }
};

const possesive = () => {
    document.querySelector(".centered-title").textContent = "Possesive Pronoun + Сам Cases";
};

const demonstrative = () => {
    document.querySelector(".centered-title").textContent = "Demonstrative + Весь Cases";
};

const questionword = () => {
    document.querySelector(".centered-title").textContent = "Question Word Cases";
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
			case "Possesive Pronoun + Сам Cases":
				possesive();
				break;
			case "Demonstrative + Весь Cases":
				demonstrative();
				break;
			case "Question Word Cases":
				comparative();
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
