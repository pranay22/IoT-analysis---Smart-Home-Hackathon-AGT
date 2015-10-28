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
	var tempData = [];
			
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
				}
			}
		}
		//console.log(JSON.stringify(tempLabels));
		//console.log(JSON.stringify(tempData));
		//pie chart data
		var data = [
			{
			value: tempData[0],
			color:"#F7464A",
			highlight: "#FF5A5E",
			label: tempLabels[0]
			},
			{
			value: tempData[1],
			color: "#46BFBD",
			highlight: "#5AD3D1",
			label: tempLabels[1]
			},
			{
			value: tempData[2],
			color: "#FDB45C",
			highlight: "#FFC870",
			label: tempLabels[2]
			},
			{
			value: tempData[3],
			color: "#2A892A",
			highlight: "#55A155",
			label: tempLabels[3]
			}
		]
		//get canvas 
		var myPieChart = document.getElementById('PieChart').getContext('2d');
		// For a pie chart
		new Chart(myPieChart).Pie(data);
		//get canvas 
		var myDoughnutChart = document.getElementById('DoughnutChart').getContext('2d');
		// And for a doughnut chart
		new Chart(myDoughnutChart).Doughnut(data);
	}
});
	