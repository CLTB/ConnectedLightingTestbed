//make the NYC station list selectable
$( document ).ready(function() {
var available_NYCTraffic={
1:"#1 - 11th ave n ganservoort - 12th ave @ 40th st",
2:"#2 - 11th ave s ganservoort - west st @ spring st",
3:"#3 - 12th ave @ 45th - 11 ave ganservoort st",
4:"#4 - 12th Ave N 40th - 57th St",
106:"#106 - 12th Ave S 57th St - 45th St",
107:"#107 - 278 E BRUNSWICK AVENUE - SIE E SOUTH AVENUE",
108:"#108 - 278 E BRUNSWICK AVENUE - WSE S SOUTH AVENUE",
110:"#110 - 440 N FRANCIS STREET - WSE N TYRELLAN AVE",
119:"#119 - BBT E Manhattan Portal - Toll Plaza",
122:"#122 - BBT Manhattan Portal inbound - West St N Watts St",
123:"#123 - BBT Manhattan Portal inbound - West St S Battery Place",
124:"#124 - BBT W Toll Plaza - Manhattan Portal",
129:"#129 - BE N STRATFORD AVENUE - CASTLE HILL AVE",
137:"#137 - BE S CASTLE HILL AVENUE - STRATFORD AVENUE",
140:"#140 - BE S TBB EXIT RAMP - MANHATTAN LIFT SPAN",
141:"#141 - BE S TBB EXIT RAMP - QUEENS ANCHORAGE",
145:"#145 - BKN Bridge Manhattan Side - FDR N Catherine Slip",
148:"#148 - BQE N ATLANTIC AVENUE - LEONARD STREET",
149:"#149 - BQE N Atlantic Ave - BKN Bridge Manhattan Side",
150:"#150 - BQE N Atlantic Ave - MAN Bridge Manhattan Side",
153:"#153 - BQE N LEONARD STREET - 46TH STREET",
154:"#154 - BQE S - GOW S ALTANTIC AVENUE - 9TH STREET",
155:"#155 - BQE S 46TH STREET - LEONARD STREET",
157:"#157 - BQE S LEONARD STREET - ATLANTIC AVENUE",
159:"#159 - BRP N WATSON AVENUE - FORDHAM ROAD ",
160:"#160 - BRP S FORDHAM ROAD - WATSON AVENUE",
164:"#164 - BWB N Queens Anchorage - Toll Plaza ",
165:"#165 - BWB N Toll Plaza - HRP N Lafayatte Ave",
167:"#167 - BWB S Queens Anchorage - WSE S Exit 14 (Linden Pl)",
168:"#168 - BWB S Toll Plaza - Queens Anchorage",
169:"#169 - Belt Pkwy E 182nd St - Laurelton Pkwy N @ SSP",
170:"#170 - Belt Pkwy W 182nd St - JFK Expressway",
171:"#171 - Belt Pkwy W JFK Expressway - VWE N Jamaica Ave",
172:"#172 - CBE AMSTERDAM AVE (L/LVL) - MORRIS AVE",
177:"#177 - CBE E AMSTERDAM AVE(U/LVL) - MORRIS AVE",
178:"#178 - CBE E CASTLE HILL AVE - BE N WATERBURY AVE",
184:"#184 - CBE E TAYLOR AVENUE - CASTLE HILL AVENUE",
185:"#185 - CBE W CASTLE HILL AVENUE - TAYLOR AVENUE",
186:"#186 - CBE W L/LE V AMSTERDAM AVE - I 95 S LOC LNS",
190:"#190 - CBE W MORRIS AVE - GWB W AMSTERDAM AVE (L/LVL)",
191:"#191 - CBE W MORRIS AVE - GWB W AMSTERDAM AVE (U/LVL)",
195:"#195 - CBE W U/LEV AMSTERDAM AVE - I95 S EXP LNS",
199:"#199 - CIP N Hempstead Tpk - LIE",
204:"#204 - CIP N TNB - Whitestone Expwy S Exit 14 (Linden Pl)",
205:"#205 - CIP NB GCP - TNB",
207:"#207 - CIP S Hempstead Tpk - Laurelton Pkwy @ SSP",
208:"#208 - CIP S LIE - Hempstead Tpk",
211:"#211 - CVE NB GCP - WILLETS PT BLVD",
212:"#212 - CVE NB LIE - WILLETS PT BLVD",
213:"#213 - FDR N - TBB E 116TH STREET - MANHATTAN TRUSS",
215:"#215 - FDR N 25th - 63rd St",
217:"#217 - FDR N Catherine Slip - 25th St",
221:"#221 - FDR S 25th St - Catherine Slip",
222:"#222 - FDR S 63rd - 25th St",
223:"#223 - FDR S Catherine Slip - BKN Bridge Manhattan Side",
224:"#224 - FDR S Catherine Slip - Whitehall St",
225:"#225 - FDR S Whitehall St - BBT Manhattan Portal outbound",
257:"#257 - GOW N 7TH AVENUE - 9TH STREET",
258:"#258 - GOW N 92ND STREET - 7TH AVENUE",
259:"#259 - GOW N 9TH STREET - ATLANTIC AVENUE",
261:"#261 - GOW S 7TH AVENUE - 92ND STREET",
262:"#262 - GOW S 9TH STREET - 7TH AVENUE",
263:"#263 - GOW S VNB W 92ND STREET - BKLYN GANTRY LOWER LEVEL",
264:"#264 - GOW S VNB W 92ND STREET - BKLYN GANTRY UPPER LEVEL",
265:"#265 - GWB E LOWER LEVEL PLAZA - CBE E LOWER LEVEL AMSTERDAM AVE",
295:"#295 - HRP N LAFAYETTE AVENUE - E TREMONT AVENUE",
298:"#298 - HRP S Lafayette Ave - BWB S Toll Plaza",
311:"#311 - LIE E 84TH ST - 108TH ST",
313:"#313 - LIE E QMT TOLL PLAZA - 84TH ST",
315:"#315 - LIE W 108TH ST - 84TH ST",
316:"#316 - LIE W 84TH ST - QMT TOLL PLAZA",
318:"#318 - LIE WB LITTLE NECK PKWY - NB CIP",
319:"#319 - LIE WB LITTLE NECK PKWY - NB CVE",
324:"#324 - LINCOLN TUNNEL E CENTER TUBE NJ - NY",
325:"#325 - LINCOLN TUNNEL E SOUTH TUBE - NJ - NY",
329:"#329 - LINCOLN TUNNEL W CENTER TUBE NY - NJ",
330:"#330 - LINCOLN TUNNEL W NORTH TUBE NY - NJ",
331:"#331 - Laurelton Pkwy N @ SSP - CIP N Hempstead Tpk",
332:"#332 - Laurelton Pkwy S @ SSP - Belt Pkwy W 182nd St",
339:"#339 - MDE N VAN CORTLAND PARK - NYST N EXIT 1 (MP.48)",
344:"#344 - MDE S HARLEM RIVER PARK - GWB W AMSTERDAM AVENUE LOWER LEVEL",
345:"#345 - MDE S HARLEM RIVER PARK - GWB W AMSTERDAM AVENUE UPPER LEVEL",
347:"#347 - MDE S TBB EXIT RAMP - QUEENS ANCHORAGE",
349:"#349 - MLK N WALKER STREET - NJ ROUTE 169",
350:"#350 - MLK S - SIE E WALKER STREET - WOOLEY AVENUE",
351:"#351 - MLK S - SIE W WALKER STREET - RICHMOND AVENUE",
364:"#364 - QMT E Manhattan Side - Toll Plaza",
365:"#365 - QMT W Toll Plaza - Manhattan Side",
369:"#369 - ROUTE 169 S - MLK WALKER STREET",
375:"#375 - SIE E BRADLEY AVENUE - CLOVE ROAD",
376:"#376 - SIE E CLOVE ROAD - FINGERBOARD ROAD",
377:"#377 - SIE E RICHMOND AVENUE - WOOLEY AVENUE",
378:"#378 - SIE E SOUTH AVENUE - RICHMOND AVENUE",
379:"#379 - SIE E VNB E FINGERBOARD ROAD - SI GANTRY LOWER LEVEL",
380:"#380 - SIE E VNB E FINGERBOARD ROAD - SI GANTRY UPPER LEVEL",
381:"#381 - SIE E WOOLEY AVENUE - BRADLEY AVENUE",
382:"#382 - SIE E-MLK N RICHMOND AVENUE - WALKER STREET",
383:"#383 - SIE W - MLK N WOOLEY AVENUE - WLAKER STREET",
384:"#384 - SIE W - WSE S SOUTH AVENUE - SOUTH AVENUE",
385:"#385 - SIE W BRADLEY AVENUE - WOOLEY AVENUE",
387:"#387 - SIE W FINGERBOARD ROAD - CLOVE ROAD",
388:"#388 - SIE W RICHMOND AVENUE - SOUTH AVENUE",
389:"#389 - SIE W SOUTH AVENUE - 278 W BRUNSWICK AVENUE",
390:"#390 - SIE W WOOLEY AVENUE - RICHMOND AVENUE",
394:"#394 - TBB N QUEENS ANCHORAGE - BE N",
395:"#395 - TBB N QUEENS ANCHORAGE - MANHATTAN LIFT SPAN",
398:"#398 - TBB S MANHATTAN LIFT SPAN - QUEENS ANCHORAGE",
399:"#399 - TBB W - FDR S MANHATTAN TRUSS - E116TH STREET",
402:"#402 - TNB N Queens Anchorage - Toll Plaza",
405:"#405 - TNB S Qns Anchorage - CIP S @ TNB",
406:"#406 - TNB S Toll Plaza - Queens Anchorage",
410:"#410 - VNB E SI GANTRY LOWER LEVEL - BROOLKYN GANTRY LOWER LEVEL",
411:"#411 - VNB E SI GANTRY UPPER LEVEL - BROOKLYN GANTRY UPPER LEVEL",
412:"#412 - VNB E-GOWANUS N BROOKLYN GANTRY LOWER LEVEL - 92ND STREET",
413:"#413 - VNB E-GOWANUS N BROOKLYN GANTRY UPPER LEVEL - 92ND STREET",
416:"#416 - VNB W BROOKLYN GANTRY LOWER LEVEL - SI GANTRY LOWER LEVEL",
417:"#417 - VNB W BROOKLYN GANTRY UPPER LEVEL - SI GANTRY UPPER LEVEL",
418:"#418 - VNB W-SIE W SI GANTRY LOWER LEVEL - FINGERBOARD ROAD",
419:"#419 - VNB W-SIE W SI GANTRY UPPER LEVEL - FINGERBOARD ROAD",
422:"#422 - VWE N MP4.63 (Exit 6 - Jamaica Ave) - MP6.39 (Exit 11 Jewel Ave)",
423:"#423 - VWE N MP6.39 (Exit 11 Jewel Ave) - MP8.65 (Exit 13 Northern Blvd)",
424:"#424 - VWE N MP8.64 (Exit 13 Northern Blvd) - Whitestone Expwy Exit 14 (Linden Pl)",
425:"#425 - VWE S MP2.66 (Exit 2 Rockaway Blvd) - Belt Pkwy E 182nd St",
426:"#426 - VWE S MP4.63 (Exit 6 Jamaica Ave) - MP2.66 (Exit 2 Roackaway Blvd)",
427:"#427 - VWE S MP6.39 (Exit 11 Jewel Ave) - MP4.63 (Exit 6 Jamaica Ave)",
428:"#428 - VWE S MP8.65 (Exit 13 Northern Blvd) - MP6.39 (Exit 11 Jewel Ave)",
430:"#430 - WSE N ARDEN AVENUE - VICTORY BLVD",
431:"#431 - WSE N BLOOMUINGDALE ROAD - ARDEN AVENUE",
432:"#432 - WSE N SOUTH AVENUE - 278 W BRUNSWICK AVENUE",
433:"#433 - WSE N TYRELLAN AVENUE - BLOOMINGDALE ROAD",
434:"#434 - WSE N VICTORY BLVD - SOUTH AVENUE",
435:"#435 - WSE N-SIE E SOUTH AVENUE - SOUTH AVENUE",
436:"#436 - WSE S ARDEN AVENUE - BLOOMINGDALE ROAD",
437:"#437 - WSE S BLLOMINGDALE ROAD - TYRELLAN AVENUE",
439:"#439 - WSE S SOUTH AVENUE - VICTORY BOULEVARD",
440:"#440 - WSE S TYRELLAN AVENUE - 440 S FRANCIS STREET",
441:"#441 - WSE S VICTORY BOULEVARD - ARDEN AVENUE",
442:"#442 - West St N Whitehall - Watts St",
443:"#443 - West St S Battery Pl - BKN Bridge Manhattan Side",
444:"#444 - West St S Battery Pl - FDR N Catherine Slip",
445:"#445 - West St S Spring St - BBT Manhattan Portal outbound",
446:"#446 - West St S Spring St - Battery Pl",
447:"#447 - West St Watts St - 11th Ave Ganesvoort",
448:"#448 - Westside Hwy N 57th St - GWB",
450:"#450 - Westside Hwy S GWB - 57th St",
451:"#451 - Whitestone Expwy N Exit 14 (Linden Pl) - BWB N Queens Anchorage",
453:"#453 - Whitestone Expwy S Exit 14 (Linden Pl) - VWE S MP8.65 (Exit 13 Northern Blvd)",
206:"#206 - CIP N LIE ramp - TNB",
354:"#354 - I-87 NYST S Exit 1 - MDE S Van Cortlandt Park",
202:"#202 - CIP N ramp to TNB - TNB Queens Anchorage",
142:"#142 - BE S Griswold - Castle Hill Avenue",
126:"#126 - BE N Castle Hill Avenue - Griswold Ave",
338:"#338 - MDE N RFK Bridge - 142nd St"
};
for (var id in available_NYCTraffic){//for each available section
//make an option in the module list
	if (available_NYCTraffic.hasOwnProperty(id)){
		var listItem = document.createElement("li");
    	listItem.innerHTML = available_NYCTraffic[id];
    	listItem.value = id;
    	
		$('#ul_NYCTraffic_station').append(listItem);
		$('#ul_NYCTraffic_station>li:last-child').addClass("ui-widget-content");
		if ($('#ul_NYCTraffic_station>li').length==1)$('#ul_NYCTraffic_station>li:last-child').addClass("list_firstelement");
	}
}

var selected_NYCTraffic=[];

$(function() {
    $( "#ul_NYCTraffic_station" ).selectable({
      stop: function() {
        selected_NYCTraffic.length = 0;//clear the array
        $( ".ui-selected", this ).each(function() {
          selected_NYCTraffic.push(this.value );
        });
      }
    });
});
  
$(".input").on("click", '.btn_NYCTrafficload',function(){
	if (selected_NYCTraffic.length > 0){
    	var sourceLbl = document.createElement("div");
        sourceLbl.innerHTML = "<label>NYC Real-time Traffic Speed</label>";
		$('#input_channels').append(sourceLbl);
		$('#input_channels>div:last-child').addClass("input_source changeWithPanel NYCtraffic_input loaded_channel");
		var sourceUl = document.createElement("ul");
		$('#input_channels').append(sourceUl);
	
		selected_NYCTraffic.every(function(element,index,array){//for each selected station
			inputData["NYCTraffic_"+element]=[];
		
			var listItem = document.createElement("li");
			var channelnm = $( "#ul_NYCTraffic_station li[value='"+element+"']" ).text();
     	    listItem.innerHTML = 
				"		<div>"+
				"			<a class='channel_title'>"+channelnm+"</a>"+
				"			<button class='channel_delete' type='button'> - delete </button>"+
				"			<button class='channel_timestamp' type='button' title='set the input as a time-stamp'><span class='fa fa-clock-o'></span></button>"+
				"			<label class='channel_origin'>NYC_Traffic</label>"+
				"			<label class='channel_parameter NYCstationid'>" + element + "</label>" +
				"		</div>";
			$('#input_channels>ul:last-child').append(listItem);
			$('#input_channels>ul:last-child>li:last-child').addClass("NYCTraffic_channel active");
			$('#input_channels>ul:last-child>li:last-child .channel_origin').hide();
			$('#input_channels>ul:last-child>li:last-child .channel_parameter').hide();
				
			InputNms["NYCTraffic_"+element]="rt";//the real-time input data
		
			return true;
		});
		
					
		$('.input').removeClass('active');
		$('.input').find('.panel_title').addClass('active');
		$('.input').find('.vertical_bar').addClass('active');
		$('.input').find('#lbl_inputchannels').text("Available Data:");
		
		$('#div_addChoice').slideUp();	
    	$('#input_modules').slideUp();
	}
});
  
  
});

function rt_fetchNYC(){
	var output;
	var http = new XMLHttpRequest();
    http.open("GET", "http://207.251.86.229/nyc-links-cams/LinkSpeedQuery.txt", true);
    http.onreadystatechange = function(){
            if(http.readyState == 4){
            	if(http.status==200){
                	output = "Bad JSON: "+http.responseText;
                    output = http.responseText.match(/\w+|"[^"]+"/g);
                   	var org_output=[];
                    var org_row = [];
                    var org_id;
                    output.every(function(element,index,array){
                    	if (index%13==0){
                    		if (org_row.length>0) org_output[org_id]=org_row;
                    		org_row = [];
                    		org_id = "NYCTraffic_"+element.slice(1,element.length-1);
                    	}else{
                    		org_row.push(element);
                    	}
                    	return true;
                    });
            	fetched_NYC = org_output;
            	
            	for (var key in inputData){
            		if (key.includes("NYCTraffic")){
            			var cv = fetched_NYC[key][0];
            			cv = cv.slice(1,cv.length-1);
            			inputData[key]=Number(cv);
            		}
				}
       		}else{
            	output = "Error "+http.status;
        	}
        }
    }
    http.send();
}

