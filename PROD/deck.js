var PLAYINGDECK={type:'playing_cards',image:{src:'img/poker.png',width:325,height:500},quantity:[13,0,4],card:[1,2,3,4,5,6,7,8,9,10,'j','q','k'],joker:[],suit:['club','diamon','heart','spades']}
var SPANISHDECK={type:'spanish_cards',image:{src:'img/spanish.png',width:325,height:500},quantity:[12,0,4],card:[1,2,3,4,5,6,7,8,9,10,11,12],joker:[],suit:['swords','wands','coin','cups']}
var SPANISHDECK_testa={type:'spanish_cards',image:{src:'img/spanishcars_test.png',width:105.3,height:164,twidth:1369},quantity:[12,3,4],card:[1,2,3,4,5,6,7,8,9,10,11,12],joker:['black_joker','red_joker','no_joker'],suit:['swords','wands','coin','cups']}
var Deck=function()
{this.type,this.quantity,this.image={src:null,width:null,height:null},this.display=null;if(document.styleSheets){var a=document.createElement('style');a.type='text/css';document.getElementsByTagName('head')[0].appendChild(a);}
b=document.styleSheets[0],c=b.cssRules?b.cssRules:b.rules,d=null
this.cards=new Array();function e(x){var y=x[2]?x[0]*x[2]:x[0];y+=x[1];return y;}
function f(x,y){if(typeof x.valueOf=='number'){return e(x,y);}
else{if(!x.src){console.debug('deck() - imagen.src is null');}
else if(x.width){console.debug('deck() - imagen.width is null');}
else if(x.height){console.debug('deck() - imagen.height is null');}
return y;}}
function g(x,y,z){if(!y){y='display:inline;';}
if(b.insertRule){b.insertRule(x+'{'+y+'}',z);}
else{b.g(x,y,z);}}
function h(x){d=0;var cardContainerCSS='.cardContainer{border:solid black 1px;display:block; float:left; position:absolute; overflow:hidden; margin-right:5%;}';if(!c[0]||(c[0].selectorText!=cardContainerCSS)){g('.cardContainer','border:solid black 1px; position:absolute; overflow:hidden;',0)}
while(d<c.length){if(c[d].selectorText==x){return false;}
d++;}
g(x,'',1);return true;}
var i=arguments[0];if(i){if(i.type){var j=h(i.type);this.type=i.type;this.quantity=e(i.quantity);this.image=i.image;var x=0,y=0,z=0;this.display={width:i.image.twidth?i.image.twidth:i.image.width*i.quantity[0],height:i.image.theight?i.image.theight:i.image.height*(i.quantity[2]+(i.quantity[1]?1:0))}
while(y<i.quantity[2]){while(x<i.quantity[0]){this.cards.push(new Card(i.card[x],i.suit[y],this.type,i.image.src));if(j){g('.'+this.cards[z].css,'position:absolute; top:-'+y+'00%; left:-'+x+'00%; max-width:none;',c.length);this.cards[z].setSize(i.image.width,i.image.height,this.display.width,this.display.height);}
x++;z++;}
y++;x=0;}
while(x<i.quantity[1]){this.cards.push(new Card(i.joker[x],null,this.type,i.image.src));if(j){g('.'+this.cards[z].css,'position:absolute; top:-'+y+'00%; left:-'+x+'00%; max-width:none;',c.length);this.cards[z].setSize(i.image.width,i.image.height,this.display.width,this.display.height);}
x++;z++;}}
else if(typeof i.valueOf=='string')
{this.type=i;if(arguments[1]){f(arguments[1],this.quantity);if(arguments[2]){f(arguments[2],this.quantity);}}}
else{console.debug('deck() - argumento invalido: '+i);}}
return this;}