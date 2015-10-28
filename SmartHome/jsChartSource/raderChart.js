$.ajax({
		type: "GET",
		url: "csv/13-1/morningAnnotations.csv",
		dataType: "text",
		success: function (data) { processData(data); }
	});
$.ajax({
		type: "GET",
		url: "csv/13-1/dayAnnotations.csv",
		dataType: "text",
		success: function (data) { processData1(data); }
	});
$.ajax({
		type: "GET",
		url: "csv/13-1/eveningAnnotations.csv",
		dataType: "text",
		success: function (data) { processData2(data); }
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
		
		
	}
});