$(document).ready(function () {
	//$('abc').onclick{function(
	//)}
	//$(document).onload(function () {
	$.ajax({
		type: "GET",
		url: "csv/13-1/morningAnnotations.csv",
		dataType: "text",
		success: function (data) { processData(data); }
	});
	var tempLabels = ["Continence","Personal Hygiene","Showering","Other activity in bathroom","Food Preparation","Other activity in kitchen"];
	var tempData = [0.0,0.0,0.0,0.0,0.0,0.0];
			
	function processData(allText) {
		var allLinesArray = allText.split('\n');
		if (allLinesArray.length > 0) {
			for (var i = 1; i < allLinesArray.length; i++) {
				var rowData = allLinesArray[i].split(',');
				//console.log(rowData);
				console.log(JSON.stringify(rowData));
				if(rowData && rowData.length > 1){
					if (rowData[0] == "Continence")
						tempData[0] = JSON.parse(tempData[0]) + JSON.parse(rowData[1]);
					if (rowData[0] == "Personal Hygiene")
						tempData[1] = JSON.parse(tempData[1]) + JSON.parse(rowData[1]);
					if (rowData[0] == "Showering")
						tempData[2] = JSON.parse(tempData[2]) + JSON.parse(rowData[1]);
					if (rowData[0] == "Other activity in bathroom")
						tempData[3] = JSON.parse(tempData[3]) + JSON.parse(rowData[1]);
					if (rowData[0] == "Food Preparation")
						tempData[4] = JSON.parse(tempData[4]) + JSON.parse(rowData[1]);
					if (rowData[0] == "Other activity in kitchen")
						tempData[5] = JSON.parse(tempData[5]) + JSON.parse(rowData[1]);
						
				}
			}
			console.log(JSON.stringify(tempLabels));
			console.log(JSON.stringify(tempData));
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
			},
			{
			value: tempData[4],
			color: "#000099",
			highlight: "#6666C2",
			label: tempLabels[4]
			},
			{
			value: tempData[5],
			color: "#003500",
			highlight: "#567356",
			label: tempLabels[5]
			}
		]
		//get canvas 
		var myPieChart = document.getElementById('Morning').getContext('2d');
		// For a pie chart
		new Chart(myPieChart).Pie(data);
		//get canvas 
		var myDoughnutChart = document.getElementById('DoughnutChart').getContext('2d');
		// And for a doughnut chart
		new Chart(myDoughnutChart).Doughnut(data);
	}
});
	