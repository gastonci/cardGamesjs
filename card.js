var Card = function (x, y, z, src) {
    this.setSize = function (a, b, c, d) {
        this.size = [a, b, c, d];
    };
    this.size = null;
    this.value = x;
    this.suit = y;
    this.src = src;
    this.name = y ? (x + ' of ' + y) : x;
    this.css = y ? (z + y + x) : z + x;
    /*
    the comma operator is not recommended to separate statements
    (it was not designed for that; http://javascriptweblog.wordpress.com/2011/04/04/the-javascript-comma-operator/),
    besides it makes programs really difficult to read, even using a beautifier, use semicolon
    */
}