function setup() {
    createCanvas(displayWidth, displayHeight);
    textSize(70);

    startTime = millis();
}

var deltaT = 9150;

var debug = 0;

var letters = [];

var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

var letterSize = 55;

var oneUnit = letterSize;
var twoUnit = letterSize * 2;

var oneAndHalfUnit = Math.floor(letterSize * 1.5);
var twoAndHalfUnit = Math.floor(letterSize * 2.5);
var threeAndHalfUnit = Math.floor(letterSize * 3.5);


var doMovement = true;


//TIMER FUNCTION
function timer() {
    if(millis() > startTime + deltaT) {
        doMovement = false;
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
for(var i = 0; i < 26; i++) {
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

//WORDS
var wordThe = function() {
    //t
    letters[19] = new Letter(window.innerWidth / 2 - twoAndHalfUnit, window.innerHeight / 2 - oneAndHalfUnit, 0.1, 0.2, "T", true);
    //h
    letters[7] = new Letter(window.innerWidth / 2 - oneAndHalfUnit, window.innerHeight / 2 + oneAndHalfUnit, 0.1, -0.1, "H", true);
    //e
    letters[4] = new Letter(window.innerWidth / 2 + threeAndHalfUnit, window.innerHeight / 2 + threeAndHalfUnit, -0.3, -0.3, "E", true);
}





//randomize the word
wordThe();


var draw = function() {
    background(200);

    if(debug) {
        line(0, window.innerHeight / 2, window.innerWidth, window.innerHeight / 2);
        line(window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);
    }
    

    for(var i = 0; i < letters.length; i++) {
        if(doMovement || letters[i].active) {
            letters[i].draw();
        }

        if(doMovement) {
            letters[i].move();
        }
        
    }
    timer();


}