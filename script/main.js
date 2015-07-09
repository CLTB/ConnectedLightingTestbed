inputData=["this input"];
realtimeData=[];
timestampData=["a recorded time stamp input"];

var VM_timeStampInputs = {availableTimeStamps: ko.observableArray(timestampData)}
var VM_Inputs          = {availableInputs: ko.observableArray(inputData)}

$(document).ready(function() {

$('.vertical_bar').hide();

$(document).on('click','.inactive',function(){	
	var maxHeight = Math.max.apply(Math, $(".vertical_content").map(function() { return $(this).height(); }));
	maxHeight = (maxHeight>220)?maxHeight:220;

	var thisPanel;
	if ($(this).is('.panel')){
		thisPanel = $(this);
		thisPanel.switchClass('inactive','active');	
	}
	else {
		thisPanel = $(this).closest('.panel');
		$(this).switchClass('inactive','active');
	}
	
		thisPanel.siblings('.active').switchClass('active','inactive');	
		thisPanel.siblings('.panel').find('.panel_title').switchClass('active','inactive');	
		thisPanel.siblings('.panel').children('.vertical_bar').switchClass('active','inactive');

		var minWidth = 0;
		thisPanel.siblings('.panel').each(function(){
			if ($(this).find('.div_loaded_channel').find('li').length>0){
				$(this).css('min-width','250px');
				minWidth += 250;
				$(this).find('.div_loaded_channel').find('.channel_delete').hide();
				$(this).find('.div_loaded_channel').find('.channel_timestamp').hide();
				var hideDirection;
				$(this).animate({width:'250px'}, {direction:"left",duration:500, queue:false});
			}else{
				$(this).css('min-width','50px');
				minWidth += 50;
				//$(this).find('.div_loaded_channel').find('.channel_delete').show();
				$(this).find('.vertical_bar').show();
				$(this).find('.vertical_content').hide();
				$(this).animate({width:'50px'}, {direction:"left",duration:500, queue:false});
			}
			$(this).height($(this).find('.vertical_content').height()>220?$(this).find('.vertical_content').height():220);
		});
		var fullwidth = ($(document).width()-minWidth)/$(document).width()*98;
		
		
		thisPanel.height("auto");
		thisPanel.find('.div_loaded_channel').find('.channel_delete').show();
		thisPanel.find('.div_loaded_channel').find('.channel_timestamp').show();
		thisPanel.find('.vertical_bar').hide()
		thisPanel.find('.vertical_content').show();
		thisPanel.animate({
			width: fullwidth+"%"
		}, {
			duration:500, 
			queue:false,
			complete:function(){
				if ($(this).hasClass('algorithm')){
					algorithm_txt_size_adjust(fullwidth/100*$(document).width());
			}
		}
		});
});

window.onresize = function(event) {
	var activePanel;
	var activeObj = $(".panel[class*=' active']");
	if (activeObj.length == 0){
		activeObj = $(".panel_title[class*=' active']");
		activePanel = activeObj.closest('panel');
	}else{
		activePanel = activeObj;
	}
	
	var minWidth = 0;
	activePanel.siblings('.panel').each(function(){
		if ($(this).find('.channel_title').length>0){
			minWidth += 200;
		}else{
			minWidth += 50;
		}
	});
	var fullwidth = ($(document).width()-minWidth)/$(document).width()*98;
	activePanel.width(fullwidth+"%");
	//$('.active').find('.changeWithPanel').width(fullwidth+"%");
	//$(this).find('.changeWithPanel').width(fullwidth/100*$(document).width());
	
	algorithm_txt_size_adjust($('.algorithm').width());
}

$('.panel').find('.div_loaded_channel').on("ContentChanged",function(){
	var panel = $(this).parents('.panel');
	var currentlabel = panel.find('.lbl_loaded_channel')
	if(panel.find('.channel_title').length==0){
		if (panel.hasClass('input')) {currentlabel.text("No Input Data has been added.");$('#btn_rcdinput').attr('disabled','disabled');}
		if (panel.hasClass('output')) currentlabel.text("No Output Channel has been added.");
		if (panel.hasClass('algorithm')) currentlabel.text("No Algorithm has been added.");
	}
	else{
		if (panel.hasClass('input')) {currentlabel.text("Available Data:");$('#btn_rcdinput').removeAttr('disabled');}
		if (panel.hasClass('output')) currentlabel.text("Available Channel:");
		if (panel.hasClass('algorithm')) currentlabel.text("Available Algorithm:");
	}
});

$(".panel").on("click", '.channel_delete',function(){
	var panel = $(this).parents('.panel');
	var currentlabel = panel.find('.lbl_loaded_channel')
	var parentli =$(this).closest('li');
	var parentul= $(this).closest('ul');
	if (parentli.siblings('li').length == 0 && !parentul.is('#algo_logics')){
		parentul.prev('.loaded_channel').remove();
		parentul.remove();
	}
	else {
		if (parentul.is('#algo_logics'))parentli.next('.algo_config').remove();
		parentli.remove();
		if (parentul.is('#algo_logics')){
			//re-index
			var i = 1;
			$('#algo_logics').find('.algo_module').each(function(){
				if ($(this).hasClass('algo_module_script')){
					$(this).find('.txt_logic').attr('placeholder','type logic '+i+' here.');
					$(this).next('.algo_config').find('.timing_ctl_idx').text(i);
				}
				else{
					$(this).next('.algo_config').find('.timing_ctl_idx').text(i);
				}
				i++;
			});
		}
	}
	
	if(panel.find('.channel_title').length==0){
		if (panel.hasClass('input')) currentlabel.text("No Input Data has been added.");
		if (panel.hasClass('output')) currentlabel.text("No Output Channel has been added.");
		if (panel.hasClass('algorithm')) currentlabel.text("No Algorithm has been added.");
		
		panel.addClass('active');
		panel.find('active').switchClass('active','inactive');
	}
	
	//delete the values in the "inputData" "usedOutputChannels" and "variableNms"
	if (panel.hasClass('input')){
		var nm = $(this).siblings('.channel_title').text();
		delete inputData[nm];
		if (InputNms[nm] == "timestamp")timestampData.splice(timestampData.indexOf(nm),1);
		delete InputNms[nm];
	}
	if (panel. hasClass('output')){
		$(this).hasClass('output_lamp_delete');
		$(this).siblings('.channel_title').each(function(){
			delete usedOutputChannels[$(this).text()];
			delete OutputNms[$(this).text()];
		});
		
	}
});

$('.panel').on("click",'.channel_title',function(){
	if(lastFocusedAlgoTxt == null){
		swal("No Algorithm created.","create an algorithm to add channels to.")
	}
	else{
		var newinput = "["+$(this).text()+"]";
		if ($(this).siblings('.channel_origin').text()=='NYC_Traffic') newinput = "[NYCTraffic_"+$(this).siblings('.channel_parameter').text()+"]";
		lastFocusedAlgoTxt.val(lastFocusedAlgoTxt.val()+newinput);
	}
	lastFocusedAlgoTxt.trigger("click");
});

});

