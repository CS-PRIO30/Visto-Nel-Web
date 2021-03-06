var CONST_DIR = "VNW"

browser.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
	var url = tabs[0].url;
	var title = tabs[0].title;
	
	var x = document.getElementById("URL_TAB");
    x.value = url;
    var y = document.getElementById("TITLE_TAB");
    y.value = title;
});

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("SAVE").addEventListener("click", salva);
});

function exit_extension(){
	window.close();    //added because if I wrote <HERE> blob resource failed;
}

function onStartedDownload(id) {
  console.log(`Started downloading: ${id}`);
  //window.close();
}

function onFailed(error) {
  console.log(`Download failed: ${error}`);
  
}

function handleChanged(delta) {  //god bless https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/downloads/onChanged
  if (delta.state && delta.state.current === "complete") {
    window.close();
  }
}

function salva(){
	var d = new Date();
	var year = d.getFullYear();
	var month = d.getMonth(); //starts_with_zero
	var arrayMonth = 	["01_Gennaio","02_Febbraio","03_Marzo","04_Aprile","05_Maggio","06_Giugno","07_Luglio","08_Agosto","09_Settembre","10_Ottobre",						"11_Novembre","12_Dicembre"];
	Date.prototype.getWeek = function() {
        var onejan = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    }

    var weekNumber = (new Date()).getWeek();
	var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	
	var offset = d.getTimezoneOffset();
	var watermark = "Generated by CS PRIO30: for complaints cs.prio30@gmail.com";
	var comment = document.getElementById('COMMENT').value;
	var titolo=document.getElementById('TITLE_TAB').value;
	var indirizzo=document.getElementById('URL_TAB').value;
	var debug = {WATERMARK: watermark,URL: indirizzo,TITLE: titolo,COMMENT: comment,DATA: d,TIME_MINUTES_OFFSET_BY_UTC: offset};
    var blob = new Blob([JSON.stringify(debug, null, 2)], {type : 'application/json'});
    var urlDOWNLOAD = URL.createObjectURL(blob);
    var downloading = 	browser.downloads.download({
								url: urlDOWNLOAD,
								filename : CONST_DIR + "/" + year + "/" + arrayMonth[month] + "/" + weekNumber + "/Visto_nel_Web.txt"
						});
	downloading.then(onStartedDownload, onFailed);
	browser.downloads.onChanged.addListener(handleChanged);
	// <HERE> window.close();
}
