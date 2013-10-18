function scrollBannerMove(baseY,baseX,speed){
	var tg = document.getElementById("aside");
	if(tg == null)return;
	tg.getTop = function(){
		return window.pageYOffset;
	}
	
	var posY 	= 0;
	var baseY 	= baseY;
	var baseX 	= baseX;
	var sp	 	= speed;
	var totalScroll = document.documentElement.scrollHeight;
	var limitY 	= totalScroll - window.screen.height + tg.offsetHeight + baseY; 
	
	//alert(limitY);
	tg.style.left = baseX + "px";
	tg.move = setInterval(function(){
		posY += (tg.getTop()+baseY - tg.offsetTop) * sp;
		tg.style.top = posY + "px";
		if(tg.offsetTop < baseY )tg.style.top = baseY + "px";
		if(tg.offsetTop > limitY )tg.style.top = limitY + "px";
	},10);
}
