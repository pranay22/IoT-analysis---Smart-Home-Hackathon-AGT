$(document).ready(function () {
	//$('abc').onclick{function(
	//)}
	//$(document).onload(function () {
	$.ajax({
		type: "GET",
		url: "csv/13-1/dayAnnotations.csv",
		dataType: "text",
		success: function (data) { processData(data); }
	});
	var tempActivity = [];
	
	var tempPH = [];
	var tempContinence = [];
	var tempShowering = [];
	var tempOtherBathroom = [];
	
	var tempFP = [];
	var tempOtherKitchen = [];
	
	var tempDay = [];
	
	//function for duplicatre removal in array
	function ArrNoDupe(a) {
		var temp = {};
		for (var i = 0; i < a.length; i++)
			temp[a[i]] = true;
		var r = [];
		for (var k in temp)
			r.push(k);
		return r;
	}	
	
	function processData(allText) {
		var allLinesArray = allText.split('\n');
		if (allLinesArray.length > 0) {
			for (var i = 1; i < allLinesArray.length; i++) {
				var rowData = allLinesArray[i].split(',');
				//console.log(rowData);
				console.log(JSON.stringify(rowData));
				if(rowData && rowData.length > 1){
					if (rowData[2] == "Continence")
					if (rowData[2] == "Personal Hygiene")
					if (rowData[2] == "Showering")
					if (rowData[2] == "Other activity in bathroom")
					if (rowData[2] == "Food Preparation")
					if (rowData[2] == "Other activity in kitchen")
						
					
					
					
					//calculate exact date
					tempDay.push(rowData[2]);
					var tempDateCalc = rowData[2];
					var dateParts = tempDateCalc.split("-");
					var year = dateParts[0];
					var month = dateParts[1];
					var date = dateParts[2];
					console.log("date:"+JSON.stringify(date));
					console.log("month:"+JSON.stringify(month));
					console.log("year:"+JSON.stringify(year));
					
					//Aggregate for 12/7/14
					if (date == 7, month == 12){
						var timePerH = 0;
						var timeOK = 0;
						var timeCont = 0;
						var timeShowering = 0;
						var timeFP = 0;
						var timeOB = 0;
						console.log("Time taken");
						console.log(JSON.stringify(rowData[1]));
						if (rowData[0] == "Personal Hygiene")
							timePerH = timePerH + rowData[1];
						else if (rowData[0] == "Other activity in kitchen")
							timeOK = timeOK + rowData[1];
						else if (rowData[0] == "Continence")
							timeCont = timeCont + rowData[1];
						else if (rowData[0] == "Showering")
							timeShowering = timeShowering + rowData[1];
						else if (rowData[0] == "Food Preparation")
							timeFP = timeFP + rowData[1];
						else if (rowData[0] == "Other activity in bathroom")
							timeOB = timeOB + rowData[1];
						tempPH.push(timePerH);	
						tempContinence.push(timeCont);
						tempShowering.push(timeShowering);
						tempOtherBathroom.push(timeOB);
						tempFP.push(timeFP);
						tempOtherKitchen.push();						
					}
						
				}
			}
		}
	
		var uniqueDay = ArrNoDupe(tempDay);
		var barData = {
		labels : uniqueDay,
		datasets : [
		{
			fillColor : "#48A497",
			strokeColor : "#48A4D1",
			data : tempPH
		},
		{
			fillColor : "rgba(73,188,170,0.4)",
			strokeColor : "rgba(72,174,209,0.4)",
			data : tempContinence
		},
		{
			fillColor : "rgba(73,188,170,0.4)",
			strokeColor : "rgba(72,174,209,0.4)",
			data : tempShowering
		},
		{
			fillColor : "rgba(73,188,170,0.4)",
			strokeColor : "rgba(72,174,209,0.4)",
			data : tempOtherBathroom
		},
		{
			fillColor : "#48A497",
			strokeColor : "#48A4D1",
			data : tempFP
		},
		{
			fillColor : "#48A497",
			strokeColor : "#48A4D1",
			data : tempOtherKitchen
		}

		]
		}
		var barchart = document.getElementById("BarChart").getContext("2d");
		new Chart(barchart).Bar(barData);
	}
});