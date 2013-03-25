var cardContainer = function(card,width,height,left,top)
{
	if(!card){return null;}
	if(typeof(width)=='undefined' || width>500){width = null;}
	if(width){height = width / card.size[0]  * card.size[1];}
	else if(typeof(height)=='undefined' || height>card.size[1]){height = null;if(height){width = height / card.size[1] * card.size[0];}}
	this.card = card,
	div = document.createElement('DIV');
	spacer = new Image();
	image = new Image();
	div.className = 'cardContainer';
	div.style.maxWidth = width?width:card.size[0];
	div.style.height = height?height:card.size[1];
	spacer.style.height = height?height:card.size[1];
	spacer.style.width = '100%';
	div.style.width = div.style.maxWidth;
	div.style.left = (typeof(left)=='undefined')?0:left;
	div.style.top = (typeof(top)=='undefined')?0:top;
	div.style.zIndex = 1;
	spacer.src = 'img/spacer.png';
	image.className = card.css;
	image.style.width = width?(width / card.size[0]  * card.size[2]):card.size[2];
	image.style.height = height?(height / card.size[1]  * card.size[3]):card.size[3];
	image.src = card.src;
	div.appendChild(spacer);
	div.appendChild(image);
	div.root = this;
	document.body.appendChild(div);
	return this;
}

function InitDragDrop(_carHolder)
{
	var _startX,_startY,_offsetX,_offsetY,_oldZIndex,_dragElement = null;
	function OnMouseMove(e){
		if(e == null)var e = window.event; 
		_dragElement.style.left = (_offsetX + e.clientX - _startX) + 'px';
		_dragElement.style.top = (_offsetY + e.clientY - _startY) + 'px';
	}
	function ExtractNumber(value){
		var n = parseInt(value);
		return n == null || isNaN(n) ? 0 : n;
	}
	function OnMouseDown(e){
		if (e == null) e = window.event; 
		var target = e.target != null ? e.target.parentNode : e.srcElement.parentNode;
		if ((e.button == 1 && window.event != null || e.button == 0) && target.className == 'cardContainer'){
			_startX = e.clientX;
			_startY = e.clientY;

			_offsetX = ExtractNumber(target.style.left);
			_offsetY = ExtractNumber(target.style.top);

			_oldZIndex = target.style.zIndex;
			target.style.zIndex = 10000;

			_dragElement = target;
			document.onmousemove = OnMouseMove;
			document.body.focus();
			document.onselectstart = function(){return false;};
			target.ondragstart = function(){return false;};
			return false;
		}
	}
	function OnMouseUp(e){
		if(_dragElement != null){
			_dragElement.style.zIndex = _oldZIndex;
			document.onmousemove = null;
			document.onselectstart = null;
			_carHolder.checkColliders(_dragElement,ExtractNumber(_dragElement.style.top),ExtractNumber(_dragElement.style.left),ExtractNumber(_dragElement.style.width),ExtractNumber(_dragElement.style.height));
			_dragElement.ondragstart = null;
			_dragElement = null;
		}
	}
    document.onmousedown = OnMouseDown;
    document.onmouseup = OnMouseUp;
}