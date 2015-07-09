$( document ).ready(function() {

$(".input").on("click",".btn_timeload", function(){
	var flabel=false;
	var index = $('#input_channels>.timer_input').length+1;
	$(this).siblings("input:checked").each(function(){
		if (!flabel){
			var sourceLbl = document.createElement("div");
        	sourceLbl.innerHTML = "<label>Timer"+index+"</label>";
			$('#input_channels').append(sourceLbl);
			$('#input_channels>div:last-child').addClass("input_source changeWithPanel timer_input loaded_channel");
			var sourceUl = document.createElement("ul");
			$('#input_channels').append(sourceUl);
			var listItem = document.createElement("li");
			flabel=true;
        }
        var listItem = document.createElement("li");
        listItem.innerHTML = 
		"		<div>"+
		"			<a class='channel_title active'>current " + $(this).attr('name') + "</a>"+
		"			<button class='channel_delete' type='button'> - delete </button>"+
		"			<button class='channel_timestamp' type='button' title='set the input as a time-stamp'><span class='fa fa-clock-o'></span></button>"+
		"			<label class='channel_parameter timer_element'>" + $(this).attr('value') + "</label>" +
		"		</div>";
		$('#input_channels>ul:last-child').append(listItem);
		$('#input_channels>ul:last-child>li:last-child').addClass("timer_channel active");
		$('#input_channels>ul:last-child>li:last-child .channel_parameter').hide();
		
		inputData["current " + $(this).attr('name')]=[];
		//var inputVirtualAlgo = "return getTime("+$(this).attr('value')+");";
		var inputVirtualAlgoResult = new Function('return getTime("'+$(this).attr("value")+'")');
		inputData["current " + $(this).attr('name')].push(inputVirtualAlgoResult);
		InputNms["current " + $(this).attr('name')]="";
		
		$('.input').removeClass('active');
		$('.input').find('.panel_title').addClass('active');
		$('.input').find('.vertical_bar').addClass('active');
		$('.div_logic input[name="data"]').autocomplete({source:InputNms});
		
		return true;
	});
	$('#div_addChoice').slideUp();	
    $('#input_modules').slideUp();
});




});

function getTime(input){
	if (input=="yr"){var a = new Date().getFullYear();	return a;}
	if (input=="mo"){var a = new Date().getMonth();	return a;}
	if (input=="dt"){var a = new Date().getDate();	return a;}
	if (input=="dy"){var a =  new Date().getDay();	return a;}
	if (input=="hr"){var a =  new Date().getHours();	return a;}
	if (input=="mi"){var a =  new Date().getMinutes();	return a;}
	if (input=="se"){var a =  new Date().getSeconds();	return a;}
}