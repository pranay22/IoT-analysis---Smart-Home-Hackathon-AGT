$(document).ready(function () {
	//$('abc').onclick{function(
	//)}
	//$(document).onload(function () {
	$.ajax({
		type: "GET",
		url: "pieChartData.csv",
		dataType: "text",
		success: function (data) { processData(data); }
	});
	var tempLabels = [];
	var tempMorning = [];
	var tempDay = [];
	var tempEvening = [];
	var tempNight = [];
			
	function processData(allText) {
		var allLinesArray = allText.split('\n');
		if (allLinesArray.length > 0) {
			for (var i = 0; i < allLinesArray.length; i++) {
				var rowData = allLinesArray[i].split(',');
				//console.log(rowData);
				console.log(JSON.stringify(rowData));
				if(rowData && rowData.length > 1){
					tempLabels.push(rowData[0]);
					tempData.push(rowData[1]);
					tempData2.push(rowData[2]);
				}
			}
		}
		console.log(JSON.stringify(tempLabels));
		console.log(JSON.stringify(tempData));
		console.log(JSON.stringify(tempData2));
		var barData = {
		labels : tempLabels,
		datasets : [
		{
			fillColor : "#48A497",
			strokeColor : "#48A4D1",
			data : tempData
		},
		{
			fillColor : "rgba(73,188,170,0.4)",
			strokeColor : "rgba(72,174,209,0.4)",
			data : tempData2
		},
		{
			fillColor : "rgba(73,188,170,0.4)",
			strokeColor : "rgba(72,174,209,0.4)",
			data : tempData2
		},
		{
			fillColor : "rgba(73,188,170,0.4)",
			strokeColor : "rgba(72,174,209,0.4)",
			data : tempData2
		}

		]
		}
		var barchart = document.getElementById("BarChart").getContext("2d");
		new Chart(barchart).Bar(barData);
	}
});