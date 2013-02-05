var cardContainer = function(card,width,height,left,top)
{
	if(!card){return null;}
	if(typeof(width)=='undefined' || width>card.size[0]){width = null;}
	if(width){height = width / card.size[0]  * card.size[1];}
	else if(typeof(height)=='undefined' || height>card.size[1]){height = null;if(height){width = height / card.size[1] * card.size[0];}}
	this.card = card,
	div = document.createElement('DIV');
	spacer = new Image();
	image = new Image();
	div.className = 'cardContainer';
	div.style.maxWidth = width?width:card.size[0];
	spacer.style.height = height?height:card.size[1];
	spacer.style.width = '100%';
	div.style.width = div.style.maxWidth;
	div.style.position = 'relative';
	div.style.left = (typeof(left)=='undefined')?0:left;
	div.style.top = (typeof(top)=='undefined')?0:top;
	div.style.zIndex = 1;
	spacer.src = 'img/spacer.png';
	image.className = card.css;
	image.style.width = width?(width / card.size[0]  * card.size[2]):card.size[2];
	image.style.height = height?(height / card.size[1]  * card.size[3]):card.size[3];
	image.src = card.src;
	var _startX,_startY,_offsetX,_offsetY,active = null;
	div.onmousedown = function(e)
	{
		if(e == null)e = window.event;
		// grab the mouse position
        _startX = e.clientX;
        _startY = e.clientY;
        // grab the clicked element's position
        _offsetX = ExtractNumber(this.style.left);
        _offsetY = ExtractNumber(this.style.top);
        // bring the clicked element to the front while it is being dragged
        _oldZIndex = this.style.zIndex;
        this.style.zIndex = 10000;
        // tell our code to start moving the element with the mouse
		active = this;
        document.onmousemove = OnMouseMove;
        // cancel out any text selections
        document.body.focus();
        // prevent text selection in IE
        document.onselectstart = function () { return false; };
        // prevent IE from trying to drag an image
        this.ondragstart = function() { return false; };
        // prevent text selection (except IE)
        return false;
	}
	function OnMouseMove()
	{
		e = window.event;
		// this is the actual "drag code"
		active.style.left = (_offsetX + e.clientX - _startX) + 'px';
		active.style.top = (_offsetY + e.clientY - _startY) + 'px';
	}
	div.onmouseup = function()
	{
		if(active)
		{
			div.style.zIndex = _oldZIndex;
			// we're done with these events until the next OnMouseDown
			document.onmousemove = null;
			document.onselectstart = null;
			div.ondragstart = null;
			// this is how we know we're not dragging      
			active = null;
		}
	}
	function ExtractNumber(value)
	{
		var n = parseInt(value);
		return n == null || isNaN(n) ? 0 : n;
	}
	div.appendChild(spacer);
	div.appendChild(image);
	document.body.appendChild(div);
	return this;
}