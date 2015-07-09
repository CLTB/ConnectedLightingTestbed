
$(document).ready(function() {

//$('.algo_preset_1').find('textarea').val('[on/off-3]=true;');
//$('.algo_preset_1').find('textarea').val('if([NYCTraffic_4]>10){[on/off-714693]=true;}else{[on/off-714693]=false;}');
$('.algo_preset_1').find('textarea').val('[on/off-3]=[status1];[on/off-714693]=[status2];[on/off-4]=[status3];');


//$('.algo_preset_2').find('textarea').val('if([current second]%10==0){[on/off-2]="true";}'+
//	'if([current second]%10==5){[on/off-2]="false";}');

algorithm_txt_size_adjust($('.algorithm').width());

$('#btn_addalgo_utot').hide();
$('#btn_addalgo_script').hide();
$('.algo_config').hide();

$('#div_addalgo').hover(function(){
	$('#btn_addalgo_utot').slideDown();
	$('#btn_addalgo_script').slideDown();
},function(){
	$('#btn_addalgo_utot').slideUp();
	$('#btn_addalgo_script').slideUp();
});

$('.algorithm').on('click','#btn_addalgo_script',function(){
		var num_logic = $('#algo_logics').find('.algo_module').length + 1;
		var newAlgo = document.createElement("li");
		newAlgo.innerHTML = 
			"<div>"+
			"	<div class='div_logic'>	"+
			"		<textarea class='txt_logic' placeholder='type logic "+ num_logic +" here.'></textarea>"+	
			"	</div>"+
			"	<div class='div_config_summary'>"+
			"		<span class='config_summary_1'>Execute at:</span><br>"+
			"		<span  class='config_summary_2'><b>1 second</b></span><br>"+
			"       <span  class='config_summary_3'><b>interval</b></span><br>"+
			"		<button class='logic_config logic_button' type='button'><span class='fa fa-cog'></span><span class='re'> config </span></button>"+
			"	</div>"+
			"	<div class='div_logic_stop'>"+
			"		<button class='channel_delete logic_button' type='button'><span class='fa fa-minus'></span><span class='re'> - delete </span></button><br>"+
			"		<button class='logic_execute logic_button' type='button'><span class='fa fa-play'></span><span class='re'> execute </span></button><br>"+
			"		<button class='logic_stop logic_button' type='button'><span class='fa fa-stop'></span><span class='re'> stop </span></button>"+
			"	</div>"+
			"</div>";
			
		$('#algo_logics').append(newAlgo);
		$('#algo_logics>li:last-child').addClass("algo_module algo_module_script changeWithPanel");
		$('#algo_logics>li:last-child .div_logic').next().css('height', $('#algo_logics>li:last-child .div_logic').height());
		algorithm_txt_size_adjust($('.algorithm').width());
		lastFocusedAlgoTxt = $('#algo_logics>li:last-child .txt_logic');
		
		var newAlgoConfig = document.createElement("li");
		newAlgoConfig.innerHTML = 
		"<span class='timing_ctl_txt'>execute the algorithm </span><span class='timing_ctl_idx'>"+ num_logic +"</span>"+
		"	<select name='timing_ctl' class='timing_ctl'>"+
     	"		<option value='at' selected>at:</option>"+
     	"		<option value='when'>when:</option>"+
     	"		<option value='to'>according to:</option>"+
    	"	</select>"+			
		"	<div class='div_timing_opt at_option'>"+
		"		<input name='timing_opt' class='timing_opt time_spinner' value='1'>"+
    	"		<select name='timing_txt' class='timing_txt'>"+
     	"			<option value='se' selected>sec</option>"+
     	"			<option value='mi'>min</option>"+
     	"			<option value='hr'>hour</option>"+
    	"		</select>"+
    	"		<span class='timing_txt2'>interval</span>"+
    	"	</div>"+
    	"	<div class='div_timing_opt when_option'>"+
    	"		<select name='timing_txt' class='timing_eventinput'>"+
     	"			<option value='' disabled selected>an event</option>"+
    	"		</select>"+
    	"		<span class='timing_txt2'>occurs</span>"+
    	"	</div>"+
    	"	<div class='div_timing_opt to_option'>"+
    	"		<select name='timing_txt' class='timing_recordedinput'  data-bind='options:availableTimeStamps' id='here'>"+
     	"			<option value='' disabled selected>a recorded time stamp input</option>"+
    	"		</select><br>"+
    	"		<span class='timing_txt3'>accelerate at:</span>"+
    	"		<input name='acc_opt' class='acc_opt acc_spinner' value='1'>"+
    	"		<span class='timing_txt4'> times as fast as the original time stamps</span>"+
    	"	</div>"+
    	"	<button class='config_ok logic_button' type='button'><span class='fa fa-check'></span><span class='re'> save </span></button>"+
    	"   <button class='config_cancel logic_button' type='button'><span class='fa fa-times'></span><span class='re'> cancel </span></button>";
    				
		$('#algo_logics').append(newAlgoConfig);
		$('#algo_logics>li:last-child').addClass("algo_config changeWithPanel");
		$('.time_spinner').spinner({
			spin:function(event,ui){
			if(ui.value<0){$(this).spinner("value",0);return false;}
		}});
		$('.acc_spinner').spinner({
			spin:function(event,ui){
			if(ui.value<0){$(this).spinner("value",0);return false;}
		}});
		$('#algo_logics>li:last-child').hide();
		var node= document.getElementById("here");
		ko.applyBindings(VM_timeStampInputs,node);
		node.removeAttribute('id');
});

$('.algorithm').on('click','#btn_addalgo_utot',function(){
		var num_logic = $('#algo_logics').find('.algo_module').length + 1;
		var newAlgo = document.createElement("li");
		newAlgo.innerHTML = 
		"	<div>"+
		"		<div class='div_logic'>"+
		"			<div class='div_logic_frame'>"+
		"				<span>Use </span>"+
		"					<select name='data'>"+
     	"						 <option value='' disabled selected>this input</option>"+
    	"					</select>"+
		"				<span> On </span>"+
		"					<select name='channel'>"+
     	"						 <option value='' disabled selected>that output</option>"+
    	"					</select>"+						
		"			</div>"+
		"		</div>"+
		"		<div class='div_config_summary'>"+
		"			<span class='config_summary_1'>Execute at:</span><br>"+
		"			<span  class='config_summary_2'><b>1 second</b></span><br>"+
		"       <span  class='config_summary_3'><b>interval</b></span><br>"+
		"			<button class='logic_config logic_button' type='button'><span class='fa fa-cog'></span><span class='re'> config </span></button>"+
		"		</div>"+
		"		<div class='div_logic_stop'>"+
		"			<button class='channel_delete logic_button' type='button'><span class='fa fa-minus'></span><span class='re'> - delete </span></button><br>"+
		"			<button class='logic_execute logic_button' type='button'><span class='fa fa-play'></span><span class='re'> execute </span></button><br>"+
		"			<button class='logic_stop logic_button' type='button'><span class='fa fa-stop'></span><span class='re'> stop </span></button>"+
		"		</div>"+
		"	</div>";
			
		$('#algo_logics').append(newAlgo);
		$('#algo_logics>li:last-child').addClass("algo_module algo_module_utot changeWithPanel");
		algorithm_txt_size_adjust($('.algorithm').width());
		
		var newAlgoConfig = document.createElement("li");
		newAlgoConfig.innerHTML = 
		"<span class='timing_ctl_txt'>execute the algorithm </span><span class='timing_ctl_idx'>"+ num_logic +"</span>"+
		"	<select name='timing_ctl' class='timing_ctl'>"+
     	"		<option value='at' selected>at:</option>"+
     	"		<option value='when'>when:</option>"+
     	"		<option value='to'>according to:</option>"+
    	"	</select>"+			
		"	<div class='div_timing_opt at_option'>"+
		"		<input name='timing_opt' class='timing_opt time_spinner' value='1'>"+
    	"		<select name='timing_txt' class='timing_txt'>"+
     	"			<option value='se' selected>sec</option>"+
     	"			<option value='mi'>min</option>"+
     	"			<option value='hr'>hour</option>"+
    	"		</select>"+
    	"		<span class='timing_txt2'>interval</span>"+
    	"	</div>"+
    	"	<div class='div_timing_opt when_option'>"+
    	"		<select name='timing_txt' class='timing_eventinput'>"+
     	"			<option value='' disabled selected>an event</option>"+
    	"		</select>"+
    	"		<span class='timing_txt2'>occurs</span>"+
    	"	</div>"+
    	"	<div class='div_timing_opt to_option'>"+
    	"		<select name='timing_txt' class='timing_recordedinput' data-bind='options:availableTimeStamps' id='here'>"+
     	"			<option value='' disabled selected>a recorded time stamp input</option>"+
    	"		</select><br>"+
    	"		<span class='timing_txt3'>accelerate at:</span>"+
    	"		<input name='acc_opt' class='acc_opt acc_spinner' value='1'>"+
    	"		<span class='timing_txt4'> times as fast as the original time stamps</span>"+
    	"	</div>"+
    	"	<button class='config_ok logic_button' type='button'><span class='fa fa-check'></span><span class='re'> save </span></button>"+
    	"   <button class='config_cancel logic_button' type='button'><span class='fa fa-times'></span><span class='re'> cancel </span></button>";

    				
		$('#algo_logics').append(newAlgoConfig);
		$('#algo_logics>li:last-child').addClass("algo_config changeWithPanel");
		$('.time_spinner').spinner({
			spin:function(event,ui){
			if(ui.value<0){$(this).spinner("value",0);return false;}
		}});
		$('.acc_spinner').spinner({
			spin:function(event,ui){
			if(ui.value<0){$(this).spinner("value",0);return false;}
		}});
		$('#algo_logics>li:last-child').hide();
		var node= document.getElementById("here");
		ko.applyBindings(VM_timeStampInputs,node);
		node.removeAttribute('id');
});

$('#algo_logics').on('focus','.txt_logic', function () {
	lastFocusedAlgoTxt = $(this);
});

$('#algo_logics').on("change",".timing_ctl",function(){
	var selection = $(this).val();
	switch (selection){
		case "at":
			$(this).css("width","35px");
			$(this).siblings('.at_option').slideDown();
			$(this).siblings('.at_option').siblings('.div_timing_opt').hide();
			break;
		case "when":
			$(this).css("width","55px");
			$(this).siblings('.when_option').slideDown();
			$(this).siblings('.when_option').siblings('.div_timing_opt').hide();
			break;
		case "to":
			$(this).css("width","100px");
			$(this).siblings('.to_option').slideDown();
			$(this).siblings('.to_option').siblings('.div_timing_opt').hide();
			break;
	}
});

$('#algo_logics').on("change",".timing_txt",function(){
	var paringspinner = $(this).siblings('.ui-spinner').children('.time_spinner');
	var selection = $(this).val();
	
	
	paringspinner.spinner({
		spin:function(event,ui){
		if(ui.value<0){
			$(this).spinner("value",0);
			return false;
		}
	}
	});
});
	
$('.acc_spinner').spinner({
	spin:function(event,ui){
		if(ui.value<0){
			$(this).spinner("value",0);
			return false;
		}
	}
});

$('.time_spinner').spinner({
	spin:function(event,ui){
		if(ui.value<0){
			$(this).spinner("value",0);
			return false;
		}
	}
});

$('#algo_logics').on("click",".logic_config",function(){
	$(this).parents('.algo_module').next('.algo_config').slideToggle(500);
});

$('#algo_logics').on("click",".config_ok",function(){
	$(this).parents('.algo_config').slideUp();
	
	//change the summary
	var ctl_choice = $(this).parents('.algo_config').find('.timing_ctl').val();
	var summary = $(this).parents('.algo_config').prev('.algo_module').find('.div_config_summary');
	switch (ctl_choice){
		case "at":
			summary.find('.config_summary_1').text("Execute at:");
			var num = $(this).parents('.algo_config').find('.timing_opt').val();
			var opt = $(this).parents('.algo_config').find('.timing_txt').val();
			var summarytxt = "";
			if (opt == "se"){summarytxt = num + "-second";}
			if (opt == "mi"){summarytxt = num + "-minute";}
			if (opt == "hr"){summarytxt = num + "-hour";}
			summary.find('.config_summary_2').find('b').text(summarytxt);
			summary.find('.config_summary_3').find('b').text("interval");
			break;
		case "when":
			var eve = $(this).parents('.algo_config').find('.timing_eventinput').val();
			if (eve){//if the input is valid
				summary.find('.config_summary_1').text("Execute when:");
				summary.find('.config_summary_2').find('b').text(eve);
				summary.find('.config_summary_2').find('b').text("");
				summary.find('.config_summary_3').find('b').text("occurs");
			}else{//if the input is not valid, change the settings back to the previous.
				$(this).parents('.algo_config').find('.config_cancel').click();
			}
			
			break;
		case "to":
			var to = $(this).parents('.algo_config').find('.timing_recordedinput').val();
			if (to!="a recorded time stamp input"){//if the input is valid
				summary.find('.config_summary_1').text("Exec. according to:");
				var recordedinput = $(this).parents('.algo_config').find('.timing_recordedinput').val();
				var accopt = $(this).parents('.algo_config').find('.acc_opt').val();
				summary.find('.config_summary_2').find('b').text(recordedinput);
				summary.find('.config_summary_3').find('b').text("X"+accopt);
			}else{
				$(this).parents('.algo_config').find('.config_cancel').click();
			}
			break;
	}
	//if the algorithm is executing, stop it and restart
	var this_logic_execute_btn = $(this).parents('.algo_config').prev('.algo_module').find('.logic_execute');
	var this_logic_stop_btn = $(this).parents('.algo_config').prev('.algo_module').find('.logic_stop');
	if (this_logic_execute_btn.prop('disabled')){
		this_logic_stop_btn.click();
		this_logic_execute_btn.click();
	}
});

$('#algo_logics').on("click",".config_cancel",function(){
	$(this).parents('.algo_config').slideUp();
	
	//change the input settings back
	var ctl_choice = $(this).parents('.algo_config').find('.timing_ctl');
	var summary = $(this).parents('.algo_config').prev('.algo_module').find('.div_config_summary');
	var summary1 = summary.find('.config_summary_1').text();
	var summary2 = summary.find('.config_summary_2').text();
	switch (summary1){
		case "Execute at:":
			ctl_choice.val("at");
			if (summary2.indexOf("second")>0){
				ctl_choice.siblings('.at_option').children('.timing_txt').val("se");
				ctl_choice.siblings('.at_option').find('.timing_opt').val(parseInt(summary2.substring(0,summary2.indexOf("second"))));
			}
			else if (summary2.indexOf("minute")>0){
				ctl_choice.siblings('.at_option').children('.timing_txt').val("mi");
				ctl_choice.siblings('.at_option').find('.timing_opt').val(parseInt(summary2.substring(0,summary2.indexOf("minute"))));
			}
			else if (summary2.indexOf("hour")>0){
				ctl_choice.siblings('.at_option').children('.timing_txt').val("hr");
				ctl_choice.siblings('.at_option').find('.timing_opt').val(parseInt(summary2.substring(0,summary2.indexOf("hour"))));
			}
			$(this).parents('.algo_config').find('.at_option').show();
			$(this).parents('.algo_config').find('.at_option').siblings('.div_timing_opt').hide();
			break;
		case "Execute when:":
			ctl_choice.val("when");
			$(this).parents('.algo_config').find('.when_option').show();
			$(this).parents('.algo_config').find('.when_option').siblings('.div_timing_opt').hide();
			break;	
		case "Ex. according to:":
			ctl_choice.val("to");
			$(this).parents('.algo_config').find('.to_option').show();
			$(this).parents('.algo_config').find('.to_option').siblings('.div_timing_opt').hide();
			break;
	}
	
});



});