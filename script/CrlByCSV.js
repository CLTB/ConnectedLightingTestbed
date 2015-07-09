$( document ).ready(function() {
//change to http://papaparse.com/ someday
var csv;
CSV_values=[];

var inputType = "string";
var stepped = 0, rowCount = 0, errorCount = 0, firstError;
var start, end;
var firstRun = true;
var maxUnparseLength = 10000;
var firstline=false;

//when the csv load button click: 
//read the file and save the values in "values" variable with headers as keys 
//list the variables as available inputs
$(".input").on("click", '.btn_csvload',function(){
	
	stepped = 0;
	rowCount = 0;
	errorCount = 0;
	firstError = undefined;
	
	//because read.csv is in utils
	//ocpu.seturl("http://public.opencpu.org/ocpu/library/utils/R")
	var $sub_btn = $(this);
	var $file_ipt = $sub_btn.siblings('input[type=file]');
    myfile = $file_ipt[0].files[0];
        
    if(!$file_ipt[0].files.length){
        alert("No file selected.");
        return;
    }

    //disable the button during upload
    $sub_btn.attr("disabled", "disabled");
    
    //use Papa Parse to preview the headers
    $file_ipt.parse({
    	config:{
    		header:true,
    		worker:false,
    		complete:completeFn,
    		error:errorFn
    	},
    	before: function(file,inputElem){
    		firstline = true;
    		start = now();
    		console.log("Parsing file...", file);
    	},
    	complete: function()
    	{
    		end = now();
    		printStats("Done with all files");
    		//enable button
    		$sub_btn.removeAttr("disabled");
    		$('#div_addChoice').slideUp();	
    		$('#input_modules').slideUp();
    	}
    });
});

function completeFn(results,file)
{
	end = now();

	if (results && results.errors)
	{
		if (results.errors)
		{
			errorCount = results.errors.length;
			firstError = results.errors[0];
		}
		if (results.data && results.data.length > 0)
			rowCount = results.data.length;
			
			addInputChannels(results.data,file);
	}

	printStats("Parse complete");
	console.log("    Results:", results);

}

function errorFn(err, file)
{
	end = now();
	console.log("ERROR:", err, file);
	enableButton();
}

function printStats(msg)
{
	if (msg)
		console.log(msg);
	console.log("       Time:", (end-start || "(Unknown; your browser does not support the Performance API)"), "ms");
	console.log("  Row count:", rowCount);
	if (stepped)
		console.log("    Stepped:", stepped);
	console.log("     Errors:", errorCount);
	if (errorCount)
		console.log("First error:", firstError);
}


function now()
{
	return typeof window.performance !== 'undefined'
			? window.performance.now()
			: 0;
}


function addInputChannels(data,file){		    		
    		//prepare the source name label
    		var sourceLbl = document.createElement("div");
        	sourceLbl.innerHTML = "<label>" + file.name + "</label>";
			$('#input_channels').append(sourceLbl);
			$('#input_channels>div:last-child').addClass("input_source changeWithPanel csv_input loaded_channel");
			var sourceUl = document.createElement("ul");
			$('#input_channels').append(sourceUl);
			
			//read in headers
			Object.keys(data[0]).every(function(header){
				
				if (inputData[header] != null){
					var i = 1;
					var newHeader = header+"-"+i;
					do{
						newHeader = header+"-"+i;
						i++;
					}while(inputData[newHeader] != null)
					var re= new RegExp('"'+header+'":',"g");
					data = JSON.parse(JSON.stringify(data).replace(re,'"'+newHeader+'":'));
					header = newHeader;
				}
				
				inputData[header]=[];
			
				var listItem = document.createElement("li");
        		listItem.innerHTML = 
					"		<div>"+
					"			<a class='channel_title'>"+header+"</a>"+
					"			<button class='channel_delete' type='button'> - delete </button>"+
					"			<button class='channel_timestamp' type='button' title='set the input as a time-stamp'><span class='fa fa-clock-o'></span></button>"+
					"			<label class='channel_origin'>"+ file.name + "</label>"+
					"			<label class='channel_parameter csvindex'>" + header + "</label>" +
					"		</div>";
				$('#input_channels>ul:last-child').append(listItem);
				$('#input_channels>ul:last-child>li:last-child').addClass("csv_channel active");
				$('#input_channels>ul:last-child>li:last-child .channel_origin').hide();
				$('#input_channels>ul:last-child>li:last-child .channel_parameter').hide();
				
				InputNms[header]="";
				
				return true;

			});	
			
			var f_timestampcheck = true;
			data.forEach(function(row){
				$.each(row,function(header,cell){
					inputData[header].push(cell);
					if (Date.parse(cell)){}
				});
			});
			
			$('.input').removeClass('active');
			$('.input').find('.panel_title').addClass('active');
			$('.input').find('.vertical_bar').addClass('active');
			$('.input').find('#lbl_inputchannels').text("Available Data:");
}

});