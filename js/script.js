let game = {};

let exmplElem = document.getElementById('example');
let messElem = document.getElementById('message');
let answElem = document.getElementById('answer');
let divElem = document.getElementById('block');
let btnAddAnswer = document.getElementById('btn');
let count = 1;
let countLevel = 1;

//////////////////////////////////////
addNewLevel();
exmplElem.innerHTML = game['level' + countLevel].randomFactors[count - 1] + " x " + game['level' + countLevel].fixedFactor + " =";


btnAddAnswer.addEventListener('click', checkAnswer);
answElem.addEventListener('keydown', function(event){
    if (event.code == 'Enter') {
        checkAnswer();
    }
});
//////////////////////////////////////

function Level(fixedFactor, randomFactors, answers) {
    this.fixedFactor = fixedFactor;
    this.randomFactors = randomFactors;
    this.answers = answers;
    this.userAnswers = [];
    this.correctAnswer = 0;
};

function addNewLevel() {
    let fixedFactor = randomInteger();
    let randomFactors = [];

    while (randomFactors.length != 5 && randomFactors.length < 5) {
        let rand = randomInteger();
        if (randomFactors.includes(rand)) continue;
        randomFactors.push(rand);
    }

    let answers = randomFactors.map(function (num) {
        return num * fixedFactor;
    });

    game['level' + countLevel] = new Level(fixedFactor, randomFactors, answers);
};

function checkAnswer() {
    if (document.getElementById('answer').value == '') {
       answElem.style.borderColor = 'red';
        alert("Неккорекный ввод! Введите число!");
    } else {
        answElem.style.borderColor = '';
        exmplElem.innerHTML = game['level' + countLevel].randomFactors[count] + " x " + game['level' + countLevel].fixedFactor + " =";
        game['level' + countLevel].userAnswers[count - 1] = document.getElementById('answer').value;

        if (game['level' + countLevel].userAnswers[count - 1] == game['level' + countLevel].answers[count - 1]) {
            messElem.style.color = "#00D849";
            messElem.innerHTML = "Верно!";
            game['level' + countLevel].correctAnswer++;
        } else {
            messElem.style.color = "#FF4E58";
            messElem.innerHTML = "Неверно!";
        }

        if (count == game['level' + countLevel].randomFactors.length) {
            checkEndLevel(game['level' + countLevel]);
            return;
        }

        answElem.value = '';
        count++;
    }
};

function checkEndLevel(arr) {
    if (arr.correctAnswer >= arr.randomFactors.length / 2) {
        const code = "<span class='messageCongr'>Поздравляем! <br> Можете переходить на следующий уровен!</span> <span class='correctAnsw'>Правильных ответов " + arr.correctAnswer + " из " + arr.randomFactors.length + " </span>  <button class='btnRepeat' onclick='repeatLevel()'><img src='img/spiner.png'></button> <button class='btnNext' onclick='nextLevel()'><img class='imgNext' src='img/tr.png'></button>";
        divElem.innerHTML = code;
    } else if (arr.correctAnswer < arr.randomFactors.length / 2) {
        const code = "<span class='messageRepeat'>Попробуйте ещё раз!</span> <span class='correctAnsw'>Правильных ответов " + arr.correctAnswer + " из " + arr.randomFactors.length + " </span> <button class='btnRepeat' onclick='repeatLevel()'><img src='img/spiner.png'></button>";
        divElem.innerHTML = code;
    }
    count = 1;
};


function nextLevel() {
    countLevel++;
    addNewLevel();
    const code = " <div class='level'> <label id='level'>Уровень " + countLevel + "</label> </div> <div class='message'> <label id='message'>Впишите ответ</label> </div> <div class='task'> <label class='example' id='example'></label> <input class='answer' id='answer' type='number' name='answer'> </div> <div> <button class='btn' id='btn' onclick='checkAnswer()'><span>Дать Ответ</span></button> </div>";

    divElem.innerHTML = code;
    initailElements();
    exmplElem.innerHTML = game['level' + countLevel].randomFactors[count - 1] + " x " + game['level' + countLevel].fixedFactor + " =";
};

function initailElements() {
    exmplElem = document.getElementById('example');
    messElem = document.getElementById('message');
    answElem = document.getElementById('answer');
};

function repeatLevel() {
    game['level' + countLevel].correctAnswer = 0;
    const code = " <div class='level'> <label id='level'>Уровень " + countLevel + "</label> </div> <div class='message'> <label id='message'>Впишите ответ</label> </div> <div class='task'> <label class='example' id='example'></label> <input class='answer' id='answer' type='number name='answer'> </div> <div> <button class='btn' id='btn' onclick='checkAnswer()'><span>Дать Ответ</span></button> </div>";
    divElem.innerHTML = code;
    initailElements();
    exmplElem.innerHTML = game['level' + countLevel].randomFactors[count - 1] + " x " + game['level' + countLevel].fixedFactor + " =";
};


function randomInteger(min = 10, max = 20) {
    let rand = Math.floor(min + Math.random() * (max + 1 - min));
    return rand;
};


