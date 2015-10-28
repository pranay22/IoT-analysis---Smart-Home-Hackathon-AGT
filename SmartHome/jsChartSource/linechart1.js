$(document).ready(function () {
	//$('abc').onclick{function(
	//)}
	//$(document).onload(function () {
	$.ajax({
		type: "GET",
		url: "newdata.csv",
		dataType: "text",
		success: function (data) { processData(data); }
	});
	var tempLabels = [];
	var tempData = [];
	var tempData2 = [];
			
	function processData(allText) {
		var allLinesArray = allText.split('\n');
		if (allLinesArray.length > 0) {
			for (var i = 0; i < allLinesArray.length; i++) {
				var rowData = allLinesArray[i].split(',');
				//console.log(rowData);
				//console.log(JSON.stringify(rowData));
				if(rowData && rowData.length > 1){
					tempLabels.push(rowData[0]);
					tempData.push(rowData[1]);
					tempData2.push(rowData[2]);
				}
			}
		}
		
		var buyerData = {
			Title : {
				test: "Test Title for line graph"
			},
			labels : tempLabels,
			datasets : [
			{
				label: "My First dataset",
				fillColor: "rgba(220,220,220,0.2)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data : tempData
			},
			{
				label: "My Second dataset",
				fillColor: "rgba(151,187,205,0.2)",
				strokeColor: "rgba(151,187,205,1)",
				pointColor: "rgba(151,187,205,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(151,187,205,1)",
				data : tempData2
			}
			]
		}
		// get line chart canvas
		var linechart = document.getElementById('LineChart').getContext('2d');
		// draw line chart
		new Chart(linechart).Line(buyerData);
	}    
});