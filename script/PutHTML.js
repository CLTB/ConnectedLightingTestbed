function putHTML2(lampIdx,on,bri,hue,sat)
{
    if (window.XMLHttpRequest)
    {
        var http = new XMLHttpRequest();
        http.open('PUT', 'http://192.168.0.100/api/newdeveloper/lights/'+ lampIdx + '/state', true);

        http.onreadystatechange = function()
        {
            if(http.readyState == 4)
            {
                if(http.status==200)
                {
                    $("#output").text("Bad JSON: "+http.responseText);
                    $("#output").text(JSON.stringify(JSON.parse(http.responseText), null, '\t'));
                }
                else
                {
                    $("#output").text("Error "+http.status);
                }
            }
        }
        
        var command =  '{"on":' + on;
        if (typeof hue != 'undefined') {command = command + ',"hue":' + hue;}
        if (typeof bri != 'undefined' && bri>=1 && bri <= 254) {command = command + ',"bri":' + bri;}
        if (typeof sat != 'undefined') {command = command + ',"sat":' + sat;}
        command = command + '}';
        
        http.send(command);
    }
    return false;
} 


function HTMLcall(mode,command,api,json,other)
{
    if (window.XMLHttpRequest)
    {
        var http = new XMLHttpRequest();
        	http.open(command, api, true);
        	
        if (mode=="ext"){
        	http.setRequestHeader("content-type","application/json");
    		http.setRequestHeader("document.domain",'client-eastwood-dot-hue-prod-us.appspot.com');
    		http.setRequestHeader("x-token",other);
        }
        
    	if (mode=="wink"){
        	http.setRequestHeader("Content-Type", "application/json");
        	http.setRequestHeader("Authorization", "bearer "+other);
        	http.setRequestHeader("document.domain",'clist.azurewebsites.net');
        }

        http.onreadystatechange = function()
        {
            if(http.readyState == 4)
            {
                if(http.status==200)
                {
                    $("#output").text("Bad JSON: "+http.responseText);
                    $("#output").text(JSON.stringify(JSON.parse(http.responseText), null, '\t'));
                }
                else
                {
                    $("#output").text("Error "+http.status);
                }
            }
        }
        
        http.send(json);
    }
   
    return false;
} 

var http;
function HueConnect(par1,par2,mode)
{	
	
    if (window.XMLHttpRequest)
    {
        http = new XMLHttpRequest();
        if (mode == "int"){
        	http.open('GET', 'http://' + par1 + '/api/' + par2 + '/lights', true);
			http.send("");
    	}
    	if (mode == "ext"){
    		http.open('GET','https://client-eastwood-dot-hue-prod-us.appspot.com/api/getbridge?token='+par2+'&bridgeid=' + par1, true);
    		http.setRequestHeader("content-type","application/x-www-form-urlencoded");
    		http.setRequestHeader("document.domain",'client-eastwood-dot-hue-prod-us.appspot.com');
    		http.send("");
    	}
    }
} 

function WinkConnect(usnm, pswd, c_id, c_secret)
{	
	
    if (window.XMLHttpRequest)
    {
        http = new XMLHttpRequest();
        http.open('POST', 'https://winkapi.quirky.com/oauth2/token', true);
        http.setRequestHeader("Content-Type", "application/json");
    	http.setRequestHeader("document.domain",'clist.azurewebsites.net');
    	
    	var command = '{"client_id": "'+c_id+'",'+
    				  '"client_secret": "'+c_secret+'",'+
    				  '"username": "'+usnm+'",'+
    				  '"password": "'+pswd+'",'+
   					  '"grant_type": "password"}';
    	http.send(command);
    }
} 


function putHue(ip,username,lampIdx,on,bri,hue,sat)
{
    if (window.XMLHttpRequest)
    {
        var http = new XMLHttpRequest();
        http.open('PUT', 'http://'+ip+'/api/'+username+'/lights/'+ lampIdx + '/state', true);

        http.onreadystatechange = function()
        {
            if(http.readyState == 4)
            {
                if(http.status==200)
                {
                    $("#output").text("Bad JSON: "+http.responseText);
                    $("#output").text(JSON.stringify(JSON.parse(http.responseText), null, '\t'));
                }
                else
                {
                    $("#output").text("Error "+http.status);
                }
            }
        }
        
        var command =  '{"on":' + on;
        if (typeof hue != 'undefined' || hue!="") {command = command + ',"hue":' + hue;}
        if ((typeof bri != 'undefined'  || bri!="")&& bri>=0 && bri <= 254) {command = command + ',"bri":' + bri;}
        if ((typeof sat != 'undefined' || sat!="")&&sat>=0&&sat<=254) {command = command + ',"sat":' + sat;}
        command = command + '}';
        
        http.send(command);
    }
    return false;
} 

function changeHueLampName(ip,username,lampIdx,name)
{
    if (window.XMLHttpRequest)
    {
        var http = new XMLHttpRequest();
        http.open('PUT', 'http://'+ip+'/api/'+username+'/lights/'+ lampIdx, true);

        http.onreadystatechange = function()
        {
            if(http.readyState == 4)
            {
                if(http.status==200)
                {
                    $("#output").text("Bad JSON: "+http.responseText);
                    $("#output").text(JSON.stringify(JSON.parse(http.responseText), null, '\t'));
                }
                else
                {
                    $("#output").text("Error "+http.status);
                }
            }
        }
        
        var command =  '{"name":"' + name+'"}';
        
        http.send(command);
    }
    return false;
} 