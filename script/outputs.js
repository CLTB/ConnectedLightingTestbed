$(document).ready(function() {

usedOutputChannels=[];
//to add a chosen module to the Inputs
$('#btn_addoutput').on('click',function(){
		$('#div_chooseOutputType').slideDown();		
});

$('#addoutput').on('click',function(){
		$('#output_modules').slideDown();
		var e = document.getElementById("select_addOutput");
		var addChoice = e.selectedIndex;  //can change to .text to get the string
		
		//hide other module and show this module
		//var element = $(this).parents('li');

		var element = $('#output_modules>li:eq('+addChoice+')');
		element.siblings('li').hide();
		element.slideDown();
});

$("#select_addOutput").on("change",function(){
	if ($('#output_modules').children('li:visible').length>0){
		var addChoice = $("#select_addOutput option:selected").index();  //can change to .text to get the string
		var element = $('#output_modules>li:eq('+addChoice+')');
		element.siblings('li').hide();
		element.slideDown();
	} 
});

$('.btn_outputmodulecancel').on("click",function(){
	$('#output_modules').slideUp();
	$('#div_chooseOutputType').slideUp();
}); 

$('#hue_api_selection').on('click',function(){
	if ($('input[name=hue_api]:checked', '#hue_api_selection').val() == "hue_int"){
		$('.hue_int').slideDown();
		$('.hue_ext').hide();
	}
	if ($('input[name=hue_api]:checked', '#hue_api_selection').val() == "hue_ext"){
		$('.hue_ext').slideDown();
		$('.hue_int').hide();
	}
});

$("#btn_hueconn").on("click",function(){
	var par1, par2, mode;
	if ($('input[name=hue_api]:checked', '#hue_api_selection').val() == "hue_int"){
		//get the lights from Hue
		par1 = $( "input[name='HueIp']" ).val();//ip
		par2 = $( "input[name='HueUserName']" ).val();//user name
		mode = "int"; //mode
	}
	
	if ($('input[name=hue_api]:checked', '#hue_api_selection').val() == "hue_ext"){
    	//get the lights from Hue
		par1 = $( "input[name='HueBridgeID']" ).val();
		par2 = $( "input[name='HueAccToken']" ).val();
		mode = "ext";
	}
	HueConnect(par1,par2,mode); //function is written in the PutHTML.js
	
	var response;
	http.onreadystatechange = function()
    {
            if(http.readyState == 4)
            {
                if(http.status==200)
                {
                    response = JSON.parse(http.responseText);
                    if(Object.keys(response).length>0){
                    		$('#div_chooseOutputType').slideUp();
                			$('#output_modules').slideUp();
                			//add the outputs of the bridge
                			addHueBridge(par1,par2,mode);
                    		//has lamps attached on the bridge
                    		if (mode=="ext"){
                    			jQuery.each(response.lights, function(i, val) {
  								//add an Hue output bridge
  								addHueLamps(i,val,mode);
								});
							}
							if (mode =="int"){
                    			jQuery.each(response, function(i, val) {
  								//add an Hue output bridge
  									addHueLamps(i,val,mode);
								});
							}
                    }
                }
                else
                {
                    response = "Error: "+http.status;
                }
            }
        }
    
});

$("#btn_winkconn").on("click",function(){
	var usnm, pswd, c_id, c_secret;
	usnm = $( "input[name='WinkUsnm']" ).val();//user name
	pswd = $( "input[name='WinkPswd']" ).val();//password
	c_id = $( "input[name='WinkClientID']" ).val();//Client ID
	c_secret = $( "input[name='WinkClientSecret']" ).val();//Client Secret
	
	WinkConnect(usnm, pswd, c_id, c_secret); //function is written in the PutHTML.js
	
	var response;
	http.onreadystatechange = function()
    {
            if(http.readyState == 4)
            {
                if(http.status==200)
                {
                    response = JSON.parse(http.responseText);
                    if(Object.keys(response).length>0){
                    		$('#div_chooseOutputType').slideUp();
                			$('#output_modules').slideUp();
                			//get the access token
                			var wink_token = response.access_token;
                			
                			//add the outputs of the bridge
                			addWinkHub(usnm,wink_token);
                    }
                }
                else
                {
                    response = "Error: "+http.status;
                }
            }
        }
    
});

function addWinkHub(wink_usnm,wink_token){
    if (window.XMLHttpRequest)
    {
        var http = new XMLHttpRequest();
        http.open('GET', 'https://winkapi.quirky.com/users/me/hubs', true);
        http.setRequestHeader("Authorization", "bearer "+wink_token);
        http.setRequestHeader("document.domain",'clist.azurewebsites.net');

        http.onreadystatechange = function()
        {
            if(http.readyState == 4)
            {
                if(http.status==200)
                {
                    var WinkHubs = "Bad JSON: "+http.responseText;
                    WinkHubs = JSON.parse(http.responseText);
                    jQuery.each(WinkHubs.data, function(i, val) {
  						if (val.device_manufacturer == "wink") {
  							var index = $('#output_channels .output_wink').length+1;
	
							var newHub = document.createElement("div");
							newHub.innerHTML = 
									"	<label>Wink Hub: "+
   									"	<span>Wink " + index + " </span><span>("+ val.hub_id+")</span>"+
   									"	</label>"+
   									"	<label class='usnm'>"+ wink_usnm + "</label>"+
									"	<label class='esstoken'>"+ wink_token + "</label>";
			
							$('#output_channels').append(newHub);
							$('#output_channels>div:last-child').addClass("output_wink changeWithPanel loaded_channel");							
							$('#output_channels>div:last-child .usnm').hide();
							$('#output_channels>div:last-child .esstoken').hide();
							
							var newOutputs = document.createElement("ul");
							$('#output_channels').append(newOutputs);
							$('#output_channels>ul:last-child').addClass("Wink_lamps");
							
  							addWinkLamps(wink_token,val.hub_id);
  						}
					});
                }
                else
                {
                	//error goes here
                    //$("#output").text("Error "+http.status);
                }
            }
        }
        http.send();
    }
    return false;
} 

function addHueBridge(par1,par2,mode){
	var index = $('#output_channels .output_hue').length+1;
	
	var newBridge = document.createElement("div");
		newBridge.innerHTML = 
			"	<label>Hue Bridge: "+
   			"	<span class='hue_int'>Hue " + index + " </span><span class='ip_show hue_int'>("+ par1+")</span>"+
   			"	<span class='hue_ext'>Hue " + index + " </span><span class='id_show hue_ext'>("+ par1+")</span>"+
   			"	</label>"+
			"	<label class='ip hue_int'>"+  par1 + "</label>"+
			"	<label class='id hue_ext'>"+  par1 + "</label>"+
			"	<label class='usrnm hue_int'>"+ par2+ "</label>"+
			"	<label class='esstoken hue_ext'>"+ par2 + "</label>";
			
		$('#output_channels').append(newBridge);
		$('#output_channels>div:last-child').addClass("output_hue " + mode +" changeWithPanel loaded_channel");
		var newOutputs = document.createElement("ul");
		$('#output_channels').append(newOutputs);
		$('#output_channels>ul:last-child').addClass("Hue_lamps");
		
		$('#lbl_outputchannels').text("Available Channels:");
		$('#output_channels>div:last-child .edittingtext').hide();
		$('#output_channels>div:last-child .ip').hide();
		$('#output_channels>div:last-child .usrnm').hide();
		$('#output_channels>div:last-child .id').hide();
		$('#output_channels>div:last-child .esstoken').hide();
		
		if (mode=="int"){$('#output_channels>div:last-child .hue_ext').hide();} 
		if (mode=="ext"){$('#output_channels>div:last-child .hue_int').hide();} 
		
}

function addWinkLamps(wink_token,hub_id){
    if (window.XMLHttpRequest)
    {
        var http = new XMLHttpRequest();
        http.open('GET', 'https://winkapi.quirky.com/users/me/light_bulbs', true);
        http.setRequestHeader("Authorization", "bearer "+wink_token);
        http.setRequestHeader("document.domain",'clist.azurewebsites.net');

        http.onreadystatechange = function()
        {
            if(http.readyState == 4)
            {
                if(http.status==200)
                {
                    var LightBulbs = "Bad JSON: "+http.responseText;
                    LightBulbs = JSON.parse(http.responseText);
                    jQuery.each(LightBulbs.data, function(i, val) {
  						if (val.hub_id == hub_id) {
  							//add the lamp to the output channels
							
							$('#lbl_outputchannels').text("Available Channels:");
							var newOutput = document.createElement("li");
							newOutput.innerHTML = 
								"			<div>"+	
								"	            <b class='wink_lampname editabletext'>" + val.name + "</b>"+
								"				<input name='"+val.name+"' value='"+val.name+"' class='wink_lampname edittingtext'>"+ 
								"				<button class='output_lamp_delete channel_delete' type='button'> - delete </button><br>"+			
								"			    <a class='channel_title active'>on/off-"+val.light_bulb_id+"</a><br>"+
								"			    <a class='channel_title active'>brightness-"+val.light_bulb_id+"</a><br>"+
								"				<label class='wink_lamp_id' style='display: none'>"+val.light_bulb_id+"</label>"+
								"			</div>";
			
							$('#output_channels>ul:last-child').append(newOutput);
							$('#output_channels>ul:last-child>li:last-child').addClass("wink_lamp");
							$('.edittingtext').hide();
							
							//add output channels to the array
							var output=$('#output_channels>ul:last-child>li:last-child');
							var api, json, acctoken;
							
							acctoken=output.closest('.Wink_lamps').prev('.output_wink').find('.esstoken').text();
							api = 'https://winkapi.quirky.com/light_bulbs/' + val.light_bulb_id ;
							json="";
    		
							json ='{"desired_state": {"powered": ';
							usedOutputChannels["on/off-"+val.light_bulb_id]=[];
							usedOutputChannels["on/off-"+val.light_bulb_id].push('wink','PUT',api,json,acctoken);//command,api http address,parameters,millisecond for interval
							OutputNms["on/off-"+val.light_bulb_id]=[];
		
							json ='{"desired_state": {"brightness": ';
							usedOutputChannels["brightness-"+val.light_bulb_id]=[];
							usedOutputChannels["brightness-"+val.light_bulb_id].push('wink','PUT',api,json,acctoken);
							OutputNms["brightness-"+val.light_bulb_id]=[];
		
							$('.div_logic input[name="channel"]').autocomplete({source:OutputNms});
		
							$('.output').removeClass('active');
							$('.output').find('.panel_title').addClass('active');
							$('.output').find('.vertical_bar').addClass('active');
  						}
					});
                }
                else
                {
                    $("#output").text("Error "+http.status);
                }
            }
        }
        
        http.send();
    }
    return false;
}

function addHueLamps(i,val,mode){	
	var newOutput = document.createElement("li");
		newOutput.innerHTML = 
		"			<div>"+	
		"	            <b class='hue_lampname editabletext'>" + val.name + "</b>"+
		"				<input name='"+val.name+"' value='"+val.name+"' class='hue_lampname edittingtext'>"+ 
		"				<button class='output_lamp_delete channel_delete' type='button'> - delete </button><br>"+			
		"			    <a class='channel_title active'>on/off-"+i+"</a><br>"+
		"			    <a class='channel_title active'>brightness-"+i+"</a><br>"+
		"			    <a class='channel_title active'>hue-"+i+"</a><br>"+
		"			    <a class='channel_title active'>saturation-"+i+"</a><br>"+
		"				<label class='hue_lamp_id' style='display: none'>"+i+"</label>"+
		"				<label class='hue_lamp_mode' style='display: none'>"+mode+"</label>"+
		"			</div>";
			
		$('#output_channels>ul:last-child').append(newOutput);
		$('#output_channels>ul:last-child>li:last-child').addClass("hue_lamp");
		$('.edittingtext').hide();
		
		//add output channels to the array
		
		var output=$('#output_channels>ul:last-child>li:last-child');
		var ip, username, api, json, id, acctoken;
		if (mode == "int"){
			ip      =output.closest('.Hue_lamps').prev('.output_hue').find('.ip').text();
			username=output.closest('.Hue_lamps').prev('.output_hue').find('.usrnm').text();
			api ='http://' + ip + '/api/' + username + '/lights/'+i+'/state';
			json="";
		}
		if (mode == "ext"){
			id      =output.closest('.Hue_lamps').prev('.output_hue').find('.id').text();
			acctoken=output.closest('.Hue_lamps').prev('.output_hue').find('.esstoken').text();
			api = 'https://client.meethue.com/api/0/lights/' + i + '/state';
			json="";
		}
    		
		json ='{"on":';
		usedOutputChannels["on/off-"+i]=[];
		if(mode=="int"){usedOutputChannels["on/off-"+i].push(mode,'PUT',api,json);}//command,api http address,parameters,millisecond for interval
		if(mode=="ext"){usedOutputChannels["on/off-"+i].push(mode,'PUT',api,json,acctoken);}//command,api http address,parameters,millisecond for interval
		OutputNms["on/off-"+i]=[];
		
		json ='{"bri":';
		usedOutputChannels["brightness-"+i]=[];
		if(mode=="int"){usedOutputChannels["brightness-"+i].push(mode,'PUT',api,json);}//command,api http address,parameters,millisecond for interval
		if(mode=="ext"){usedOutputChannels["brightness-"+i].push(mode,'PUT',api,json,acctoken);}
		OutputNms["brightness-"+i]=[];
		
		json ='{"hue":';
		usedOutputChannels["hue-"+i]=[];
		if(mode=="int"){usedOutputChannels["hue-"+i].push(mode,'PUT',api,json);}//command,api http address,parameters,millisecond for interval
		if(mode=="ext"){usedOutputChannels["hue-"+i].push(mode,'PUT',api,json,acctoken);}
		OutputNms["hue-"+i]=[];
		
		json ='{"sat":';
		usedOutputChannels["saturation-"+i]=[];
		if(mode=="int"){usedOutputChannels["saturation-"+i].push(mode,'PUT',api,json);}//command,api http address,parameters,millisecond for interval
		if(mode=="ext"){usedOutputChannels["saturation-"+i].push(mode,'PUT',api,json,acctoken);}
		OutputNms["saturation-"+i]=[];
		
		$('.div_logic input[name="channel"]').autocomplete({source:OutputNms});
		
		$('.output').removeClass('active');
		$('.output').find('.panel_title').addClass('active');
		$('.output').find('.vertical_bar').addClass('active');
}		

//change the text to input for editing
var OriTxt;
$('#output_channels').on("click",'.editabletext',function(){
	var NameTxt = $(this);
	var NameIpt = $(this).next('.edittingtext');
	NameTxt.hide();
	NameIpt.show();
	NameIpt.focus();
	NameIpt.val(NameTxt.text());
	OriTxt = NameTxt.text();
});
$('#output_channels').on("blur",'.edittingtext',function(){
	var NameIpt = $(this);
	var NameTxt = $(this).prev('.editabletext');
	NameIpt.hide();
	NameTxt.text(NameIpt.val());
	NameTxt.show();
	if (NameIpt.val() != OriTxt){//when user changes
		UserInputName(NameIpt);
		OriTxt = NameIpt.val();
	}
});
$('#output_channels').on("keypress",'.edittingtext',function(){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
    	var NameIpt = $(this);
		var NameTxt = $(this).prev('.editabletext');
		NameIpt.hide();
		NameTxt.text(NameIpt.val());
		NameTxt.show();
		if (NameIpt.val() != OriTxt){
			UserInputName(NameIpt);
			OriTxt = NameIpt.val();
		}
	}
});

function UserInputName(IptField){
	if(IptField.closest('li').hasClass("hue_lamp")){
		//the change is a hue lamp
		var lampIdx = IptField.siblings('.hue_lamp_id').text();
		var ip = IptField.closest('.output_hue').find('.ip').text();
		var username = IptField.closest('.output_hue').find('.usrnm').text();
		var name = IptField.val();
		changeHueLampName(ip,username,lampIdx,name)
	}
};


});
