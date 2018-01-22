
class Star
{
	constructor(num)
	{
		this.num = num;
	}
	
	build()
	{
		this.x = Math.round(Math.random() * (2200 - -200) + -200);
		this.y = Math.round(Math.random() * (1500 - -200) + -200);
		this.html = '<div class="star' + this.num + ' star" style="transform: translate(' + this.x + 'px, ' + this.y + 'px);"></div>';
	}
	
	read()
	{
		return this.html;
	}
}

function stars_init()
{
	let htmlCreate = "";
	
	for(let i = 0; i < 200; i++)
	{
		let s = new Star(i);
		s.build();
		
		htmlCreate += s.read();
	}
	
	document.querySelector(".layer0").innerHTML = htmlCreate;
}