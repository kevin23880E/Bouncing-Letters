function setup() {
    createCanvas(displayWidth, displayHeight);
    textSize(70);

    startTime = millis();
}

var deltaT = 10000;

var debug = 0;

var letters = [];

var alpha = "abcdefghijklmnopqrstuvwxyzI'"

var letterSize = 50;

var oneUnit = letterSize;
var twoUnit = letterSize * 2;
var threeUnit = letterSize * 3;

var oneAndHalfUnit = Math.floor(letterSize * 1.5);
var twoAndHalfUnit = Math.floor(letterSize * 2.5);
var threeAndHalfUnit = Math.floor(letterSize * 3.5);


var doMovement = true;

var speedUnit = 0.15;

var skinnyLetters = "iIjtlrf'";
var wideLetters = "wm";

var screen = "SELECT";

var wordsA = ["is", "we", "can", "see", "a", "I", "the", "to", "my", "am"];
var wordsB = ["big", "at", "like", "look", "play", "has", "too", "got", "have", "some", "and", "in", "our", "went", "here", "new", "put"];
var wordsC = ["he", "likes", "loves", "come", "with", "help", "her", "your", "said", "this", "go", "an"];
var wordsD = ["these", "want", "can't", "asked", "good", "for", "from", "make", "find", "saw", "they", "not", "there"];

var buttons = [];

//TIMER FUNCTION
function timer() {
    if(millis() > startTime + deltaT) {
        doMovement = false;
    }
}


function mousePressed() {
    for(var i = 0; i < buttons.length; i++) {
        if(buttons[i].hover) {
            console.log("Hi");
            screen = "LETTERS";
        }
    }
}

//Button OBJECT
var Button = function(x, y, size, txt) {
    this.x = x;
    this.y = y;
    this.s = size;
    this.txt = txt;
    this.hover = false;
}

Button.prototype.draw = function() {
    rectMode(CENTER);
    fill(0);
    rect(this.x, this.y, this.s, this.s, 10);
    fill(150);
    rect(this.x, this.y, this.s * 0.9, this.s * 0.9, 10);
    fill(0);
    text(this.txt, this.x - this.s / 4, this.y + this.s / 4);
}
Button.prototype.over = function() {
    if(mouseX > this.x - this.s / 2 && mouseX < this.x + this.s < 2 && mouseY > this.y - this.s / 2 && mouseY < this.y + this.s / 2) {
        this.hover = true;
    }
}

//LETTER OBJECT
var Letter = function(x, y, vx, vy, letter, active) {
    this.x = x;
    this.y = y;
    this.w = letterSize;
    this.h = letterSize;
    this.vx = vx;
    this.vy = vy;
    this.letter = letter;
    this.active = active;
}

Letter.prototype.draw = function() {
    text(this.letter, this.x, this.y);
}

Letter.prototype.move = function() {
    this.x += this.vx;
    this.y += this.vy;

    if(this.x + this.w > window.innerWidth || this.x < 0) {
        this.vx *= -1;
    }

    if(this.y > window.innerHeight || this.y - this .h < 0) {
        this.vy *= -1;
    }
}


//Create Letters
for(var i = 0; i < 28; i++) {
    var randx = Math.random() * window.innerWidth * 0.9 + 20;
    var randy = Math.random() * window.innerHeight * 0.9 + 50;
    var randvx = Math.random() + 0.2;
    var randvy = Math.random() + 0.2;

    if(i % 2 === 0) {
        randvx *= -1;
    }
    if(i % 3 === 1) {
        randvx *=-1;
    }
    if(i % 2 === 1) {
        randvy *= -1;
    }
    if(i % 3 === 2) {
        randvy *= -1;
    }
    

    letters.push(new Letter(randx, randy, randvx, randvy, alpha[i], false));
}



