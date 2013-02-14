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
/*
be generous with the identifiers, and remember you don't 
have implicit scope (unless you use with to extend the 
scope chain) so if you want to access the "value" member 
of the "this" object you have to explicitly describe it 
by "this.value"
*/