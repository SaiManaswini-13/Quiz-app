const quizData = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        a: "<script>",
        b: "<javascript>",
        c: "<js>",
        d: "<scripting>",
        answer: "a"
    },
    {
        question: '<p id="demo">This is a demonstration.</p>',
        a: 'document.getElement("p").innerHTML = "Hello World!";',
        b: 'document.getElementById("demo").innerHTML = "Hello World!";  ',
        c: '#demo.innerHTML = "Hello World!";',
        d: 'document.getElementByName("p").innerHTML = "Hello World!";',
        answer: "b"
    },
    {
        question: "How to write an IF statement in JavaScript?",
        a: "if i = 5",
        b: "if i = 5 then",
        c: "if i == 5 then",
        d: "if (i == 5)",
        answer: "d"
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        a: 'var colors = (1:"red", 2:"green", 3:"blue")',
        b: 'var colors = ["red", "green", "blue"]  ',
        c: 'var colors = "red", "green", "blue"',
        d: 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")',
        answer: "b"
    },
    {
        question: "How do you round the number 7.25, to the nearest integer?",
        a: "round(7.25)",
        b: "Math.rnd(7.25)",
        c: "Math.round(7.25)",
        d: "rnd(7.25)",
        answer: "c"
    }
];

const quiz = document.getElementById('quiz');
const result_el = document.getElementById("result");

const answer_el = document.querySelectorAll(".answer");
const label_el = document.querySelectorAll(".op_label");
const question = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const prev_btn = document.getElementById("previous");
const next_btn = document.getElementById("next");
const submit_btn = document.getElementById("submit");
const score_el = document.getElementById("score");

let current_ques = 0;
let answered = 0;
let submitted = false;

let userSelected = {}

function loadQuiz() {
    question.innerText = quizData[current_ques].question;
    a_text.innerText = quizData[current_ques].a;
    b_text.innerText = quizData[current_ques].b;
    c_text.innerText = quizData[current_ques].c;
    d_text.innerText = quizData[current_ques].d;

    deSelect()

    if (userSelected[current_ques]) {
        let selected = userSelected[current_ques];
        document.getElementById(selected).checked = true;
    }

    if (current_ques == quizData.length - 1) {
        next_btn.style.display = "none";
        submit_btn.style.display = "block";
    }

    if (submitted) {
        let correct_ans = quizData[current_ques].answer;
        let selected_ans = userSelected[current_ques];

        label_el.forEach(
            (label_el) => {
                label_el.classList.remove("correct");
                label_el.classList.remove("wrong");
            }
        )

        if (correct_ans == selected_ans) {
            let op = correct_ans + "_text";
            document.getElementById(op).classList.add("correct")
        } else {
            let correct_op = correct_ans + "_text";
            document.getElementById(correct_op).classList.add("correct");

            let user_op = selected_ans + "_text";
            document.getElementById(user_op).classList.add("wrong")
        }
    }
}


function getSelected() {
    let ans;
    answer_el.forEach(
        (answer_el) => {
            if (answer_el.checked) {
                ans = answer_el.id;
                userSelected[current_ques] = ans;
            }
        }
    )
    return ans;
}

function deSelect() {
    answer_el.forEach(
        (answer_el) => {
            answer_el.checked = false;
        }
    )
}

next_btn.addEventListener("click", () => {
    let ans = getSelected();
    if (!submitted) {
        if (ans) {
            if (ans == quizData[current_ques].answer) {
                answered++;
                console.log(answered)
            }
            current_ques++;
            if (current_ques < quizData.length) {
                loadQuiz();
            }
        }
    }
    else {
        current_ques++;
        loadQuiz()
    }
})

prev_btn.addEventListener("click", () => {
    if (current_ques > 0) {
        current_ques--;
        loadQuiz()
    }
})

submit_btn.addEventListener("click", () => {
    let ans = getSelected();
    if (ans) {
        if (ans == quizData[current_ques].answer) {
            answered++;
            console.log(answered)
        }
        submitted = true;
        quiz.style.display = "none";
        result_el.style.display = "block";
        score_el.innerText = `${answered} / ${quizData.length} questions answered correctly`
    }
})

function loadAns() {
    current_ques = 0;
    quiz.style.display = "block";
    result_el.style.display = "none";
    answer_el.forEach(
        (answer_el) => {
            answer_el.disabled = true;
        }
    )
    submit_btn.style.display = "none";
    next_btn.style.display = "block";
    loadQuiz()
}

loadQuiz()