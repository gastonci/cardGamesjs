
var cardHolders = function()
{
	var child = [];
	var size = 0;
	function verifyPolygonCollition(top,left,right,down,width,height,area){
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
	function verifyRectCollition(top,left,right,down,area){
		var a = (down > area.top) && (down < area.down),b = (right > area.left) && (right < area.right),c = (left < area.right) && (left > area.left),d = (top > area.top) && (top < area.down);
		if(a && b) return 1;
		if(a && c) return 2;
		if(d && b) return 3;
		if(d && c) return 4;
		return 0;
	}
	function verifyCircleCollition(top,left,right,down,width,height,area){
		var axisX = left + (width / 2), axisY = top + (height / 2),X = axisX > area.x,Y = axisY > area.y,areaX = X?area.x + area.radius:area.x - area.radius,areaY = Y?area.y + area.radius:area.y - area.radius;
		if(axisX > (X?area.x:areaX) && axisX < (X?areaX:area.x) && axisY > (Y?area.y:areaY) && axisY < (Y?areaY:area.y)){return true;}
		if(areaX > left && areaX < right && areaY > top && areaY < down){return true;}
		return false;
	}
	this.checkColliders = function(cardContainer,top,left,width,height){
		var right = left + width,down = top + height,index = 0,res,x;
		while(index < size){
			x = child[index];
			switch(x.shape){
				case 'poly':
					res = verifyPolygonCollition(top,left,right,down,width,height,x);
					break;
				case 'circle':
					res = verifyCircleCollition(top,left,right,down,width,height,x);
					break;
				default:
					res = verifyRectCollition(top,left,right,down,x);
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
		x.add(cardContainer,height,width);
		return x;
	}
	this.create = function(maparea,sort)
	{
		var res = {},x = maparea.coords.split(','),y = x.length,z = 0;
		res.size = 0;
		res.baseIndex = 0;
		res.child = [];
		res.childXY = [];
		res.shape = maparea.shape;
		switch(sort){
			case 'name':
				var sortEval = function compare(a,b){
					if (a.root.card.name < b.root.card.name)
						return -1;
					if (a.root.card.name > b.root.card.name)
						return 1;
					return 0;
				}
				break;
			default:
				console.log('sort: '+sort);
				break;
		}
		res.sort = function(){
			var x = 0,y,z = res.cardLeft;
			if(!sortEval){return;}
			res.child.sort(sortEval);
			while(x < res.size){
				y = res.child[x];
				y.style.left = z;
				z += parseInt(y.style.width);
				x++;
			}
		}
		switch(res.shape){
			case 'poly':
				var buff,zumX = 0,zumY = 0;
				res.coordX = [];
				res.coordY = [];
				res.length = 0;
				while(z < y){
					buff = parseInt(x[z]);
					res.coordX.push(buff);
					zumX += buff;
					z++;
					buff = parseInt(x[z]);
					res.coordY.push(buff);
					zumY += buff;
					z++;
				}
				z /= 2;
				res.centroidX = zumX / z;
				res.centroidY = zumY / z;
				res.olDisplacementLeft = null;
				res.olDisplacementRight = 0;
				res.add = function(x,y,z){
					var buff,buffer;
					res.size++;
					buffer = res.centroidY - (y / 2);
					x.style.top = buffer;
					if(res.olDisplacementLeft != null){
						if(res.size & 1){
							buff = res.centroidX - res.olDisplacementLeft - z;
							res.olDisplacementLeft += z;
							res.cardLeft = buff;
						}
						else{
							buff = res.centroidX + res.olDisplacementRight;
							res.olDisplacementRight += z;
						}
					}
					else{
						res.olDisplacementLeft = z / 2;
						res.olDisplacementRight = res.olDisplacementLeft;
						buff = res.centroidX - res.olDisplacementLeft;
						res.cardLeft = buff;
					}
					x.style.left = buff;
					res.child.push(x);
					res.childXY.push({top:buffer,left:buff});
					res.sort();
				}
				res.length = z;
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
		child.push(res);
		size++;
	}
}