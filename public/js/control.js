var control;

function control_init()
{
	control = {};
	control.signal = "";
	control.running = false;
}

function control_on()
{
	if(!control.running)
	{
		control_listen(true);
	}
}

function control_off()
{
	if(control.running)
	{
		control_listen(false);
	}
}

function control_listen(run)
{
	if(run)
	{
		control.running = true;
		window.addEventListener("keydown", control_event, false);
	}

	else
	{
		control.running = false;
		window.removeEventListener("keydown", control_event, false);
	}
}

function control_event(event)
{
	let keyName = event.key.toUpperCase();
	
	switch(keyName)
	{
		case "ARROWUP":
		{
			ui_path("U", true);

			break;
		}

		case "ARROWDOWN":
		{
			ui_path("D", true);

			break;
		}

		case "ARROWLEFT":
		{
			ui_path("L", true);

			break;
		}

		case "ARROWRIGHT":
		{
			ui_path("R", true);

			break;
		}

		default:
		{

		}
	}
}