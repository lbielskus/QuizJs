/*
// create a quiz app
// user answers questions and gets points for correct ones
// in main component you have only points counter and array with questions
// in child component you have question with answers


let quiz = [
    {
        question: "Kuriais metais krikštatėvis buvo išleistas pirmą kartą?",
        answers: ['1993', "1852", "1662", "1972"],
        correct: 3
    },
    {
        question: "Kuris aktorius pelnė geriausią aktoriaus Oskarą už filmus „Filadelfija“ (1993) ir „Forrest Gump“ (1994)?",
        answers: ['Jonas Bulijonas', "Tomas Kukuruzas", "Tom Hanks", "Mikas plikas"],
        correct: 2
    },
    {
        question: "Kiek savarankiškų komizionų padarė Alfredas Hitchcockas savo filmuose 1927–1976 metais - 33, 35 ar 37?",
        answers: ['12', "37", "100", "2"],
        correct: 1
    },
    {
        question: "Kuris 1982 m. Filmas buvo labai gerbėjų sutiktas dėl meilės tarp jauno, tėvo neturinčio priemiesčio berniuko ir pasiklydusio, geranoriško bei namuose gyvenančio svečio iš kitos planetos vaizdavimo?",
        answers: ['IR Nežemiškas', "Gelbėtojai", "Terminatorius", "Titanikas"],
        correct: 0
    },
    {
        question: "Kuri aktorė vaidino Mary Poppins 1964 m. Filme „Mary Poppins“?",
        answers: ['Andželina joly', " Julie Andrews", "Karen Gillan", "Lucy Liu"],
        correct: 1
    }
]
 */

var quiz = {
    // (A) PROPERTIES
    // (A1) QUESTIONS & ANSWERS
    data: [
        {
            question: "Kuriais metais krikštatėvis buvo išleistas pirmą kartą?",
            answers: ['1993', "1852", "1662", "1972"],
            correct: 3
        },
        {
            question: "Kuris aktorius pelnė geriausią aktoriaus Oskarą už filmus „Filadelfija“ (1993) ir „Forrest Gump“ (1994)?",
            answers: ['Jonas Bulijonas', "Tomas Kukuruzas", "Tom Hanks", "Mikas plikas"],
            correct: 2
        },
        {
            question: "Kiek savarankiškų komizionų padarė Alfredas Hitchcockas savo filmuose 1927–1976 metais - 33, 35 ar 37?",
            answers: ['12', "37", "100", "2"],
            correct: 1
        },
        {
            question: "Kuris 1982 m. Filmas buvo labai gerbėjų sutiktas dėl meilės tarp jauno, tėvo neturinčio priemiesčio berniuko ir pasiklydusio, geranoriško bei namuose gyvenančio svečio iš kitos planetos vaizdavimo?",
            answers: ['IR Nežemiškas', "Gelbėtojai", "Terminatorius", "Titanikas"],
            correct: 0
        },
        {
            question: "Kuri aktorė vaidino Mary Poppins 1964 m. Filme „Mary Poppins“?",
            answers: ['Andželina joly', " Julie Andrews", "Karen Gillan", "Lucy Liu"],
            correct: 1
        }
    ],



    // (A2) HTML ELEMENTS
    hWrap: null, // HTML quiz container
    hQn: null, // HTML question wrapper
    hAns: null, // HTML answers wrapper

    // (A3) GAME FLAGS
    now: 0, // current question
    score: 0, // current score

    // (B) INIT QUIZ HTML
    init: function(){
        // (B1) WRAPPER
        quiz.hWrap = document.getElementById("quizWrap");

        // (B2) QUESTIONS SECTION
        quiz.hQn = document.createElement("div");
        quiz.hQn.id = "quizQn";
        quiz.hWrap.appendChild(quiz.hQn);

        // (B3) ANSWERS SECTION
        quiz.hAns = document.createElement("div");
        quiz.hAns.id = "quizAns";
        quiz.hWrap.appendChild(quiz.hAns);

        // (B4) GO!
        quiz.draw();
    },

    // (C) DRAW QUESTION
    draw: function(){
        // (C1) QUESTION
        quiz.hQn.innerHTML = quiz.data[quiz.now].question;

        // (C2) OPTIONS
        quiz.hAns.innerHTML = "";
        for (let i in quiz.data[quiz.now].answers) {
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "quiz";
            radio.id = "quizo" + i;
            quiz.hAns.appendChild(radio);
            let label = document.createElement("label");
            label.innerHTML = quiz.data[quiz.now].answers[i];
            label.setAttribute("for", "quizo" + i);
            label.dataset.idx = i;
            label.addEventListener("click", quiz.select);
            quiz.hAns.appendChild(label);
        }
    },

    // (D) OPTION SELECTED
    select: function(){
        // (D1) DETACH ALL ONCLICK
        let all = quiz.hAns.getElementsByTagName("label");
        for (let label of all) {
            label.removeEventListener("click", quiz.select);
        }

        // (D2) CHECK IF CORRECT
        let score = 0
        let correct = this.dataset.idx == quiz.data[quiz.now].correct;
        if (correct) {
            quiz.score++;
            score = score + 1;
            this.classList.add("correct");
            document.getElementById("score").innerHTML = score;
        } else {
            this.classList.add("wrong");
        }


        // (D3) NEXT QUESTION OR END GAME
        quiz.now++;
        setTimeout(function(){
            if (quiz.now < quiz.data.length) { quiz.draw(); }
            else {
                quiz.hQn.innerHTML = `You have ${quiz.score} of ${quiz.data.length} points.`;
                quiz.hAns.innerHTML = "";
            }
        }, 1000);
    }
};



window.addEventListener("load", quiz.init);
