$( document ).ready(function() {
$('#countries').on("change",function(){
		var selected_val = $('#countries').val();
		var selected_idx = $('#countries')[0].selectedIndex;
		var hue1;
		var hue2;
		var hue3;
		var bri1=254;
		var bri2=254;
		var bri3=254;
		var sat1=254;
		var sat2=254;
		var sat3=254;
		
		switch(selected_idx) {
    		case 0: //christmas
        		hue1=25500;
        		hue2=0;
        		hue3=25500;
        	break;
    		case 1: //independence day
        		hue1=0;
        		hue2=0;
        		hue3=45500;
        	break;
        	case 2: //St Patrick's Day
        		hue1=parseInt(140/360*65535);
        		bri1=parseInt(60/100*254);
        		hue2=parseInt(140/360*65535);
        		bri2=parseInt(60/100*254);
        		hue3=parseInt(140/360*65535);
        		bri3=parseInt(40/100*254);
        	break;
        	case 3: //Tech Tuesday
        		hue1=parseInt(280/360*65535);
        		bri1=parseInt(30/100*254);
        		hue2=parseInt(290/360*65535);
        		bri2=parseInt(30/100*254);
        		hue3=parseInt(300/360*65535);
        		bri3=parseInt(30/100*254);
        	break;
        	case 4: //World Ocean's Day
        		hue1=parseInt(260/360*65535);
        		hue2=parseInt(240/360*65535);
        		bri2=parseInt(30/100*254);
        		hue3=parseInt(250/360*65535);
        	break;
        	case 5: //World Forest Day
        		hue1=parseInt(140/360*65535);
        		hue2=parseInt(130/360*65535);
        		bri2=parseInt(60/100*254);
        		hue3=parseInt(120/360*65535);
        	break;
        	case 6: //Go Seahawks
        		hue1=parseInt(237/360*65535);
        		bri1=parseInt(37/100*254);
        		hue2=parseInt(237/360*65535);
        		hue3=parseInt(111/360*65535);
        	break;
        	case 7: //Halloween
        		hue1=10000;
        		hue2=10000;
        		hue3=60000;
        	break;
        	case 8: //Chinese New Year
        		hue1=0;
        		hue2=0;
        		hue3=0;
        	break;
			}
			putHTML2(1,'true',bri1,hue1,sat1);
			putHTML2(2,'true',bri2,hue2,sat2);
			putHTML2(3,'true',bri3,hue3,sat3);
});
});