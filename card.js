var Card = function (value, suit, css, src) {
    this.size = null;
    this.value = value;
    this.suit = suit;
    this.src = src;
    this.name = suit ? (value + ' of ' + suit) : value;
    this.css = suit ? (css + suit + value) : css + value;
};
Card.prototype.setSize = function (a, b, c, d) {
    this.size = [a, b, c, d];
};