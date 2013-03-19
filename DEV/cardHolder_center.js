
var cardHolders = function()
{
	var child = [];
	var size = 0;
	function verifyPoligonCollition(top,left,right,down,width,height,area)
	{
		var i = 0, testx, testy, j = area.length - 1, x, y, z, xyz,a = b = c = d = e = false;
		function verify(c){
			if(((y>testy) != (z>testy)) && (testx < (xyz-x) * (testy-y) / (z-y) + x)){
				c = !c;
			}
			return c;
		}
		/***************************************************************
		* testx = width / 2 + left;									   *
		* testy = height / 2 + top;									   *
		* e = verify(e);//just in case... might remove it in the future*
		***************************************************************/
		while(i < area.length){
			testx = left;
			testy = top;
			x = area.coordX[i];
			xyz = area.coordX[j];
			y = area.coordY[i];
			z = area.coordY[j];
			a = verify(a);
			testx = right;
			b = verify(b);
			testy = down;
			c = verify(c);
			testx = left;
			d = verify(d);
			if((x > left) && (x < right) && (y > top) && (y < down)){return true;}
			j = i++;
		}
		if(a || b || c || d || e){return true;}
		return false;
	}
	this.checkColliders = function(cardContainer,top,left,width,height){
		var right = left + width,down = top + height,index = 0,res,x;
		while(index < size){
			x = child[index];
			switch(x.shape){
				case 'poly':
					res = verifyPoligonCollition(top,left,right,down,width,height,x);
					break;
			}
			if(res) break;
			index++;
		}
		res = x.child.indexOf(cardContainer);//verify if it's already added as a child
		if(res != -1){//if it's already a child, it returns the card to its old place
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
	this.create = function(maparea)
	{
		var res = {},x = maparea.coords.split(','),y = x.length,z = 0;
		res.size = 0;
		res.baseIndex = 0;
		res.child = [];
		res.childXY = [];
		res.shape = maparea.shape
		switch(res.shape){
			case 'poly':
				res.coordX = [];
				res.coordY = [];
				res.length = 0;
				while(z < y){
					res.coordX.push(parseInt(x[z]));
					z++;
					res.coordY.push(parseInt(x[z]));
					z++;
					res.length++;
				}
				break;
			case 'rect':
				res.top = parseInt(x[1]);
				res.left = parseInt(x[0]);
				res.down = parseInt(x[3]);
				res.right = parseInt(x[2]);
				break;
			case 'circle':
				res.x = parseInt(x[0]);
				res.y = parseInt(x[1]);
				res.radius = parseInt(x[2]);
				break;
			default:
				var name = maparea.getAttribute('name'), img_array = document.getElementsByTagName('img'),img = null;
				y = img_array.length;
				while(z < y){
					if(img_array[z].getAttribute('name') == name){
						img = img_array[z];
						res.top = parseInt(img.style.top);
						res.left = parseInt(img.style.left);
						res.down = parseInt(img.style.height) + res.top;
						res.right = parseInt(img.style.width) + res.left;
						break;
					}
					z++;
				}
				break;
		}
		res.add = function(x){
			//res.child.push(x);
			console.log('prueba cocodrilo');
		}
		child.push(res);
		size++;
	}
}