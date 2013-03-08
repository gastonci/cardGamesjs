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
		var res = {},addFn = 'var card = arguments[0];this.child.push(card);',
		subtractFn = '';
		res.size = 0;
		res.baseIndex = 0;
		res.top = top;
		res.left = left;
		res.down = top + height;
		res.right = width + left;
		res.child = [];
		res.childXY = [];
		switch(from.vertical){
			case 'left':
				res.fromX = res.left;
				addFn += 'card.style.left = this.fromX;';
				break;
			case 'right':
				res.fromX = null;
				addFn += 'this.fromX = this.fromX?this.fromX:(this.right - parseInt(card.style.width));card.style.left = this.fromX;';
				break;
			case 'center':
				res.fromX = null;
				res.fromXbuff = width / 2 + left;
				addFn += 'if(!this.fromX){this.fromX = this.fromXbuff - (parseInt(card.style.width) / 2);delete this.fromXbuff;}card.style.left = this.fromX;';
				break;
		}
		switch(from.horizontal){
			case 'top':
				res.fromY = res.top;
				addFn += 'card.style.top = this.fromY;';
				break;
			case 'bottom':
				addFn += 'this.fromY = this.down - parseInt(card.style.height);card.style.top = this.fromY;';
				break;
			case 'center':
				res.fromY = null;
				res.fromYbuff = height / 2 + top;
				addFn += 'if(!this.fromY){this.fromY = this.fromYbuff - (parseInt(card.style.height) / 2);delete this.fromYbuff;}card.style.top = this.fromY;';
				break;
		}
		addFn += 'this.childXY.push({left:this.fromX,top:this.fromY,index:this.baseIndex});'
		switch(to){
			case 'left':
				res.baseIndex = 100;
				addFn += 'card.style.zIndex = this.baseIndex;this.fromX -= '+(from.vertical == to?expand+';this.left -= '+expand:expand)+';this.baseIndex--;';
				if(from == 'right'){addFn += 'if(this.fromX <= this.left)this.left = this.fromX;';}
				break;
			case 'right':
				addFn += 'card.style.zIndex = this.baseIndex;this.fromX += '+(from.vertical == to?expand+';this.right += '+expand:expand)+';this.baseIndex++;';
				break;
		}
		res.add = new Function(addFn);
		child.push(res);
		size++;
	}
}