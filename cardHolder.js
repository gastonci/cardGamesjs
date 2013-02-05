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
		var right = left + width,down = top + height,index = 0,res,x;
		while(index < size){
			x = child[index];
			res = verifyCollition(top,left,right,down,x);
			if(res) break;index++;
		}
		if(index == size) return null;
		x.add(cardContainer,x);
		return x;
	}
	this.create = function(top,left,width,height,arrange,expand)
	{
		var res = {},fn = 'var card = arguments[0],res = arguments[1];card.top = res.top;card.left = res.left;';
		res.size = 0;
		res.baseIndex = 0;
		res.top = top;
		res.left = left;
		res.down = top + height;
		res.right = width + left;
		switch(arrange)
		{
			case 'left':
				res.baseIndex = 100;
				fn += 'card.style.left = res.left;card.style.top = res.top;card.style.zIndex = res.baseIndex;res.left -= '+expand;
				break;
			case 'down':
				fn += 'res.down += '+expand;
				break;
			case 'right':
				fn += 'res.right += '+expand;
				break;
			case 'up':
				fn += 'res.top -= '+expand;
				break;
			case 'center':
				break;
			default:
				break;
		}
		fn += ';res.baseIndex--;';
		res.add = new Function(fn);
		child.push(res);
		size++;
	}
}
