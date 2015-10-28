importFile=function(filename, filetype){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}
var main= function(){
	var filepath="./jquery/"
	importFile(filepath+"jquery-2.1.4.js","js");
	importFile(filepath+"jquery.mobile.external-png-1.4.5.min.css","css");
	importFile(filepath+"jquery.mobile.icons-1.4.5.min.css","css");
	importFile(filepath+"jquery.mobile.inline-png-1.4.5.min.css","css");
	importFile(filepath+"jquery.mobile.inline-svg-1.4.5.min.css","css");
	importFile(filepath+"jquery.mobile.theme-1.4.5.min.css","css");
	importFile(filepath+"jquery.mobile-1.4.5.min.css","css");
	importFile(filepath+"jquery.mobile-1.4.5.js","js");
	$(loadSite())
	
}
var loadSite=function(){
	var header= $("<div></div>").attr("data-role","header")
	var headerText=$("<h1></h1>").text("Charon App")
	$(header).append(headerText)
	var optionButton=$("<a></a>")
	var spanCHeader$(header).append("<span></")
	
<div data-role="header">
	<a href="index.html" data-icon="gear" class="ui-btn-right">Options</a>
	<span class="ui-title" />
</div>
	$('body').append(header)
	
} 