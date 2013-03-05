var _pileDEBUGGERlevel = 0;
function _pileDEBUGGER(x,y){if(_pileDEBUGGERlevel >= y){console.log(x);}}

var Pile = function()
{
	_pileDEBUGGER('new Pile()',2),
	this.deck = [],
	this.cards = [],
	this.quantity = 0,
	this.decks = 0,
	this.current_card = null,
	arg = arguments[this.decks]
	while(arg && arg.cards){
		_pileDEBUGGER('///////////////',4);
		_pileDEBUGGER('input deck:'+arg,1);
		var x = 0;
		this.deck.push(arg);
		while(x < arg.quantity)
		{
			_pileDEBUGGER('local.cards['+this.quantity+'] = input.deck['+this.decks+'].cards['+x+']',5);
			this.cards.push(arg.cards[x]);
			_pileDEBUGGER('added local card: '+this.cards[this.quantity].name,3);
			x++;
			this.quantity++;
		}
		this.decks++;
		arg = arguments[this.decks];
		_pileDEBUGGER('----Pile builded----',2);
	}
	function shuffle()
	{
		_pileDEBUGGER('pile.shuffle()',2);
		var x = this.quantity;
		_pileDEBUGGER('shuffle.x = '+x,4);
		while(x)
		{
			var y = Math.floor(Math.random()*x);
			var z = this.cards[--x];
			this.cards[x] = this.cards[y];
			this.cards[y] = z;
			_pileDEBUGGER('cards['+x+'] = '+this.cards[x].name,5);
		}
		_pileDEBUGGER('----Pile shuffled----',3);
	}
	function quicksort(src,attr,len)
	{
		if(len <= 1) return src;
		else{
			var y = src.pop(),x = [],z = [],index = 0,less = 0,more = 0,item = src[0],pivon = y[attr];
			len--;
		}
		while(index < len)
		{
			if(item[attr] > pivon){z.push(item);more++;}
			else{x.push(item);less++;}
			index++;
			item = src[index];
		}
		if(more = 0){return src;}
		return quicksort(x,attr,less).concat(y,quicksort(z,attr,more));
	}
	this.shuffle = shuffle;
	this.sort = function(){this.cards = quicksort(this.cards,'value',this.quantity);}
	this.asort = function(){this.cards = quicksort(this.cards,'name',this.quantity);}
	this.show_cards = function(){console.log(this.cards);}
	this.getCard = function(x)
	{
		_pileDEBUGGER('pile.getCard('+x+')',2);
		if((x < 0) || (x >= this.quantity)){return null;}
		_pileDEBUGGER('output card:'+this.cards[x].name,3);
		return this.cards[x];
	}
	this.draw = function()
	{
		if(!this.quantity){return null;}
		_pileDEBUGGER('pile.draw()',2);
		this.quantity--;
		var res = this.cards[this.quantity];
		_pileDEBUGGER('output card: '+res,3);
		this.cards.pop();
		_pileDEBUGGER('now the pile has '+this.quantity+' cards left',4);
		return res;
	}
	this.drawFromBottom = function()
	{
		_pileDEBUGGER('pile.drawFromBottom()',2);
		var res = this.cards[0];
		_pileDEBUGGER('output card: '+res,3);
		this.cards.shift();
		this.quantity--;
		_pileDEBUGGER('now the pile has '+this.quantity+' cards left',4);
		return res;
	}
	this.invert = this.cards.reverse();
	return this;
}