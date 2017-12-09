if(current == 0 && selected == 1)
{
	direction = R;
	option = L;
}

else if(current == 1 & selected == 0)
{
	direction = L;
	option = R;
}



if(current == 0) // R D
{
	if(selected == 1)
	{
		direction = R;
		option = L;
	}
	
	else if(selected == 2)
	{
		direction = D;
		option = U;
	}
	
	else if(selected == 3)
	{
		direction = R;
		option = L;
	}
}

else if(current == 1) // L U
{
	if(selected == 0)
	{
		direction = L;
		option = R;
	}
	
	else if(selected == 2)
	{
		direction = L;
		option = R;
	}
	
	else if(selected == 3)
	{
		direction = U;
		option = D;
	}	
}

else if(current == 2) // U R
{
	if(selected == 0)
	{
		direction = U;
		option = D;
	}
	
	else if(selected == 1)
	{
		direction = R;
		option = L;
	}
	
	else if(selected == 3)
	{
		direction = U;
		option = D;
	}	
}

else if(current == 3) // D L
{
	if(selected == 1)
	{
		direction = D;
		option = U;
	}
	
	else if(selected == 2)
	{
		direction = D;
		option = U;
	}
	
	else if(selected == 0)
	{
		direction = L;
		option = R;
	}	
}