var inputContent;
var algoContent;
var outputContent;

! function () {

    $(document).on('click',function () {
        var $ulinput = $('#input_channels');
        var $ulalgo = $('#algo_logics');
        var $uloutput = $('#output_channels');
        if(inputContent !== $ulinput.html() ||algoContent !== $ulalgo.html()||outputContent != $uloutput.html() ){
            inputContent = $ulinput.html();
            algoContent  = $ulalgo.html();
            outputContent = $uloutput.html();
            $ulinput.trigger('ContentChanged');
            $ulalgo.trigger('ContentChanged');
            $uloutput.trigger('ContentChanged');
        }
    });
    $(document).ajaxStop(function () {
        var $ulinput = $('#input_channels');
        var $ulalgo = $('#algo_logics');
        var $uloutput = $('#output_channels');
        if(inputContent !== $ulinput.html() ||algoContent !== $ulalgo.html() ||outputContent != $uloutput.html() ){
            inputContent = $ulinput.html();
            algoContent  = $ulalgo.html();
            outputContent = $uloutput.html();
            $ulinput.trigger('ContentChanged');
            $ulalgo.trigger('ContentChanged');
            $uloutput.trigger('ContentChanged');
        }
    });
}();


var lastFocusedAlgoTxt=null;

function algorithm_txt_size_adjust(algo_panel_width){
		if (algo_panel_width>400){
			$('.algorithm').find('.div_logic').width(algo_panel_width-190);
			$('.algorithm').find('.fa').hide();$('.algorithm').find('.re').show();
			$('.div_config_summary').show();
			$('.logic_button').width(58);
		}else{
			$('.algorithm').find('.div_logic').width(algo_panel_width-40);
			$('.fa').show();$('.re').hide();
			$('.div_config_summary').hide();
			$('.logic_button').width(8);
		}
		$('.algorithm').find('.txt_logic').width($('.div_logic').width()-25);
}