var Card = function (x, y, z, src) {
    this.size = null;
    this.value = x;
    this.suit = y;
    this.src = src;
    this.name = y ? (x + ' of ' + y) : x;
    this.css = y ? (z + y + x) : z + x;
};
Card.prototype.setSize = function (a, b, c, d) {
    this.size = [a, b, c, d];
};
/*
when using pseudo constructors for prototypal inheritance, 
it's best to initialize the object no funcional members 
in the constructor and define the functional members as 
members of the prototype of the constructor, this way 
only one function object is created and shared accross all 
the instances, instead of creating a copy of the function 
objects for each functional member for each instance.
True, avoiding this might have performance boost because 
the prototype chain is never been searched, all the 
functions are just right there, but you have to ask 
your self: what happens more often in my program? object 
instanciation? or, method calls? and then optimize for that.
*/