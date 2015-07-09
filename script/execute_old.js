$(document).ready(function() {

$('#btn_stpallalgo').attr("disabled", "disabled");
$('.logic_stop').attr("disabled","disabled");

$('#btn_exeallalgo').on("click",function(){
	ExeAllLogics();
	$('#btn_stpallalgo').removeAttr("disabled");
	$('#btn_exeallalgo').attr("disabled", "disabled");
});

$('#btn_stpallalgo').on("click",function(){
	StpAllLogics();
	$('#btn_exeallalgo').removeAttr("disabled");
	$('#btn_stpallalgo').attr("disabled", "disabled");
});

$('#algo_logics').on("click",'.logic_execute',function(){
	ExeLogic($(this).closest('.algo_module'));
	$(this).attr("disabled","disabled");
	$(this).closest('.algo_module').find('.logic_stop').removeAttr("disabled");
});

$('#algo_logics').on("click",'.logic_stop',function(){
	StpAllLogics();
	$(this).attr("disabled","disabled");
	$(this).closest('.algo_module').find('.logic_execute').removeAttr("disabled");
});

function ExeLogic(algoLi){
	algorithms=[];
	var algorithm = compileLogic(algoLi);
	algorithms.push(algorithm);
	executeLogic(algorithm);
}

function StpAllLogics(){
	algorithms.every(function(algorithm,index,array){
		stopLogic(algorithm);
		return true;
	});
}

function ExeAllLogics(){
	algorithms=[];
	var algorithm;
	var index=1;
	//compile the logic
	$('#algo_logics li').each(function(){
		algorithm = compileLogic($(this));
		//copy algorithm into algorithms
		algorithms.push(algorithm);
		
		 //next algorithm
		index++;
		return true;
	});
	
	//execute each algorithm
	algorithms.every(function(algorithm,index,array){
		executeLogic(algorithm);
		return true; //next algorithm
	});
}

function compileLogic(LogicList){
		var algorithm=[];
		algorithm["inputs"]=[];
		algorithm["outputs"]=[];
		
		//prepare the inputs outputs and formula
		var etdAlgo = LogicList.find('.txt_logic').val();
		var variables=[];
		variables = etdAlgo.match(/\[(.*?)\]/gm);
		variables.every(function(element,eindex,array){
			elementNm=element.substring(1,element.length-1);
			if (element.indexOf("/")>-1){re_element = element.replace(/\//g,'\\/');}
			else {re_element = element;}
			re_element = re_element.replace(/\[/g,'\\[');
			re_element = re_element.replace(/\]/g,'\\]');
			var re = new RegExp(re_element,"g"); //a regular expression object
			if (inputData[elementNm] != undefined){//the current element is an input
				etdAlgo = etdAlgo.replace(re,'parameters["'+elementNm+'"]');
				algorithm["inputs"][elementNm]=null;
				//algorithm["inputs"].push(elementNm);
			}
			if (usedOutputChannels[elementNm]!= undefined){//the current element is an output
				etdAlgo = etdAlgo.replace(re,'results["'+elementNm+'"]');
				//algorithm["outputs"].push(elementNm);
				algorithm["outputs"][elementNm]=null;
			}
			return true;
		});
		etdAlgo = "var results=[];"+etdAlgo+"return results;";
		var fThat = new Function('parameters',etdAlgo);
		algorithm["function"]=fThat;
		
		//prepare the interval
		var vInterval = 1000;
		algorithm["interval"]=vInterval;
		
		return algorithm;
}

function executeLogic(algorithm){
		var outputs=[];
		var vThis = [];
		var i=[];
		
		algorithm["timer"]=
			setInterval(function(){
			for (var key in algorithm["inputs"]){
				if(!i[key]){i[key]=0;} //initiate
				if (i[key]>=inputData[key].length){i[key]=0;} //reset
				if (typeof inputData[key][i[key]] == 'function'){vThis[key]=inputData[key][i[key]]();}
				else {vThis[key]=inputData[key][i[key]].toLowerCase();}
				i[key]++;
			}	
			outputs = algorithm["function"](vThis);
			for (var key in algorithm["outputs"]){
				var channelThat = usedOutputChannels[key];
				var currentJSON = channelThat[3]+outputs[key]+"}";
				if (channelThat[0] == "int"){HTMLcall(channelThat[0],channelThat[1],channelThat[2],currentJSON);}
				if (channelThat[0] == "ext"){HTMLcall(channelThat[0],channelThat[1],channelThat[2],currentJSON,channelThat[4]);}
			}
			
			},algorithm["interval"]);
}

function stopLogic(algorithm){
	clearInterval(algorithm["timer"]);
}

//exact match
$.expr[':'].containsexactly = function(obj, index, meta, stack) 
{  
    return $(obj).text() === meta[3];
}; 

});