const qId = document.querySelector('.id'); 
const queryTxt = document.querySelector('.query');
const blocks = document.querySelectorAll('.ans_btn'); 
const block1 = document.querySelector('.ans1')
const block2 = document.querySelector('.ans2')
const block3 = document.querySelector('.ans3')
const block4 = document.querySelector('.ans4')
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
let score = 0;

class Quiz {

// get questions
getQuestion(){

    let questions = [ 
        {
            id: 1,
            query: "Who's the founder of Tesla?",
            answers: [
                {answer:'Jeff Bezos', correct: false, point: 0},
                {answer:'Mark Zuckerberg', correct: false, point: 0}, 
                {answer:'Elon Musk', correct: true, point: 1}, 
                {answer:'Bill Gates', correct: false, point: 0}
            ]
        },
        {
            id: 2,
            query: "Which year was Javascript founded?",
            answers: [
                {answer:1995, correct: true, point: 1},
                {answer:1988, correct: false, point: 0}, 
                {answer:1993, correct: false, point: 0}, 
                {answer:1990, correct: false, point: 0}
            ]
        },
        {
            id: 3,
            query: "Which company created the first Smartphone?",
            answers: [
                {answer:'Microsoft', correct: false, point: 0},
                {answer:'Apple', correct: true, point: 1}, 
                {answer:'Samsung', correct: false, point: 0}, 
                {answer:'Nokia', correct: false, point: 0}
            ]
        },
        {
            id: 4,
            query: "Google`s slogan?",
            answers: [
                {answer:'The internet.', correct: false, point: 0},
                {answer:'Be creative.', correct: false, point: 0}, 
                {answer:'Think smart.', correct: false, point: 0}, 
                {answer:'Don\'t be evil.', correct: true, point: 1}
            ]
        },
        {
            id: 5,
            query: "Acronym of AI.",
            answers: [
                {answer:'Automated Internet', correct: false, point: 0},
                {answer:'Artificial Intelligence.', correct: true, point: 1}, 
                {answer:'Articulated Information', correct: false, point: 0}, 
                {answer:'Art&Internet', correct: false, point: 0}
            ]
        }
    ]

    return questions;

}

// display question
displayQuestion(i) {

    let question = this.getQuestion()[i];
    nextBtn.disabled = true;
    prevBtn.disabled = false;
    blocks.forEach(blk => {
        blk.disabled = false;
    })

    let answers = question.answers;
    qId.textContent = question.id;
    queryTxt.textContent = question.query;

    block1.textContent = answers[0].answer;
    block2.textContent = answers[1].answer;
    block3.textContent = answers[2].answer;
    block4.textContent = answers[3].answer;

    if(i > 0) {
        prevBtn.style.display = 'inline-block';
    }else {
        prevBtn.style.display = 'none';
    }

}

// check answer
checkAnswer(res, id, i){

    let result;
    let question = this.getQuestion();
    
    if(question[id].answers[i].correct) {
        result = true;
    }else {
        result = false;
    }

    return result;
}

// next question
nextQuestion(ids){

   this.displayQuestion(ids);

}

// update the score
updateScore(id, i) {

    score;

    let question = this.getQuestion(); 
    if(question[id].answers[i].correct) {

        if(score < 1) {
            score = question[id].answers[i].point;
        }else {
            score++;
        }
    }

}

//get score after the test
getScore() {
    return score;
}

resetGame() {
    score = 0;
    this.displayQuestion(0);
}

// display the final score after the quiz is finished
checkResults() {

    const resultBtn = document.querySelector('.results-btn')
    resultBtn.addEventListener('click',e => {

        e.target.parentElement.remove();
        blocks.forEach(block => {
            block.remove();
        })
        
        // results text
        let span = document.createElement('span');
        span.classList.add('text-xxl');
        span.textContent = `Results: ${this.getScore()} point(s)!`;

        // replace everything with result text
        qId.parentElement.replaceWith(span)

        // restart quiz button
        queryTxt.innerHTML = `<a href="" class="btn blue">Restart</a>`;

    })

}


}

let app = new Quiz();
app.displayQuestion(0);

// each block with a click event to select an answer and 
blocks.forEach((block, i,  blocks) => {
    block.addEventListener('click', e => {
        
        // question id
        let question_id = qId.textContent - 1;
        // answer
        let value = block.innerText;
        // block index
        let i = e.target.classList[1].substring(3) - 1;
        // check if the answer is valid
        app.checkAnswer(value, question_id, i);
        // update the score
        app.updateScore(question_id, i)
        // turn on the button after the answer is selected
        nextBtn.disabled = false;
        prevBtn.disabled = true;
        blocks.forEach(blk => {
            blk.disabled = true;
            blk.style.background = 'rgb(80, 80, 80)';
        })

        // if the answer is true (bg-color = green) if not (bg-color = red)
        if(app.checkAnswer(value, question_id, i)){
            e.target.classList.add('correct_answer');
        }
        else {
            e.target.classList.add('wrong_answer');
        }

    })
});

// click to proceed to the next question
nextBtn.addEventListener('click', e => {

    let question_id = qId.textContent - 1;
    let i = qId.textContent;
    
    if(i < app.getQuestion().length) {
        
        // if the answer is changed, reset all blocks to default bg color
        blocks.forEach(block => {
            block.style.background = 'rgb(0, 99, 230)'; 
            block.classList.remove('wrong_answer', 'correct_answer');
        })
        
        app.displayQuestion(question_id+1);

    }else {
        e.target.innerHTML = 'See results &raquo;';
        e.target.classList.add('results-btn')
        e.target.classList.remove('nextBtn')
        prevBtn.remove();
        app.checkResults() 
    }

})

// click to go back to the prev question
prevBtn.addEventListener('click', e => {

    let question_id = qId.textContent - 1;
    let i = qId.textContent;
    
    if(i < app.getQuestion().length) {
        
        // if the answer is changed, reset all blocks to default bg color
        blocks.forEach(block => {
            block.style.background = 'rgb(0, 99, 230)'; 
            block.classList.remove('wrong_answer', 'correct_answer');
        })
        
        app.displayQuestion(question_id-1);

    }

})