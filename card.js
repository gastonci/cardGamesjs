var Card = function(x,y,z,src){this.setSize = function(a,b,c,d){this.size = [a,b,c,d];},this.size = null,this.value = x,this.suit = y,this.src = src,this.name = y?(x+' of '+y):x,this.css = y?(z+y+x):z+x;}