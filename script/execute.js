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
		algorithm["mode"]="at";//default setting
		var vInterval = 1000; //default setting
		algorithm["interval"]=vInterval; //default setting
		//read the actual setting
		var ConfigList = LogicList.next('.algo_config');
		if (ConfigList.find('.timing_ctl').val()=="at"){
			var num = ConfigList.find('.at_option').find('.timing_opt').val();
			var sel = ConfigList.find('.at_option').find('.timing_txt').val();
			if (sel == "se"){vInterval = num * 1000;}
			else if (sel == "mi"){vInterval = num * 60 * 1000;}
			else if (sel == "hr"){vInterval = num * 360 * 1000;}
			algorithm["mode"]="at"; //overwrite
			algorithm["interval"]=vInterval; //overwrite
		}
		else if (ConfigList.find('.timing_ctl').val()=="when"){
		}
		else if (ConfigList.find('.timing_ctl').val()=="to"){
			var inputNm = ConfigList.find('.to_option').find('.timing_recordedinput').val();
			var accRate = ConfigList.find('.to_option').find('.acc_opt').val();
			algorithm["mode"]="to"; //overwrite
			
			var last="";
			var current="";
			var aInterval=[];
			inputData[inputNm].every(function (element,index,array){
				if (last ==""){last=Date.parse(element);return true;}
				current = Date.parse(element); 
				aInterval.push((current-last)/accRate);
				last = current;
				return true;
			});
			algorithm["interval"]=aInterval; //overwrite
		}
		
		return algorithm;
}


function executeLogic(algorithm){
		var outputs=[];
		var vThis = [];
		var i=[];
		var f_fetchNYC=false;
		
		if (algorithm["mode"]=="at"){
		algorithm["timer"]=
			setInterval(function(){
			for (var key in algorithm["inputs"]){
				if (InputNms[key]=="rt"){//the input is real-time data
					i[key]=-1;
					if (key.includes("NYCTraffic")&&f_fetchNYC==false) {
						rt_fetchNYC();//call the data fetch algorithm
						f_fetchNYC = true;
					}
					vThis[key]=inputData[key];
				}else{//for all other non-real-time inputs
					if(!i[key]){i[key]=0;} //initiate
					if (i[key]>=inputData[key].length){i[key]=0;} //reset
					if (typeof inputData[key][i[key]] == 'function'){vThis[key]=inputData[key][i[key]]();}//forget what is this for
					else {vThis[key]=inputData[key][i[key]].toLowerCase();}
					i[key]++;
				}
			}	
			outputs = algorithm["function"](vThis);
			for (var key in algorithm["outputs"]){
				var channelThat = usedOutputChannels[key];
				var currentJSON = channelThat[3]+outputs[key]+"}";
				if (channelThat[2].includes('winkapi.quirky.com')) {currentJSON+='}';}
				if (channelThat[0] == "int"){HTMLcall(channelThat[0],channelThat[1],channelThat[2],currentJSON);}
				if (channelThat[0] == "ext"||channelThat[0] == "wink"){HTMLcall(channelThat[0],channelThat[1],channelThat[2],currentJSON,channelThat[4]);}
			}
			
			},algorithm["interval"]);
		}
		else if (algorithm["mode"]=="when"){

		
		}
		else if (algorithm["mode"]=="to"){
			var i_interval2=-1;
			function execute_mode_to(){
				i_interval2++;
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
					if (channelThat[2].includes('winkapi.quirky.com')) {currentJSON+='}';}
					if (channelThat[0] == "int"){HTMLcall(channelThat[0],channelThat[1],channelThat[2],currentJSON);}
					if (channelThat[0] == "ext"||channelThat[0] == "wink"){HTMLcall(channelThat[0],channelThat[1],channelThat[2],currentJSON,channelThat[4]);}
				}
				if (i_interval2>0){
					clearInterval(algorithm["timer"]);
					algorithm["timer"]=setInterval(function(){execute_mode_to()},algorithm["interval"][i_interval2]);
				}
				if (i_interval2>=algorithm["interval"].length){clearInterval(algorithm["timer"]);}
			}
			algorithm["timer"]=setInterval(function(){execute_mode_to()},algorithm["interval"][i_interval2]);
		}
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