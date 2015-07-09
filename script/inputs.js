
$(document).ready(function() {

ko.applyBindings(VM_timeStampInputs);
var this_input = document.getElementsByClassName("this_input");
//ko.applyBindings(VM_Inputs,this_input);


//to add a chosen module to the Inputs
$('#btn_addinput').on('click',function(){
	$('#div_addChoice').slideDown();		
});

$('#add').on('click',function(){
	$('#input_modules').slideDown();
	var addChoice = $("#select_addChoice option:selected").index();  
	var element = $('#input_modules>li:eq('+addChoice+')');
	element.siblings('li').hide();
	element.slideDown();
});

$("#select_addChoice").on("change",function(){
	if ($(this).parents('#div_addChoice').is(":visible")){
		var addChoice = $("#select_addChoice option:selected").index(); 
		var element = $('#input_modules>li:eq('+addChoice+')');
		element.siblings('li').hide();
		element.slideDown();
	} 
});

$('.input .btn_cancel').on("click",function(){
	$('#input_modules').slideUp();
	$('#div_addChoice').slideUp();
});

$('.input').on("click",'.channel_timestamp',function(){
	var that = $(this).parents('li').find('.channel_title');
	if (that.next('.timestampinput').length ==0){
		$("<span class='fa fa-clock-o timestampinput' title='this input is a time-stamp'></span>").insertAfter(that);
		$(this).children('span').removeClass("fa-clock-o");
		$(this).children('span').addClass("fa-times-circle-o");
		$(this).attr('title','set this input as none time-stamp');
		InputNms[that.text()]="timestamp";
		timestampData.push(that.text());
		VM_timeStampInputs.availableTimeStamps(timestampData);
	}else{
		that.next('.timestampinput').remove();
		$(this).children('span').addClass("fa-clock-o");
		$(this).children('span').removeClass("fa-times-circle-o");
		$(this).attr('title','set this input as a time-stamp');
		InputNms[that.text()] = "";
		timestampData.splice(timestampData.indexOf(that.text()),1);
		VM_timeStampInputs.availableTimeStamps(timestampData);
	}
});

});

