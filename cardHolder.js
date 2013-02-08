var cardHolders = function()
{
	var child = [];
	var size = 0;
	function verifyCollition(top,left,right,down,h)
	{
		var a = (down > h.top) && (down < h.down),b = (right > h.left) && (right < h.right),c = (left < h.right) && (left > h.left),d = (top > h.top) && (top < h.down);
		if(a && b) return 1;
		if(a && c) return 2;
		if(d && b) return 3;
		if(d && c) return 4;
		return 0;
	}
	this.checkColliders = function(cardContainer,top,left,width,height)
	{
		var right = left + width,down = top + height,index = 0,res,x;//verify if it's already on a child
		while(index < size){
			x = child[index];
			res = verifyCollition(top,left,right,down,x);
			if(res) break;
			index++;
		}
		res = x.child.indexOf(cardContainer);
		if(res != -1){
			x = x.childXY[res];
			cardContainer.style.left = x.left;
			cardContainer.style.top = x.top;
			return false;
		}
		if(index == size){
			return false;
		}
		x.add(cardContainer);
		return x;
	}
	this.create = function(top,left,width,height,from,to,expand,arrange)
	{
		var res = {},addFn = 'var card = arguments[0];card.top = this.top;card.left = this.left;this.child.push(card);',
		subtractFn = '';
		res.size = 0;
		res.baseIndex = 0;
		res.top = top;
		res.left = left;
		res.down = top + height;
		res.right = width + left;
		res.child = [];
		res.childXY = [];
		switch(from){
			case 'left':
				addFn += 'card.style.left = this.left;this.childXY.push({left:this.left,top:this.top});card.style.top = this.top;'
				break;
		}
		switch(to){
			case 'left':
				res.baseIndex = 100;
				res.toLimit = res.left;
				addFn += 'card.style.zIndex = this.baseIndex;this.left -= '+expand+';this.baseIndex--;';
				break;
			case 'right':
				res.toLimit = res.right;
				addFn += 'card.style.zIndex = this.baseIndex;this.left += '+expand+';this.baseIndex++;';
		}
		res.add = new Function(addFn);
		child.push(res);
		size++;
	}
}