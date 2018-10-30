window.onload = init;

let INVISION_URL = "https://projects.invisionapp.com/share/C6OMGSSHXWJ#/screens/326040247";

let questions = [
    "When I read news feeds or see others' photos on Instagram, I think that others are having a better life than me.",
    "When I read news feeds or see others' photos on Instagram, I think that I am isolated from others.",
    "When using Instagram, I feel satisfied with my life.",
    "When using Instagram, I feel like my life is close to ideal.",
];

let answers = new Array(questions.length);

let currentQuestion = 0;

function init() {
    generateQuestions(questions);
    window.localStorage.setItem('answers', JSON.stringify(new Array(questions.length)));
}

function generateQuestions(questions) {
    let questionElements = new Array();
    for (i in questions) {
        let elem = document.createElement('div')
        elem.setAttribute('class', 'question')
        elem.id = `q${i}`
        elem.innerHTML = `
                <p>${questions[i]}</p>
                <div class="question_input">
                    <div class="question_labels">
                        <span class="left">never</span>
                        <span class="right">always</span>
                    </div>
                    <div class="question_buttons">
                        <input type="radio" onclick="recordAnswer(this)" name="q${i}" value="1">
                        <input type="radio" onclick="recordAnswer(this)" name="q${i}" value="2">
                        <input type="radio" onclick="recordAnswer(this)" name="q${i}" value="3">
                        <input type="radio" onclick="recordAnswer(this)" name="q${i}" value="4">
                        <input type="radio" onclick="recordAnswer(this)" name="q${i}" value="5">
                    </div>
                </div>
            `;
        questionElements[i] = elem;
        document.body.appendChild(elem);
    }

    nextQuestion();
}

function nextQuestion() {
	if (currentQuestion === questions.length) {
		submitToServer();
		return;
	}
    document.body.style.opacity = '0';

    setTimeout(() => {
        let elem;
		for (let i = 0; i < questions.length; i++) {
			elem = document.querySelector(`#q${i}`);
			elem.style.display = 'none';
		}

		elem = document.querySelector(`#q${currentQuestion++}`);
		elem.style.display = 'flex';
		document.body.style.opacity = '1';
    }, 300)
}

function recordAnswer(radio) {
    // record to localStorage
    let recordedAnswers = JSON.parse(window.localStorage.getItem('answers'));
    let questionNum = parseInt(radio.name[1]);
    recordedAnswers[questionNum] = parseInt(radio.value);
    window.localStorage.setItem('answers', JSON.stringify(recordedAnswers));

    // advance question
    nextQuestion();
}

function submitToServer() {
	let data = {
		username: localStorage.getItem('username'),
		results: localStorage.getItem('answers')
	}

	let params = {
		headers : {
			"Content-Type": "application/json; charset=utf-8",
		},
		body: JSON.stringify(data),
		method: "POST"
	}

	fetch('/submit-data', params)
		.then((err) => {
			console.log(err);
			// window.location.href = INVISION_URL;
		});
}

function animate(selector, layoutChangeCb) {
    const elm = document.querySelector(selector);

    // First: get the current bounds
    const first = elm.getBoundingClientRect();

    // change the layout
    layoutChangeCb();

    // Last: get the final bounds
    const last = elm.getBoundingClientRect();

    // Invert: determine the delta between the 
    // first and last bounds to invert the element
    const deltaX = first.left - last.left;
    const deltaY = first.top - last.top;
    const deltaW = first.width / last.width;
    const deltaH = first.height / last.height;

    // Play: animate the final element from its first bounds
    // to its last bounds (which is no transform)
    elm.animate([{
    transformOrigin: 'top left',
    transform: `
        translate(${deltaX}px, ${deltaY}px)
        scale(${deltaW}, ${deltaH})
    `
    }, {
    transformOrigin: 'top left',
    transform: 'none'
    }], {
    duration: 300,
    easing: 'ease-in-out',
    fill: 'both'
    });
}