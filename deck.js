/*
Beautify your code, optimize it for reading and comprehension
http://jsbeautifier.org/
then use a minifier if you want to optimize it for downloading
http://fmarcia.info/jsmin/test.html
*/
var _cardDEBUGGERlevel = 0;

function _cardDEBUGGER(x, y) {
    if (_cardDEBUGGERlevel >= y) {
        console.log(x);
    }
}
var PLAYINGDECK = {
    type: 'playing_cards',
    image: {
        src: 'img/poker.png',
        width: 325,
        height: 500
    },
    quantity: [13, 0, 4],
    card: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'j', 'q', 'k'],
    joker: [],
    suit: ['club', 'diamon', 'heart', 'spades']
}
var SPANISHDECK = {
    type: 'spanish_cards',
    image: {
        src: 'img/spanish.png',
        width: 325,
        height: 500
    },
    quantity: [12, 0, 4],
    card: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    joker: [],
    suit: ['swords', 'wands', 'coin', 'cups']
}
var SPANISHDECK_testa = {
    type: 'spanish_cards',
    image: {
        src: 'img/spanishcars_test.png',
        width: 105.3,
        height: 164,
        twidth: 1369
    },
    quantity: [12, 3, 4],
    card: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    joker: ['black_joker', 'red_joker', 'no_joker'],
    suit: ['swords', 'wands', 'coin', 'cups']
}
var Deck = function () {
    this.type, this.quantity,
    this.image = {
        src: null,
        width: null,
        height: null
    },
    this.display = null;
    if (document.styleSheets) {
        var style = document.createElement('style');
        style.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(style);
        /*if(style.styleSheet){style.styleSheet.cssText = 'cardGame{}';}
		else{style.appendChild(document.createTextNode('cardGame{}'));}*/
    }
    cssClass = document.styleSheets[0],
    cssRules = cssClass.cssRules ? cssClass.cssRules : cssClass.rules,
    cssIndex = null
    this.cards = new Array();
    //this.card = function(x,y){this.value = x,this.suit = y,this.name = x+' of '+y;}
    function setQuantity(x) {
        var quantity = x[2] ? x[0] * x[2] : x[0];
        quantity += x[1];
        return quantity;
    }

    function check(x) {
        if (typeof x.valueOf == 'number') {
            return setQuantity(x, y);
        } else {
            if (!x.src) {
                console.debug('deck() - imagen.src is null');
            } else if (x.width) {
                console.debug('deck() - imagen.width is null');
            } else if (x.height) {
                console.debug('deck() - imagen.height is null');
            }
            return y;
        }
    }

    function addRule(name, rule, position) {
        if (!rule) {
            rule = 'display:inline;';
        }
        if (cssClass.insertRule) {
            cssClass.insertRule(name + '{' + rule + '}', position);
        } else {
            cssClass.addRule(name, rule, position);
        }
    }

    function addCss(x) {
        cssIndex = 0;
        var cardContainerCSS = '.cardContainer{border:solid black 1px;display:block; float:left; position:absolute; overflow:hidden; margin-right:5%;}';
        if (!cssRules[0] || (cssRules[0].selectorText != cardContainerCSS)) {
            addRule('.cardContainer', 'border:solid black 1px; position:absolute; overflow:hidden;', 0)
        }
        while (cssIndex < cssRules.length) {
            if (cssRules[cssIndex].selectorText == x) {
                return false;
            }
            cssIndex++;
        }
        addRule(x, '', 1);
        return true;
    }
    var arg = arguments[0];
    if (arg) {
        if (arg.type) {
            var isCssIn = addCss(arg.type);
            _cardDEBUGGER('defatul deck', 1);
            this.type = arg.type;
            _cardDEBUGGER('deck\'s type = ' + this.type, 1);
            this.quantity = setQuantity(arg.quantity);
            _cardDEBUGGER('card\'s quantity = ' + this.quantity, 2);
            this.image = arg.image;
            _cardDEBUGGER('img.src = ' + this.image.src, 3);
            var x = 0,
                y = 0,
                z = 0;
            this.display = {
                width: arg.image.twidth ? arg.image.twidth : arg.image.width * arg.quantity[0],
                height: arg.image.theight ? arg.image.theight : arg.image.height * (arg.quantity[2] + (arg.quantity[1] ? 1 : 0))
            }
            while (y < arg.quantity[2]) {
                while (x < arg.quantity[0]) {
                    _cardDEBUGGER('///////////////////////', 4);
                    _cardDEBUGGER('arg.card[' + x + '] = ' + arg.card[x], 4);
                    _cardDEBUGGER('arg.suit[' + y + '] = ' + arg.suit[y], 4);
                    this.cards.push(new Card(arg.card[x], arg.suit[y], this.type, arg.image.src));
                    if (isCssIn) {
                        addRule('.' + this.cards[z].css, 'position:absolute; top:-' + y + '00%; left:-' + x + '00%; max-width:none;', cssRules.length);
                        this.cards[z].setSize(arg.image.width, arg.image.height, this.display.width, this.display.height);
                    }
                    _cardDEBUGGER('index = ' + z, 5);
                    _cardDEBUGGER('card[' + z + '] = ' + this.cards[z].name, 4);
                    x++;
                    z++;
                }
                y++;
                x = 0;
            }
            _cardDEBUGGER('///////////////////////', 4);
            _cardDEBUGGER('ADDING Jokers', 4);
            while (x < arg.quantity[1]) {
                this.cards.push(new Card(arg.joker[x], null, this.type, arg.image.src));
                if (isCssIn) {
                    addRule('.' + this.cards[z].css, 'position:absolute; top:-' + y + '00%; left:-' + x + '00%; max-width:none;', cssRules.length);
                    this.cards[z].setSize(arg.image.width, arg.image.height, this.display.width, this.display.height);
                }
                _cardDEBUGGER('index = ' + z, 5);
                _cardDEBUGGER('card[' + z + '] = ' + this.cards[z].name, 4);
                x++;
                z++;
            }
            _cardDEBUGGER('///////////////////////', 4);
            _cardDEBUGGER(cssRules, 4);
        } else if (typeof arg.valueOf == 'string') {
            type = arg;
            if (arguments[1]) {
                check(arguments[1], this.quantity);
                if (arguments[2]) {
                    check(arguments[2], this.quantity);
                }
            }
        } else {
            console.debug('deck() - argumento invalido: ' + arg);
        }
    } else {
        _cardDEBUGGER('new Deck() - no parameters', 1);
    }
    return this;
}