function doWord(word) {
    var len = word.length;
    //console.log(len);
    switch(len) {
        //1 Letter
        case 1:
            letters[alpha.indexOf(word[0])] = new Letter(window.innerWidth / 2, window.innerHeight / 2 - twoAndHalfUnit, 0, speedUnit * 2, word[0], true);
            break;
        //2 Letters
        case 2:
            if(skinnyLetters.includes(word[0])) {
                letters[alpha.indexOf(word[0])] = new Letter(window.innerWidth / 2 - twoUnit, window.innerHeight / 2 + threeAndHalfUnit, speedUnit * 2.1, -speedUnit * 3, word[0], true);
            }
            else if(wideLetters.includes(word[0])) {
                letters[alpha.indexOf(word[0])] = new Letter(window.innerWidth / 2 - twoUnit, window.innerHeight / 2 + threeAndHalfUnit, speedUnit * 1.4, -speedUnit * 3, word[0], true);
            }
            else {
                letters[alpha.indexOf(word[0])] = new Letter(window.innerWidth / 2 - twoUnit, window.innerHeight / 2 + threeAndHalfUnit, speedUnit * 1.7, -speedUnit * 3, word[0], true);
            }
            

            letters[alpha.indexOf(word[1])] = new Letter(window.innerWidth / 2 + threeAndHalfUnit, window.innerHeight / 2 - twoAndHalfUnit, -speedUnit * 2.0, speedUnit * 2, word[1], true);

            break;

        //3 Letters
        case 3:
            //console.log(alpha.indexOf(word[2]));

            //make letters move less horizontal if wider
            if(word[0] === "m") {
                letters[alpha.indexOf(word[0])] = new Letter(window.innerWidth / 2 - twoAndHalfUnit, window.innerHeight / 2 - oneAndHalfUnit, speedUnit * 1.0, speedUnit * 2, word[0], true);
            }
            else if(word[0] === "w") {
                letters[alpha.indexOf(word[0])] = new Letter(window.innerWidth / 2 - twoAndHalfUnit, window.innerHeight / 2 - oneAndHalfUnit, speedUnit * 1.1, speedUnit * 2, word[0], true);
            }
            //thin letters
            else if(skinnyLetters.includes(word[0])) {
                letters[alpha.indexOf(word[0])] = new Letter(window.innerWidth / 2 - twoAndHalfUnit, window.innerHeight / 2 - oneAndHalfUnit, speedUnit * 1.7, speedUnit * 2, word[0], true);
            }
            else {
                letters[alpha.indexOf(word[0])] = new Letter(window.innerWidth / 2 - twoAndHalfUnit, window.innerHeight / 2 - oneAndHalfUnit, speedUnit * 1.5, speedUnit * 2, word[0], true);
            }
            
            if(skinnyLetters.includes(word[1])) {
                letters[alpha.indexOf(word[1])] = new Letter(window.innerWidth / 2 - oneAndHalfUnit, window.innerHeight / 2 + oneAndHalfUnit, speedUnit * 1.4, -speedUnit, word[1], true);
            }
            else {
                letters[alpha.indexOf(word[1])] = new Letter(window.innerWidth / 2 - oneAndHalfUnit, window.innerHeight / 2 + oneAndHalfUnit, speedUnit * 1.2, -speedUnit, word[1], true);
            }
            

            if(word[1] === word[2]) {
                letters.push(new Letter(window.innerWidth / 2 + threeAndHalfUnit, window.innerHeight / 2 + threeAndHalfUnit, -speedUnit * 3, -speedUnit * 3, word[2], true));
            }
            else {
                letters[alpha.indexOf(word[2])] = new Letter(window.innerWidth / 2 + threeAndHalfUnit, window.innerHeight / 2 + threeAndHalfUnit, -speedUnit * 3, -speedUnit * 3, word[2], true);
            }

            break;

        //4 Letters
        case 4:

            if(skinnyLetters.includes(word[0]) && skinnyLetters.includes(word[1])) {
                letters[alpha.indexOf(word[0])] = new Letter(window.innerWidth / 2 - threeUnit, window.innerHeight / 2 - twoAndHalfUnit, speedUnit * 2.3, speedUnit * 2.5, word[0], true);

                letters[alpha.indexOf(word[1])] = new Letter(window.innerWidth / 2 - twoUnit, window.innerHeight / 2 + twoAndHalfUnit, speedUnit * 1.6, -speedUnit * 1.5, word[1], true);
            }
            else if(skinnyLetters.includes(word[0])) {
                letters[alpha.indexOf(word[0])] = new Letter(window.innerWidth / 2 - threeUnit, window.innerHeight / 2 - twoAndHalfUnit, speedUnit * 2.0, speedUnit * 2.5, word[0], true);

                letters[alpha.indexOf(word[1])] = new Letter(window.innerWidth / 2 - twoUnit, window.innerHeight / 2 + twoAndHalfUnit, speedUnit * 1.3, -speedUnit * 1.5, word[1], true);
            }
            else if(skinnyLetters.includes(word[1])) {
                if(wideLetters.includes(word[0])) {
                    letters[alpha.indexOf(word[0])] = new Letter(window.innerWidth / 2 - threeUnit, window.innerHeight / 2 - twoAndHalfUnit, speedUnit * 1.8, speedUnit * 2.5, word[0], true);
                }
                else {
                    letters[alpha.indexOf(word[0])] = new Letter(window.innerWidth / 2 - threeUnit, window.innerHeight / 2 - twoAndHalfUnit, speedUnit * 2.0, speedUnit * 2.5, word[0], true);
                }
                
                letters[alpha.indexOf(word[1])] = new Letter(window.innerWidth / 2 - twoUnit, window.innerHeight / 2 + twoAndHalfUnit, speedUnit * 1.6, -speedUnit * 1.5, word[1], true);
            }
            else {

                if(wideLetters.includes(word[0])) {
                    letters[alpha.indexOf(word[0])] = new Letter(window.innerWidth / 2 - threeUnit, window.innerHeight / 2 - twoAndHalfUnit, speedUnit * 1.4, speedUnit * 2.5, word[0], true);
                }
                else {
                    letters[alpha.indexOf(word[0])] = new Letter(window.innerWidth / 2 - threeUnit, window.innerHeight / 2 - twoAndHalfUnit, speedUnit * 1.7, speedUnit * 2.5, word[0], true);
                }

                letters[alpha.indexOf(word[1])] = new Letter(window.innerWidth / 2 - twoUnit, window.innerHeight / 2 + twoAndHalfUnit, speedUnit * 1.3, -speedUnit * 1.5, word[1], true);
            }

            
            if(word[0] === word[2] || word[1] === word[2]) {
                letters.push(new Letter(window.innerWidth / 2 + threeUnit, window.innerHeight / 2 - twoAndHalfUnit, -speedUnit * 2.1, speedUnit * 2.5, word[2], true));
            }
            else {
                letters[alpha.indexOf(word[2])] = new Letter(window.innerWidth / 2 + threeUnit, window.innerHeight / 2 - twoAndHalfUnit, -speedUnit * 2.1, speedUnit * 2.5, word[2], true);
            }
            



            if(wideLetters.includes(word[2])) {
                if(word[3] === word[0] || word[3] === word[1] || word[3] === word[2]) {
                    letters.push(new Letter(window.innerWidth / 2 + threeUnit, window.innerHeight / 2 - twoAndHalfUnit, -speedUnit * 1.1, speedUnit * 2.5, word[3], true));
                }
                else {
                    letters[alpha.indexOf(word[3])] = new Letter(window.innerWidth / 2 + threeUnit, window.innerHeight / 2 - twoAndHalfUnit, -speedUnit * 1.1, speedUnit * 2.5, word[3], true);
                }
            }
            else if(skinnyLetters.includes(word[2])) {
                if(word[3] === word[0] || word[3] === word[1] || word[3] === word[2]) {
                    letters.push(new Letter(window.innerWidth / 2 + threeUnit, window.innerHeight / 2 - twoAndHalfUnit, -speedUnit * 1.9, speedUnit * 2.5, word[3], true));
                }
                else {
                    letters[alpha.indexOf(word[3])] = new Letter(window.innerWidth / 2 + threeUnit, window.innerHeight / 2 - twoAndHalfUnit, -speedUnit * 1.9, speedUnit * 2.5, word[3], true);
                }
                
            }
            else {
                if(word[3] === word[0] || word[3] === word[1] || word[3] === word[2]) {
                    letters.push(new Letter(window.innerWidth / 2 + threeUnit, window.innerHeight / 2 - twoAndHalfUnit, -speedUnit * 1.5, speedUnit * 2.5, word[3], true));
                }
                else {
                    letters[alpha.indexOf(word[3])] = new Letter(window.innerWidth / 2 + threeUnit, window.innerHeight / 2 - twoAndHalfUnit, -speedUnit * 1.5, speedUnit * 2.5, word[3], true);
                }
            }
            

            break;
    
        //5 Letters
        case 5:

            //first letter
            if(wideLetters.includes(word[1])) {
                if(wideLetters.includes(word[0])) {
                    letters[alpha.indexOf(word[0])] = new Letter(window.innerWidth / 2 - twoUnit, window.innerHeight / 2 + twoAndHalfUnit, speedUnit * 0.55, -speedUnit * 1.5, word[0], true);
                }
                else if(skinnyLetters.includes(word[0])) {
                    letters[alpha.indexOf(word[0])] = new Letter(window.innerWidth / 2 - twoUnit, window.innerHeight / 2 + twoAndHalfUnit, speedUnit * 0.85, -speedUnit * 1.5, word[0], true);
                }
                else {
                    letters[alpha.indexOf(word[0])] = new Letter(window.innerWidth / 2 - twoUnit, window.innerHeight / 2 + twoAndHalfUnit, speedUnit * 0.55, -speedUnit * 1.5, word[0], true);
                }
            }
            else if (skinnyLetters.includes(word[1])) {
                if(wideLetters.includes(word[0])) {
                    letters[alpha.indexOf(word[0])] = new Letter(window.innerWidth / 2 - twoUnit, window.innerHeight / 2 + twoAndHalfUnit, speedUnit * 0.85, -speedUnit * 1.5, word[0], true);
                }
                else if(skinnyLetters.includes(word[0])) {
                    letters[alpha.indexOf(word[0])] = new Letter(window.innerWidth / 2 - twoUnit, window.innerHeight / 2 + twoAndHalfUnit, speedUnit * 1.4, -speedUnit * 1.5, word[0], true);
                }
                else {
                    letters[alpha.indexOf(word[0])] = new Letter(window.innerWidth / 2 - twoUnit, window.innerHeight / 2 + twoAndHalfUnit, speedUnit * 1.1, -speedUnit * 1.5, word[0], true);
                }
            }
            else {
                if(wideLetters.includes(word[0])) {
                    letters[alpha.indexOf(word[0])] = new Letter(window.innerWidth / 2 - twoUnit, window.innerHeight / 2 + twoAndHalfUnit, speedUnit * 0.5, -speedUnit * 1.5, word[0], true);
                }
                else if(skinnyLetters.includes(word[0])) {
                    letters[alpha.indexOf(word[0])] = new Letter(window.innerWidth / 2 - twoUnit, window.innerHeight / 2 + twoAndHalfUnit, speedUnit * 1.1, -speedUnit * 1.5, word[0], true);
                }
                else {
                    letters[alpha.indexOf(word[0])] = new Letter(window.innerWidth / 2 - twoUnit, window.innerHeight / 2 + twoAndHalfUnit, speedUnit * 0.8, -speedUnit * 1.5, word[0], true);
                }
            }


            //second letter
            if(word[1] === word[0]) {
                if(wideLetters.includes(word[1])) {
                    letters.push( new Letter(window.innerWidth / 2 + oneUnit, window.innerHeight / 2 - oneAndHalfUnit, -speedUnit * 1.2, speedUnit * 1.5, word[1], true));
                }
                else if(skinnyLetters.includes(word[1])) {
                    letters.push( new Letter(window.innerWidth / 2 + oneUnit, window.innerHeight / 2 - oneAndHalfUnit, -speedUnit * 0.6, speedUnit * 1.5, word[1], true));
                }
                else {
                    letters.push( new Letter(window.innerWidth / 2 + oneUnit, window.innerHeight / 2 - oneAndHalfUnit, -speedUnit * 0.95, speedUnit * 1.5, word[1], true));
                }
            }
            else {
                if(wideLetters.includes(word[1])) {
                    letters[alpha.indexOf(word[1])] = new Letter(window.innerWidth / 2 + oneUnit, window.innerHeight / 2 - oneAndHalfUnit, -speedUnit * 1.2, speedUnit * 1.5, word[1], true);
                }
                else if(skinnyLetters.includes(word[1])) {
                    letters[alpha.indexOf(word[1])] = new Letter(window.innerWidth / 2 + oneUnit, window.innerHeight / 2 - oneAndHalfUnit, -speedUnit * 0.6, speedUnit * 1.5, word[1], true);
                }
                else {
                    letters[alpha.indexOf(word[1])] = new Letter(window.innerWidth / 2 + oneUnit, window.innerHeight / 2 - oneAndHalfUnit, -speedUnit * 0.95, speedUnit * 1.5, word[1], true);
                }
            }

            //middle
            if(word[2] === word[1] || word[2] === word[0]) {
                letters.push(new Letter(window.innerWidth / 2 + twoUnit, window.innerHeight / 2 - twoAndHalfUnit, -speedUnit * 1.8, speedUnit * 3.5, word[2], true));
            }
            else {
                letters[alpha.indexOf(word[2])] = new Letter(window.innerWidth / 2 + twoUnit, window.innerHeight / 2 - twoAndHalfUnit, -speedUnit * 1.8, speedUnit * 3.5, word[2], true);

            }

            //2nd to last
            if(word[3] === word[2] || word[3] === word[1] || word[3] === word[0]) {
                if(wideLetters.includes(word[2])) {
                    letters.push(new Letter(window.innerWidth / 2 - oneUnit, window.innerHeight / 2 + twoAndHalfUnit, speedUnit * 3.2, -speedUnit * 3.2, word[3], true));
                }
                else if(skinnyLetters.includes(word[2])) {
                    letters.push(new Letter(window.innerWidth / 2 - oneUnit, window.innerHeight / 2 + twoAndHalfUnit, speedUnit * 2.3, -speedUnit * 2.3, word[3], true));
                }
                else {
                    letters.push(new Letter(window.innerWidth / 2 - oneUnit, window.innerHeight / 2 + twoAndHalfUnit, speedUnit * 3.2, -speedUnit * 2.7, word[3], true));
                }
            }
            else {
                if(wideLetters.includes(word[2])) {
                    letters[alpha.indexOf(word[3])] = new Letter(window.innerWidth / 2 - oneUnit, window.innerHeight / 2 + twoAndHalfUnit, speedUnit * 3.2, -speedUnit * 2.5, word[3], true);
                }
                else if(skinnyLetters.includes(word[2])) {
                    letters[alpha.indexOf(word[3])] = new Letter(window.innerWidth / 2 - oneUnit, window.innerHeight / 2 + twoAndHalfUnit, speedUnit * 2.3, -speedUnit * 2.5, word[3], true);
                }
                else {
                    letters[alpha.indexOf(word[3])] = new Letter(window.innerWidth / 2 - oneUnit, window.innerHeight / 2 + twoAndHalfUnit, speedUnit * 2.7, -speedUnit * 2.5, word[3], true);
                }
            }

            //last letter
            if(word[4] === word[3] || word[4] === word[2] || word[4] === word[1] || word[4] === word[0]) {

                if(wideLetters.includes(word[2])) {
                    if(wideLetters.includes(word[3])) {
                        letters.push( new Letter(window.innerWidth / 2 + threeAndHalfUnit, window.innerHeight / 2 + twoAndHalfUnit, -speedUnit * 1.2, -speedUnit * 2.5, word[4], true));
                    }
                    else if (skinnyLetters.includes(word[3])) {
                        letters.push( new Letter(window.innerWidth / 2 + threeAndHalfUnit, window.innerHeight / 2 + twoAndHalfUnit, -speedUnit * 2.0, -speedUnit * 2.5, word[4], true));
                    }
                    else {
                        letters.push( new Letter(window.innerWidth / 2 + threeAndHalfUnit, window.innerHeight / 2 + twoAndHalfUnit, -speedUnit * 1.5, -speedUnit * 2.5, word[4], true));
                    }
                }
                else if(skinnyLetters.includes(word[2])) {
                    if(wideLetters.includes(word[3])) {
                        letters.push( new Letter(window.innerWidth / 2 + threeAndHalfUnit, window.innerHeight / 2 + twoAndHalfUnit, -speedUnit * 1.9, -speedUnit * 2.5, word[4], true));
                    }
                    else if (skinnyLetters.includes(word[3])) {
                        letters.push( new Letter(window.innerWidth / 2 + threeAndHalfUnit, window.innerHeight / 2 + twoAndHalfUnit, -speedUnit * 2.8, -speedUnit * 2.5, word[4], true));
                    }
                    else {
                        letters.push( new Letter(window.innerWidth / 2 + threeAndHalfUnit, window.innerHeight / 2 + twoAndHalfUnit, -speedUnit * 2.3, -speedUnit * 2.5, word[4], true));
                    }
                }
                else {
                    if(wideLetters.includes(word[3])) {
                        letters.push( new Letter(window.innerWidth / 2 + threeAndHalfUnit, window.innerHeight / 2 + twoAndHalfUnit, -speedUnit * 1.6, -speedUnit * 2.5, word[4], true));
                    }
                    else if (skinnyLetters.includes(word[3])) {
                        letters.push( new Letter(window.innerWidth / 2 + threeAndHalfUnit, window.innerHeight / 2 + twoAndHalfUnit, -speedUnit * 2.5, -speedUnit * 2.5, word[4], true));
                    }
                    else {
                        letters.push( new Letter(window.innerWidth / 2 + threeAndHalfUnit, window.innerHeight / 2 + twoAndHalfUnit, -speedUnit * 2.0, -speedUnit * 2.5, word[4], true));
                    }
                }

            }
            else {

                if(wideLetters.includes(word[2])) {
                    if(wideLetters.includes(word[3])) {
                        letters[alpha.indexOf(word[4])] = new Letter(window.innerWidth / 2 + threeAndHalfUnit, window.innerHeight / 2 + twoAndHalfUnit, -speedUnit * 1.2, -speedUnit * 2.5, word[4], true);
                    }
                    else if (skinnyLetters.includes(word[3])) {
                        letters[alpha.indexOf(word[4])] = new Letter(window.innerWidth / 2 + threeAndHalfUnit, window.innerHeight / 2 + twoAndHalfUnit, -speedUnit * 2.0, -speedUnit * 2.5, word[4], true);
                    }
                    else {
                        letters[alpha.indexOf(word[4])] = new Letter(window.innerWidth / 2 + threeAndHalfUnit, window.innerHeight / 2 + twoAndHalfUnit, -speedUnit * 1.5, -speedUnit * 2.5, word[4], true);
                    }
                }
                else if(skinnyLetters.includes(word[2])) {
                    if(wideLetters.includes(word[3])) {
                        letters[alpha.indexOf(word[4])] = new Letter(window.innerWidth / 2 + threeAndHalfUnit, window.innerHeight / 2 + twoAndHalfUnit, -speedUnit * 1.9, -speedUnit * 2.5, word[4], true);
                    }
                    else if (skinnyLetters.includes(word[3])) {
                        letters[alpha.indexOf(word[4])] = new Letter(window.innerWidth / 2 + threeAndHalfUnit, window.innerHeight / 2 + twoAndHalfUnit, -speedUnit * 2.8, -speedUnit * 2.5, word[4], true);
                    }
                    else {
                        letters[alpha.indexOf(word[4])] = new Letter(window.innerWidth / 2 + threeAndHalfUnit, window.innerHeight / 2 + twoAndHalfUnit, -speedUnit * 2.3, -speedUnit * 2.5, word[4], true);
                    }
                }
                else {
                    if(wideLetters.includes(word[3])) {
                        letters[alpha.indexOf(word[4])] = new Letter(window.innerWidth / 2 + threeAndHalfUnit, window.innerHeight / 2 + twoAndHalfUnit, -speedUnit * 1.6, -speedUnit * 2.5, word[4], true);
                    }
                    else if (skinnyLetters.includes(word[3])) {
                        letters[alpha.indexOf(word[4])] = new Letter(window.innerWidth / 2 + threeAndHalfUnit, window.innerHeight / 2 + twoAndHalfUnit, -speedUnit * 2.5, -speedUnit * 2.5, word[4], true);
                    }
                    else {
                        letters[alpha.indexOf(word[4])] = new Letter(window.innerWidth / 2 + threeAndHalfUnit, window.innerHeight / 2 + twoAndHalfUnit, -speedUnit * 2.0, -speedUnit * 2.5, word[4], true);
                    }
                }

                
            }

            break;
    }
}

//doWord("hello");

var currentWordIdx = 0;

function nextWord(list) {
    doWord(list[currentWordIdx]);
    currentWordIdx++;
}

buttons.push(new Button(200, 200, 100, "B"));

draw = function() {
    
    nextWord(wordsA);

    if(debug) {
        line(0, window.innerHeight / 2, window.innerWidth, window.innerHeight / 2);
        line(window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);
    }


    if(screen === "LETTERS") {
        background(200);
        for(var i = 0; i < letters.length; i++) {
            if(doMovement || letters[i].active) {
                letters[i].draw();
            }
            if(doMovement && letters[i].active && abs(letters[i].y - window.innerHeight / 2 - (letterSize / 2)) > 0.2) {
                letters[i].move();
            }

            if(doMovement && !letters[i].active) {
                letters[i].move();
            }
            
        }
        timer();
    }
    else {
        background(150);

        buttons[0].draw();
        buttons[0].over();

    }
    


}