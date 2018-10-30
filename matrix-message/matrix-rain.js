/*  -------------------------------------------------------------
    Matrix rain
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Maintainer:     Sébastien Santoro aka Dereckson
    Tags:           black green matrix cyberpunk
    Filename:       matrix-rain.js
    Created:        2015-10-29
    -------------------------------------------------------------    */

/*  -------------------------------------------------------------
    Matrix rain class

    Author:         Collin Henderson
    Created:        2011-05-09
    Source:         https://github.com/syropian/HTML5-Matrix-Code-Rain

    Draw Matrix rain effect in a canvas
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    */

class MatrixRain {

    constructor(elementId) {
        this.canvas = document.getElementById(elementId);
        this.context = this.canvas.getContext('2d');
        this.context.globalCompositeOperation = 'lighter';

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this._stripCount = 120;
        this._frameDelay = 70; // ms
        this._stripX = [];
        this._stripY = [];
        this._dY = [];
        this._stripFontSize = [];
        this._textStrip = ['诶', '比', '西', '迪', '伊', '吉', '艾', '杰', '开', '哦', '屁', '提', '维'];
        this._colors = ['#cefbe4', '#81ec72', '#5cd646', '#54d13c', '#4ccc32', '#43c728'];
    }

    start() {
        this.initializeStrip();
        this.draw(this);
    }

    initializeStrip() {
        for (let i = 0; i < this._stripCount; i++) {
            this.seedStrip(i);
        }

        this.context.shadowBlur = 8;
        this.context.shadowColor = '#94f475';
        this.context.textBaseline = 'top';
        this.context.textAlign = 'center';
    }

    seedStrip(i) {
        this._stripX[i] = Math.floor(Math.random() * this.canvas.width);
        this._stripY[i] = -100;
        this._dY[i] = Math.floor(Math.random() * 7) + 3;
        this._stripFontSize[i] = Math.floor(Math.random() * 16) + 8;
    }

    draw() {
        this.clearCanvas();

        for (let i = 0; i < this._stripCount; i++) {
            this.context.font = this._stripFontSize[i] + 'px MatrixCode';

            if (this._stripY[i] > this.canvas.height + 320) {
                this.seedStrip(i);
            }
            this.drawStrip(this._stripX[i], this._stripY[i]);

            this._stripY[i] += this._dY[i];
        }

        this.redraw();
    }

    redraw() {
        let that = this;
        setTimeout(function() {
            that.draw()
        }, this._frameDelay);
    }

    drawStrip(x, y) {
        for (let i = 0; i <= 20; i++) {
            const character = this.getRandomCharacter();

            if (this.context.fillText) {
                this.updateFillStyle(i);
            }

            this.context.fillText(character, x, y);

            y -= this._stripFontSize[i];
        }
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.shadowOffsetX = this.context.shadowOffsetY = 0;
    }

    getRandomCharacter() {
        return this._textStrip[Math.floor(Math.random() * this._textStrip.length)];
    }

    updateFillStyle(characterPosition) {
        const breakpoints = [0, 1, 3, 7, 13, 17];

        for (let i = 0 ; i < 6 ; i++) {
            if (characterPosition === breakpoints[i]) {
                this.context.fillStyle = this._colors[i];
                break;
            }
        }
    }
}

/*  -------------------------------------------------------------
    Matrix storm class

    Author:         Ebram Marzouk
    Source:         https://codepen.io/P3R0/pen/MwgoKv

    Draw Matrix rain animation in a canvas

    Used in browser lagging with the Collin code, like Firefox
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    */

class MatrixStorm {
    constructor(elementId) {
        this._canvas = document.getElementById(elementId);
        this._context = this._canvas.getContext('2d');

        this._canvas.height = window.innerHeight;
        this._canvas.width = window.innerWidth;

        this._characters = ['田', '由', '甲', '申', '甴', '电', '甶', '男', '甸', '甹', '町', '画', '甼', '甽', '甾', '甿', '畀', '畁', '畂', '畃', '畄', '畅', '畆', '畇', '畈', '畉', '畊', '畋', '界', '畍', '畎', '畏', '畐', '畑'];
        this._font_size = 18;
        this._columns = Math.floor(this._canvas.width / this._font_size);
        this._drops = new Array(this._columns).fill(1);

        this._frameDelay = 33;
    }

    start() {
        this.draw();
    }

    draw() {
        this.repaint();

        this._context.fillStyle = "#0F0"; //green text
        this._context.font = this._font_size + "px arial";

        for(let i = 0; i < this._drops.length; i++) {
            this.drawDrop(i)
        }

        this.redraw();
    }

    repaint() {
        this._context.fillStyle = "rgba(0, 0, 0, 0.05)";
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
    }

    drawDrop(i) {
        const text = this.getRandomCharacter();
        this._context.fillText(text, i * this._font_size, this._drops[i] * this._font_size);

        this.moveDrop(i);
    }

    moveDrop(i) {
        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the _drops scattered on the Y axis
        if(this.isSetToBeSentBackToTheTop(this._drops[i])) {
            this._drops[i] = 0;
        } else {
            this._drops[i]++;
        }
    }

    isSetToBeSentBackToTheTop(drop) {
        return drop * this._font_size > this._canvas.height && Math.random() > 0.975
    }

    redraw() {
        let that = this;
        setTimeout(function() {
            that.draw()
        }, this._frameDelay);
    }

    getRandomCharacter() {
        return this._characters[Math.floor(Math.random() * this._characters.length)]
    }
}

/*  -------------------------------------------------------------
    Load version
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    */

class MatrixRainLoader {
    constructor(element) {
        this.element = element;
    }

    load() {
        if (MatrixRainLoader.isChrome() || MatrixRainLoader.isEdge() ) {
            this.loadMatrixRain();
        } else {
            this.loadMatrixStorm();
        }
    }

    loadMatrixRain() {
        let animation = new MatrixRain(this.element);
        animation.start();
    }

    loadMatrixStorm() {
        let animation = new MatrixStorm(this.element);
        animation.start();
    }

    static isChrome() {
        // noinspection JSUnresolvedVariable
        return typeof chrome !== 'undefined';
    }

    static isEdge() {
        return navigator.appVersion.indexOf("Edge") !== -1;
    }
}

let loader = new MatrixRainLoader("background");
loader.load();
