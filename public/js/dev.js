function dev_run()
{
	dev_btns();
}


function dev_btns()
{
	displayList.btn0 = document.querySelector(".t0");
	displayList.btn1 = document.querySelector(".t1");
	displayList.btn2 = document.querySelector(".t2");
	displayList.btn3 = document.querySelector(".t3");

	dev_init();
}

function dev_init()
{
	for(var i = 0; i < 4; i++)
	{
		displayList["btn" + i].addEventListener("click", dev_event, false);
	}
}

function dev_event(event)
{
	event.preventDefault();
	
	section_request(event.target.dataset.num);
}