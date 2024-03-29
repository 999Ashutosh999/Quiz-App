const questions = [
    {
        question:"Which is the largest in the world?",
        answers:[
            {text:"Shark",correct: false},
            {text:"Blue Whale",correct: true},
            {text:"Elephant",correct: false},
            {text:"Giraffe",correct: false},
        ]
    },
    {
     question:"Which organ purifies our blood?",
        answers:[
            {text:"Kidney",correct: true},
            {text:"Lungs",correct: false},
            {text:"Brain",correct: false},
            {text:"Stomach",correct: false},
        ]  
    },
    {
        question:"Which of the following used in pencils?",
        answers:[
            {text:"Silicon",correct: false},
            {text:"Charcoal",correct: false},
            {text:"Graphite",correct: true},
            {text:"Phosphorous",correct: false},
        ]
    },
    {
        question:"The gas usually filled in the electric bulb is",
        answers:[
            {text:"Hydrogen",correct: false},
            {text:"Carbon Dioxide",correct: false},
            {text:"Oxygen",correct: false},
            {text:"Nitrogen",correct: true},
        ]
    }
];
const questionelement=document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score =0;
function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();

}

function showQuestion(){
    resetstate();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionelement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectanswer);


    })
}

function resetstate(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectanswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled  = true;
    })
    nextButton.style.display = "block";
}

function showScore(){
    resetstate();
    questionelement.innerHTML = `you scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();
