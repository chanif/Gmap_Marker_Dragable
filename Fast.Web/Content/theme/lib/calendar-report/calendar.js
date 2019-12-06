
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//initiate Jan
var renderCJan = 0;
var dateJan = new Date(2018, 12, 1);
var countJan = new Date(dateJan.getFullYear(), dateJan.getMonth(), 0).getDate();
var monthJan = monthNames[dateJan.getMonth()];

//initiate Feb
var renderCFeb = 0;
var dateFeb = new Date(2019, 1, 1);
var countFeb = new Date(dateFeb.getFullYear(), dateFeb.getMonth() + 1, 0).getDate();
var monthFeb = monthNames[dateFeb.getMonth()];

//initiate Mar
var renderCMar = 0;
var dateMar = new Date(2019, 2, 1);
var countMar = new Date(dateMar.getFullYear(), dateMar.getMonth() + 1, 0).getDate();
var monthMar = monthNames[dateMar.getMonth()];

//initiate Apr
var renderCApr = 0;
var dateApr = new Date(2019, 3, 1);
var countApr = new Date(dateApr.getFullYear(), dateApr.getMonth() + 1, 0).getDate();
var monthApr = monthNames[dateApr.getMonth()];

//initiate May
var renderCMay = 0;
var dateMay = new Date(2019, 4, 1);
var countMay = new Date(dateMay.getFullYear(), dateMay.getMonth() + 1, 0).getDate();
var monthMay = monthNames[dateMay.getMonth()];

//initiate June
var renderCJun = 0;
var dateJun = new Date(2019, 5, 1);
var countJun = new Date(dateJun.getFullYear(), dateJun.getMonth() + 1, 0).getDate();
var monthJun = monthNames[dateJun.getMonth()];

//initiate July
var renderCJul = 0;
var dateJul = new Date(2019, 6, 1);
var countJul = new Date(dateJul.getFullYear(), dateJun.getMonth() + 1, 0).getDate();
var monthJul = monthNames[dateJul.getMonth()];

//initiate August
var renderCAug = 0;
var dateAug = new Date(2019, 7, 1);
var countAug = new Date(dateAug.getFullYear(), dateAug.getMonth() + 1, 0).getDate();
var monthAug = monthNames[dateAug.getMonth()];

//initiate Sept
var renderCSept = 0;
var dateSept = new Date(2019, 8, 1);
var countSept = new Date(dateSept.getFullYear(), dateSept.getMonth() + 1, 0).getDate();
var monthSept = monthNames[dateSept.getMonth()];


//initiate Oct
var renderCOct = 0;
var dateOct = new Date(2019, 9, 1);
var countOct = new Date(dateOct.getFullYear(), dateOct.getMonth() + 1, 0).getDate();
var monthOct = monthNames[dateOct.getMonth()];

//initiate Nov
var renderCNov = 0;
var dateNov = new Date(2019, 10, 1);
var countNov = new Date(dateNov.getFullYear(), dateNov.getMonth() + 1, 0).getDate();
var monthNov = monthNames[dateNov.getMonth()];

//initiate December
var renderCDec = 0;
var dateDec = new Date(2019, 11, 1);
var countDec = new Date(dateDec.getFullYear(), dateDec.getMonth() + 1, 0).getDate();
var monthDec = monthNames[dateDec.getMonth()];

var restW = 0;
var restWTemp = "";

function getWeekNumber(d) {
	d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
	d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));

	var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);

	return weekNo;
}

function processWeek(m, e, year) {
	var te = new Date(year, m, 0 + e);

	restW = getWeekNumber(new Date(te)).toString();
	if (restWTemp !== restW) {
		restWTemp = restW;
		return restWTemp;
	}
	else {
		return restWTemp;
	}
}

function processWeekEx(m, e, year) {
	var ti = new Date(year-1, m, 0 + e);

	restW = getWeekNumber(new Date(ti)).toString();
	if (restWTemp !== restW) {
		restWTemp = restW;
		return restWTemp;
	}
	else {
		return restWTemp;
	}
}

function printDiv(divName) {

	var printContents = document.getElementById(divName).innerHTML;
	var originalContents = document.body.innerHTML;

	document.body.innerHTML = printContents;
	window.print();

	document.body.innerHTML = originalContents;
}

function collectCalendar() {

	var tableHoliday = $('#holidayTable').dataTable({
		"autoWidth": false,
		"processing": true,
		"serverSide": true,
		"info": false,
		"filter": false,
		"bLengthChange": false,
		"orderMulti": false,
		"pageLength": 10,
		"destroy": true,
		"ajax": {
			"url": fastApp.BaseUrl + "/Calendar/GetAllHolidayWithParam",
			"data": { locID: idLoc, year, gtypeID },
			"type": "POST",
			"datatype": "json"
		},
		"columnDefs": [
			{ "targets": [0], "searchable": false, "visible": false, "orderable": false },
			{ "targets": [1], "searchable": true, "orderable": false },
			{ "targets": [2], "searchable": true, "orderable": false },
			{ "targets": [3], "searchable": true, "orderable": false }
		],
		"columns": [
			{ "data": "ID", "name": "ID", "autoWidth": false },
			{
				"data": "Date", "Title": "Bulan",
				render: function (data, type, row) {
					if (data)
						return moment(data).format("MMMM");
					else
						return '';
				}
			},
			{
				"data": "Date", "Title": "Tanggal",
				render: function (data, type, row) {
					if (data)
						return moment(data).format("D");
					else
						return '';
				}
			},
			{ "data": "Description", "name": "Description", "Title": "Informasi", "autoWidth": true }
		],
		"fnRowCallback": function (nRow, data, iDisplayIndex, iDisplayIndexFull) {
			$('td', nRow).css('background-color', data['Color']);
			$('#holidayTable_paginate')[0].style.display = "none";
		}
	});

	var workingSummaryTable = $('#workingSummaryTable').dataTable({
		"autoWidth": false,
		"processing": true,
		"serverSide": true,
		"info": false,
		"filter": false,
		"bLengthChange": false,
		"orderMulti": false,
		"pageLength": 25,
		"destroy": true,
		"bSort": false,
		"ajax": {
			"url": fastApp.BaseUrl + "/Calendar/GetWorkingSummaryWithParam",
			"data": { locID: idLoc, year, gtypeID },
			"type": "POST",
			"datatype": "json"
		},
		"columnDefs": [
			{ "targets": [0], "searchable": false, "orderable": false },
			{ "targets": [1], "searchable": false, "orderable": false },
			{ "targets": [2], "searchable": false, "orderable": false },
			{ "targets": [3], "searchable": false, "orderable": false },
			{ "targets": [4], "searchable": false, "orderable": false },
			{ "targets": [5], "searchable": false, "orderable": false },
			{ "targets": [6], "searchable": false, "orderable": false }
		],
		"columns": [
			{ "data": "ColumnName", "name": "ColumnName", "Title": "2020", "autoWidth": false },
			{ "data": "Days", "name": "Days", "autoWidth": false },
			{ "data": "Holiday", "name": "Holiday", "autoWidth": false },
			{ "data": "Leaves", "name": "Leaves", "autoWidth": false },
			{ "data": "ProdOff", "name": "ProdOff", "autoWidth": false },
			{ "data": "ShiftOff", "name": "ShiftOff", "autoWidth": false },
			{ "data": "WorkDays", "name": "WorkDays", "autoWidth": false }
		],
		"fnDrawCallback": function () {
			$('#workingSummaryTable_paginate')[0].style.display = "none";
		}
	});

	var workingGroupSummaryTable = $('#workingGroupSummaryTable').dataTable({
		"autoWidth": false,
		"processing": true,
		"serverSide": true,
		"info": false,
		"filter": false,
		"bLengthChange": false,
		"orderMulti": false,
		"pageLength": 25,
		"destroy": true,
		"bSort": false,
		"ajax": {
			"url": fastApp.BaseUrl + "/Calendar/GetWorkingGroupSummaryWithParam",
			"data": { locID: idLoc, year, gtypeID },
			"type": "POST",
			"datatype": "json"
		},
		"columnDefs": [
			{ "targets": [0], "searchable": false, "orderable": false },
			{ "targets": [1], "searchable": false, "orderable": false },
			{ "targets": [2], "searchable": false, "orderable": false },
			{ "targets": [3], "searchable": false, "orderable": false },
			{ "targets": [4], "searchable": false, "orderable": false }
		],
		"columns": [
			{ "data": "ColumnName", "name": "ColumnName", "Title": "2020", "autoWidth": false },
			{ "data": "A", "name": "A", "Title": "A", "autoWidth": true },
			{ "data": "B", "name": "B", "Title": "B", "autoWidth": true },
			{ "data": "C", "name": "C", "Title": "C", "autoWidth": true },
			{ "data": "D", "name": "D", "Title": "D", "autoWidth": true }
		],
		"fnDrawCallback": function () {
			$('#workingGroupSummaryTable_paginate')[0].style.display = "none";
		}
	});

	var tableJan = $('#calJan').dataTable({
		"autoWidth": false,
		"processing": true,
		"serverSide": true,
		"bLengthChange": false,
		"targets": 'no-sort',
		"bSort": false,
		"order": [],
		"filter": false,
		"info": false,
		"orderMulti": false,
		"pageLength": countJan,
		"destroy": true,
		"ajax": {
			"url": fastApp.BaseUrl + "/Calendar/GetAllCalendarWithParam",
			"data": { strmonth: "Jan", locID: idLoc, year, gtypeID },
			"type": "POST",
			"datatype": "json"
		},

		"columnDefs":
			[{ "targets": [0], "searchable": false, "visible": true, "orderable": false, "defaultContent": null },
			{ 
				"targets": [1], "searchable": true, "orderable": false, "width": "100%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (rowData.Shift1.indexOf("#") >= 0) {
						$(td).css('background-color', rowData.Shift1);
					}
				}
			},
			{ 
				"targets": [2], "searchable": true, "orderable": false, "width": "100%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (rowData.Shift1.indexOf("#") >= 0) {
						$(td).css('background-color', rowData.Shift1);
					}
				}
			},
			{
				"targets": [3], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}
			},
			{
				"targets": [4], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}
			},
			{
				"targets": [5], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}

			},
			{ "targets": [6], "searchable": true, "orderable": true, "visible": false },
			{ "targets": [7], "searchable": true, "orderable": true, "visible": false }
			],

		"columns": [
			{
				"data": "ID", "defaultContent": "",
				"title": monthJan,
				"autoWidth": false,
				render: function (data, type, row) {
					renderCJan++;

					restW = 0;
					restWTemp = "";

					var mtJan = 12;
					var resultWeek = "";
					var strWeek = "";
					if (renderCJan === 2) {
						resultWeek = processWeekEx(mtJan, renderCJan, year);
						strWeek = "Wk" + resultWeek;
						return strWeek;
					}
					if (renderCJan % 7 === 2) {
						resultWeek = processWeekEx(mtJan, renderCJan, year);
						strWeek = "Wk" + resultWeek;
						return strWeek;
					}

				}
			},
			{
				"data": "Date",
				"title": "Day",
				render: function (data, type, row) {
					if (data)
						return moment(data).format("dd");
					else
						return '';
				}
			},
			{
				"data": "Date",
				"title": "Date",
				render: function (data, type, row) {
					if (data)
						return moment(data).format("D");
					else
						return '';
				}
			},
			{
				"data": "Shift1",
				"title": "Shift 1", 
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{
				"data": "Shift2",
				"title": "Shift 2", 
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{
				"data": "Shift3",
				"title": "Shift 3", 
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{ "data": "Location", "name": "Location", "autoWidth": true },
			{ "data": "GroupType", "name": "GroupType", "autoWidth": true }
		],
		"fnDrawCallback": function () {
			$('#calJan_paginate')[0].style.display = "none";
		}
	});

	var tableFeb = $('#calFeb').dataTable({
		"autoWidth": false,
		"processing": true,
		"serverSide": true,
		"filter": false,
		"bLengthChange": false,
		"targets": 'no-sort',
		"bSort": false,
		"order": [],
		"info": false,
		"orderMulti": false,
		"pageLength": countFeb,
		"destroy": true,
		"ajax": {
			"url": fastApp.BaseUrl + "/Calendar/GetAllCalendarWithParam",
			"data": { strmonth: "Feb", locID: idLoc, year, gtypeID },
			"type": "POST",
			"datatype": "json"
		},
		"columnDefs":
			[{ "targets": [0], "searchable": false, "visible": true, "orderable": false, "defaultContent": null },
			{ 
				"targets": [1], "searchable": true, "orderable": false, "width": "100%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (rowData.Shift1.indexOf("#") >= 0) {
						$(td).css('background-color', rowData.Shift1);
					}
				}
			},
			{ 
				"targets": [2], "searchable": true, "orderable": false, "width": "100%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (rowData.Shift1.indexOf("#") >= 0) {
						$(td).css('background-color', rowData.Shift1);
					}
				}
			},
			{
				"targets": [3], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}
			},
			{
				"targets": [4], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}
			},
			{
				"targets": [5], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}

			},
			{ "targets": [6], "searchable": true, "orderable": true, "visible": false },
			{ "targets": [7], "searchable": true, "orderable": true, "visible": false }
			],

		"columns": [
			{
				"data": "ID", "defaultContent": "", "title": monthFeb, "autoWidth": false,
				render: function (data, type, row) {
					renderCFeb++;

					restW = 0;
					restWTemp = "";

					var mtFeb = 1;
					var resultWeek = "";
					var strWeek = "";
					if (renderCFeb % 7 === 6) {
						resultWeek = processWeek(mtFeb, renderCFeb);
						strWeek = "Wk" + resultWeek;
						return strWeek;
					}
				}
			},
			{
				"data": "Date",
				"title": "Day",
				render: function (data, type, row) {
					if (data)
						return moment(data).format("dd");
					else
						return '';
				}
			},
			{
				"data": "Date",
				"title": "Date",
				render: function (data, type, row) {
					if (data)
						return moment(data).format("D");
					else
						return '';
				}
			},
			{
				"data": "Shift1",
				"title": "Shift 1",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{
				"data": "Shift2",
				"title": "Shift 2",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{
				"data": "Shift3",
				"title": "Shift 3",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{ "data": "Location", "name": "Location", "autoWidth": true },
			{ "data": "GroupType", "name": "GroupType", "autoWidth": true }
		],
		"fnDrawCallback": function () {
			$('#calFeb_paginate')[0].style.display = "none";
		}
	});

	var tableMar = $('#calMar').dataTable({
		"autoWidth": false,
		"processing": true,
		"bLengthChange": false,
		"targets": 'no-sort',
		"bSort": false,
		"order": [],
		"serverSide": true,
		"filter": false,
		"info": false,
		"orderMulti": false,
		"pageLength": countMar,
		"destroy": true,
		"ajax": {
			"url": fastApp.BaseUrl + "/Calendar/GetAllCalendarWithParam",
			"data": { strmonth: "Mar", locID: idLoc, year, gtypeID },
			"type": "POST",
			"datatype": "json"
		},
		"columnDefs":
			[{ "targets": [0], "searchable": false, "visible": true, "orderable": false, "defaultContent": null },
			{ 
				"targets": [1], "searchable": true, "orderable": false, "width": "100%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (rowData.Shift1.indexOf("#") >= 0) {
						$(td).css('background-color', rowData.Shift1);
					}
				}
			},
			{ 
				"targets": [2], "searchable": true, "orderable": false, "width": "100%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (rowData.Shift1.indexOf("#") >= 0) {
						$(td).css('background-color', rowData.Shift1);
					}
				}
			},
			{
				"targets": [3], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}
			},
			{
				"targets": [4], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}
			},
			{
				"targets": [5], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}

			},
			{ "targets": [6], "searchable": true, "orderable": true, "visible": false },
			{ "targets": [7], "searchable": true, "orderable": true, "visible": false }
			],

		"columns": [
			{
				"data": "ID", "defaultContent": "", "title": monthMar, "autoWidth": false,
				render: function (data, type, row) {
					renderCMar++;

					restW = 0;
					restWTemp = "";

					var mtMar = 2;
					var resultWeek = "";
					var strWeek = "";
					if (renderCMar % 7 === 5) {
						resultWeek = processWeek(mtMar, renderCMar);
						strWeek = "Wk" + resultWeek;
						return strWeek;
					}
				}
			},
			{
				"data": "Date",
				"title": "Day",
				render: function (data, type, row) {
					if (data)
						return moment(data).format("dd");
					else
						return '';
				}
			},
			{
				"data": "Date",
				"title": "Date",
				render: function (data, type, row) {
					if (data)
						return moment(data).format("D");
					else
						return '';
				}
			},
			{
				"data": "Shift1",
				"title": "Shift 1",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{
				"data": "Shift2",
				"title": "Shift 2",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{
				"data": "Shift3",
				"title": "Shift 3",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{ "data": "Location", "name": "Location", "autoWidth": true },
			{ "data": "GroupType", "name": "GroupType", "autoWidth": true }
		],
		"fnDrawCallback": function () {
			$('#calMar_paginate')[0].style.display = "none";
		}
	});

	var tableApr = $('#calApr').dataTable({
		"autoWidth": false,
		"processing": true,
		"serverSide": true,
		"filter": false,
		"bLengthChange": false,
		"targets": 'no-sort',
		"bSort": false,
		"order": [],
		"info": false,
		"orderMulti": false,
		"pageLength": countApr,
		"destroy": true,
		"ajax": {
			"url": fastApp.BaseUrl + "/Calendar/GetAllCalendarWithParam",
			"data": { strmonth: "Apr", locID: idLoc, year, gtypeID },
			"type": "POST",
			"datatype": "json"
		},
		"columnDefs":
			[{ "targets": [0], "searchable": false, "visible": true, "orderable": false, "defaultContent": null },
			{ 
				"targets": [1], "searchable": true, "orderable": false, "width": "100%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (rowData.Shift1.indexOf("#") >= 0) {
						$(td).css('background-color', rowData.Shift1);
					}
				}
			},
			{ 
				"targets": [2], "searchable": true, "orderable": false, "width": "100%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (rowData.Shift1.indexOf("#") >= 0) {
						$(td).css('background-color', rowData.Shift1);
					}
				}
			},
			{
				"targets": [3], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}
			},
			{
				"targets": [4], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}
			},
			{
				"targets": [5], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}

			},
			{ "targets": [6], "searchable": true, "orderable": true, "visible": false },
			{ "targets": [7], "searchable": true, "orderable": true, "visible": false }
			],

		"columns": [
			{
				"data": "ID", "defaultContent": "", "title": monthApr, "autoWidth": false,
				render: function (data, type, row) {
					renderCApr++;

					restW = 0;
					restWTemp = "";

					var mtApr = 3;
					var resultWeek = "";
					var strWeek = "";
					if (renderCApr % 7 === 2) {
						resultWeek = processWeek(mtApr, renderCApr);
						strWeek = "Wk" + resultWeek;
						return strWeek;
					}
				}
			},
			{
				"data": "Date",
				"title": "Day",
				render: function (data, type, row) {
					if (data)
						return moment(data).format("dd");
					else
						return '';
				}
			},
			{
				"data": "Date",
				"title": "Date",
				render: function (data, type, row) {
					if (data)
						return moment(data).format("D");
					else
						return '';
				}
			},
			{
				"data": "Shift1",
				"title": "Shift 1",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{
				"data": "Shift2",
				"title": "Shift 2",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{
				"data": "Shift3",
				"title": "Shift 3",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{ "data": "Location", "name": "Location", "autoWidth": true },
			{ "data": "GroupType", "name": "GroupType", "autoWidth": true }
		],
		"fnDrawCallback": function () {
			$('#calApr_paginate')[0].style.display = "none";
		}

	});

	var tableMay = $('#calMay').dataTable({
		"autoWidth": false,
		"processing": true,
		"serverSide": true,
		"filter": false,
		"bLengthChange": false,
		"targets": 'no-sort',
		"bSort": false,
		"order": [],
		"info": false,
		"orderMulti": false,
		"pageLength": countMay,
		"destroy": true,
		"ajax": {
			"url": fastApp.BaseUrl + "/Calendar/GetAllCalendarWithParam",
			"data": { strmonth: "May", locID: idLoc, year, gtypeID },
			"type": "POST",
			"datatype": "json"
		},
		"columnDefs":
			[{ "targets": [0], "searchable": false, "visible": true, "orderable": false, "defaultContent": null },
			{ 
				"targets": [1], "searchable": true, "orderable": false, "width": "100%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (rowData.Shift1.indexOf("#") >= 0) {
						$(td).css('background-color', rowData.Shift1);
					}
				}
			},
			{ 
				"targets": [2], "searchable": true, "orderable": false, "width": "100%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (rowData.Shift1.indexOf("#") >= 0) {
						$(td).css('background-color', rowData.Shift1);
					}
				}
			},
			{
				"targets": [3], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}
			},
			{
				"targets": [4], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}
			},
			{
				"targets": [5], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}

			},
			{ "targets": [6], "searchable": true, "orderable": true, "visible": false },
			{ "targets": [7], "searchable": true, "orderable": true, "visible": false }
			],

		"columns": [
			{
				"data": "ID", "defaultContent": "", "title": monthMay, "autoWidth": false,
				render: function (data, type, row) {
					renderCMay++;

					restW = 0;
					restWTemp = "";

					var mtMay = 4;
					var resultWeek = "";
					var strWeek = "";
					if (renderCMay % 7 === 0) {
						resultWeek = processWeek(mtMay, renderCMay);
						strWeek = "Wk" + resultWeek;
						return strWeek;
					}
				}
			},
			{
				"data": "Date",
				"title": "Day",
				render: function (data, type, row) {
					if (data)
						return moment(data).format("dd");
					else
						return '';
				}
			},
			{
				"data": "Date",
				"title": "Date",
				render: function (data, type, row) {
					if (data)
						return moment(data).format("D");
					else
						return '';
				}
			},
			{
				"data": "Shift1",
				"title": "Shift 1",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{
				"data": "Shift2",
				"title": "Shift 2",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{
				"data": "Shift3",
				"title": "Shift 3",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{ "data": "Location", "name": "Location", "autoWidth": true },
			{ "data": "GroupType", "name": "GroupType", "autoWidth": true }
		],
		"fnDrawCallback": function () {
			$('#calMay_paginate')[0].style.display = "none";
		}
	});

	var tableJune = $('#calJun').dataTable({
		"autoWidth": false,
		"processing": true,
		"serverSide": true,
		"filter": false,
		"bLengthChange": false,
		"targets": 'no-sort',
		"bSort": false,
		"order": [],
		"info": false,
		"orderMulti": false,
		"pageLength": countJun,
		"destroy": true,
		"ajax": {
			"url": fastApp.BaseUrl + "/Calendar/GetAllCalendarWithParam",
			"data": { strmonth: "Jun", locID: idLoc, year, gtypeID },
			"type": "POST",
			"datatype": "json"
		},
		"columnDefs":
			[{ "targets": [0], "searchable": false, "visible": true, "orderable": false, "defaultContent": null },
			{ 
				"targets": [1], "searchable": true, "orderable": false, "width": "100%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (rowData.Shift1.indexOf("#") >= 0) {
						$(td).css('background-color', rowData.Shift1);
					}
				}
			},
			{ 
				"targets": [2], "searchable": true, "orderable": false, "width": "100%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (rowData.Shift1.indexOf("#") >= 0) {
						$(td).css('background-color', rowData.Shift1);
					}
				}
			},
			{
				"targets": [3], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}
			},
			{
				"targets": [4], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}
			},
			{
				"targets": [5], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}

			},
			{ "targets": [6], "searchable": true, "orderable": true, "visible": false },
			{ "targets": [7], "searchable": true, "orderable": true, "visible": false }
			],

		"columns": [
			{
				"data": "ID", "defaultContent": "", "title": monthJun, "autoWidth": false,
				render: function (data, type, row) {
					renderCJun++;

					restW = 0;
					restWTemp = "";

					var mtJun = 5;
					var resultWeek = "";
					var strWeek = "";
					if (renderCJun % 7 === 4) {
						resultWeek = processWeek(mtJun, renderCJun);
						strWeek = "Wk" + resultWeek;
						return strWeek;
					}

				}
			},
			{
				"data": "Date",
				"title": "Day",
				render: function (data, type, row) {
					if (data)
						return moment(data).format("dd");
					else
						return '';
				}
			},
			{
				"data": "Date",
				"title": "Date",
				render: function (data, type, row) {
					if (data)
						return moment(data).format("D");
					else
						return '';
				}
			},
			{
				"data": "Shift1",
				"title": "Shift 1",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{
				"data": "Shift2",
				"title": "Shift 2",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{
				"data": "Shift3",
				"title": "Shift 3",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{ "data": "Location", "name": "Location", "autoWidth": true },
			{ "data": "GroupType", "name": "GroupType", "autoWidth": true }
		],
		"fnDrawCallback": function () {
			$('#calJun_paginate')[0].style.display = "none";
		}

	});

	var tableJuly = $('#calJul').dataTable({
		"autoWidth": false,
		"processing": true,
		"serverSide": true,
		"filter": false,
		"bLengthChange": false,
		"targets": 'no-sort',
		"bSort": false,
		"order": [],
		"info": false,
		"orderMulti": false,
		"pageLength": countJul,
		"destroy": true,
		"ajax": {
			"url": fastApp.BaseUrl + "/Calendar/GetAllCalendarWithParam",
			"data": { strmonth: "Jul", locID: idLoc, year, gtypeID },
			"type": "POST",
			"datatype": "json"
		},
		"columnDefs":
			[{ "targets": [0], "searchable": false, "visible": true, "orderable": false, "defaultContent": null },
			{ 
				"targets": [1], "searchable": true, "orderable": false, "width": "100%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (rowData.Shift1.indexOf("#") >= 0) {
						$(td).css('background-color', rowData.Shift1);
					}
				}
			},
			{ 
				"targets": [2], "searchable": true, "orderable": false, "width": "100%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (rowData.Shift1.indexOf("#") >= 0) {
						$(td).css('background-color', rowData.Shift1);
					}
				}
			},
			{
				"targets": [3], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}
			},
			{
				"targets": [4], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}
			},
			{
				"targets": [5], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}

			},
			{ "targets": [6], "searchable": true, "orderable": true, "visible": false },
			{ "targets": [7], "searchable": true, "orderable": true, "visible": false }
			],

		"columns": [
			{
				"data": "ID", "defaultContent": "", "title": monthJul, "autoWidth": false,
				render: function (data, type, row) {
					renderCJul++;

					restW = 0;
					restWTemp = "";

					var mtJul = 6;
					var resultWeek = "";
					var strWeek = "";
					if (renderCJul % 7 === 2) {
						resultWeek = processWeek(mtJul, renderCJul);
						strWeek = "Wk" + resultWeek;
						return strWeek;
					}
				}
			},
			{
				"data": "Date",
				"title": "Day",
				render: function (data, type, row) {
					if (data)
						return moment(data).format("dd");
					else
						return '';
				}
			},
			{
				"data": "Date",
				"title": "Date",
				render: function (data, type, row) {
					if (data)
						return moment(data).format("D");
					else
						return '';
				}
			},
			{
				"data": "Shift1",
				"title": "Shift 1",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{
				"data": "Shift2",
				"title": "Shift 2",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{
				"data": "Shift3",
				"title": "Shift 3",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{ "data": "Location", "name": "Location", "autoWidth": true },
			{ "data": "GroupType", "name": "GroupType", "autoWidth": true }
		],
		"fnDrawCallback": function () {
			$('#calJul_paginate')[0].style.display = "none";
		}
	});

	var tableAug = $('#calAugust').dataTable({
		"autoWidth": false,
		"processing": true,
		"serverSide": true,
		"filter": false,
		"bLengthChange": false,
		"targets": 'no-sort',
		"bSort": false,
		"order": [],
		"info": false,
		"orderMulti": false,
		"pageLength": countAug,
		"destroy": true,
		"ajax": {
			"url": fastApp.BaseUrl + "/Calendar/GetAllCalendarWithParam",
			"data": { strmonth: "Aug", locID: idLoc, year, gtypeID },
			"type": "POST",
			"datatype": "json"
		},
		"columnDefs":
			[{ "targets": [0], "searchable": false, "visible": true, "orderable": false, "defaultContent": null },
			{ 
				"targets": [1], "searchable": true, "orderable": false, "width": "100%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (rowData.Shift1.indexOf("#") >= 0) {
						$(td).css('background-color', rowData.Shift1);
					}
				}
			},
			{ 
				"targets": [2], "searchable": true, "orderable": false, "width": "100%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (rowData.Shift1.indexOf("#") >= 0) {
						$(td).css('background-color', rowData.Shift1);
					}
				}
			},
			{
				"targets": [3], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}
			},
			{
				"targets": [4], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}
			},
			{
				"targets": [5], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}

			},
			{ "targets": [6], "searchable": true, "orderable": true, "visible": false },
			{ "targets": [7], "searchable": true, "orderable": true, "visible": false }
			],

		"columns": [
			{
				"data": "ID", "defaultContent": "", "title": monthAug, "autoWidth": false,
				render: function (data, type, row) {
					renderCAug++;

					restW = 0;
					restWTemp = "";

					var mtAug = 7;
					var resultWeek = "";
					var strWeek = "";
					if (renderCAug % 7 === 6) {
						resultWeek = processWeek(mtAug, renderCAug);
						strWeek = "Wk" + resultWeek;
						return strWeek;
					}

				}
			},
			{
				"data": "Date",
				"title": "Day",
				render: function (data, type, row) {
					if (data)
						return moment(data).format("dd");
					else
						return '';
				}
			},
			{
				"data": "Date",
				"title": "Date",
				render: function (data, type, row) {
					if (data)
						return moment(data).format("D");
					else
						return '';
				}
			},
			{
				"data": "Shift1",
				"title": "Shift 1",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{
				"data": "Shift2",
				"title": "Shift 2",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{
				"data": "Shift3",
				"title": "Shift 3",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{ "data": "Location", "name": "Location", "autoWidth": true },
			{ "data": "GroupType", "name": "GroupType", "autoWidth": true }
		],
		"fnDrawCallback": function () {
			$('#calAugust_paginate')[0].style.display = "none";
		}
	});

	var tableSept = $('#calSept').dataTable({
		"autoWidth": false,
		"processing": true,
		"serverSide": true,
		"filter": false,
		"bLengthChange": false,
		"targets": 'no-sort',
		"bSort": false,
		"order": [],
		"info": false,
		"orderMulti": false,
		"pageLength": countSept,
		"destroy": true,
		"ajax": {
			"url": fastApp.BaseUrl + "/Calendar/GetAllCalendarWithParam",
			"data": { strmonth: "Sept", locID: idLoc, year, gtypeID },
			"type": "POST",
			"datatype": "json"
		},
		"columnDefs":
			[{ "targets": [0], "searchable": false, "visible": true, "orderable": false, "defaultContent": null },
			{ 
				"targets": [1], "searchable": true, "orderable": false, "width": "100%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (rowData.Shift1.indexOf("#") >= 0) {
						$(td).css('background-color', rowData.Shift1);
					}
				}
			},
			{ 
				"targets": [2], "searchable": true, "orderable": false, "width": "100%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (rowData.Shift1.indexOf("#") >= 0) {
						$(td).css('background-color', rowData.Shift1);
					}
				}
			},
			{
				"targets": [3], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}
			},
			{
				"targets": [4], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}
			},
			{
				"targets": [5], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}

			},
			{ "targets": [6], "searchable": true, "orderable": true, "visible": false },
			{ "targets": [7], "searchable": true, "orderable": true, "visible": false }
			],

		"columns": [
			{
				"data": "ID", "defaultContent": "", "title": monthSept, "autoWidth": false,
				render: function (data, type, row) {
					renderCSept++;

					restW = 0;
					restWTemp = "";

					var mtSept = 8;
					var resultWeek = "";
					var strWeek = "";
					if (renderCSept % 7 === 3) {
						resultWeek = processWeek(mtSept, renderCSept);
						strWeek = "Wk" + resultWeek;
						return strWeek;
					}

				}
			},
			{
				"data": "Date",
				"title": "Day",
				render: function (data, type, row) {
					if (data)
						return moment(data).format("dd");
					else
						return '';
				}
			},
			{
				"data": "Date",
				"title": "Date",
				render: function (data, type, row) {
					if (data)
						return moment(data).format("D");
					else
						return '';
				}
			},
			{
				"data": "Shift1",
				"title": "Shift 1",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{
				"data": "Shift2",
				"title": "Shift 2",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{
				"data": "Shift3",
				"title": "Shift 3",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{ "data": "Location", "name": "Location", "autoWidth": true },
			{ "data": "GroupType", "name": "GroupType", "autoWidth": true }
		],
		"fnDrawCallback": function () {
			$('#calSept_paginate')[0].style.display = "none";
		}

	});

	var tableOct = $('#calOkt').dataTable({
		"autoWidth": false,
		"processing": true,
		"serverSide": true,
		"filter": false,
		"bLengthChange": false,
		"targets": 'no-sort',
		"bSort": false,
		"order": [],
		"info": false,
		"orderMulti": false,
		"pageLength": countOct,
		"destroy": true,
		"ajax": {
			"url": fastApp.BaseUrl + "/Calendar/GetAllCalendarWithParam",
			"data": { strmonth: "Oct", locID: idLoc, year, gtypeID },
			"type": "POST",
			"datatype": "json"
		},
		"columnDefs":
			[{ "targets": [0], "searchable": false, "visible": true, "orderable": false, "defaultContent": null },
			{ 
				"targets": [1], "searchable": true, "orderable": false, "width": "100%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (rowData.Shift1.indexOf("#") >= 0) {
						$(td).css('background-color', rowData.Shift1);
					}
				}
			},
			{ 
				"targets": [2], "searchable": true, "orderable": false, "width": "100%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (rowData.Shift1.indexOf("#") >= 0) {
						$(td).css('background-color', rowData.Shift1);
					}
				}
			},
			{
				"targets": [3], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}
			},
			{
				"targets": [4], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}
			},
			{
				"targets": [5], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}

			},
			{ "targets": [6], "searchable": true, "orderable": true, "visible": false },
			{ "targets": [7], "searchable": true, "orderable": true, "visible": false }
			],

		"columns": [
			{
				"data": "ID", "defaultContent": "", "title": monthOct, "autoWidth": false,
				render: function (data, type, row) {
					renderCOct++;
					restW = 0;
					restWTemp = "";

					var mtOct = 9;
					var resultWeek = "";
					var strWeek = "";
					if (renderCOct % 7 === 1) {
						resultWeek = processWeek(mtOct, renderCOct);
						strWeek = "Wk" + resultWeek;
						return strWeek;
					}

				}
			},
			{
				"data": "Date",
				"title": "Day",
				render: function (data, type, row) {
					if (data)
						return moment(data).format("dd");
					else
						return '';
				}
			},
			{
				"data": "Date",
				"title": "Date",
				render: function (data, type, row) {
					if (data)
						return moment(data).format("D");
					else
						return '';
				}
			},
			{
				"data": "Shift1",
				"title": "Shift 1",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{
				"data": "Shift2",
				"title": "Shift 2",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{
				"data": "Shift3",
				"title": "Shift 3",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{ "data": "Location", "name": "Location", "autoWidth": true },
			{ "data": "GroupType", "name": "GroupType", "autoWidth": true }
		],
		"fnDrawCallback": function () {
			$('#calOkt_paginate')[0].style.display = "none";
		}
	});

	var tableNov = $('#calNov').dataTable({
		"autoWidth": false,
		"processing": true,
		"serverSide": true,
		"filter": false,
		"bLengthChange": false,
		"targets": 'no-sort',
		"bSort": false,
		"order": [],
		"info": false,
		"orderMulti": false,
		"pageLength": countNov,
		"destroy": true,
		"ajax": {
			"url": fastApp.BaseUrl + "/Calendar/GetAllCalendarWithParam",
			"data": { strmonth: "Nov", locID: idLoc, year, gtypeID },
			"type": "POST",
			"datatype": "json"
		},
		"columnDefs":
			[{ "targets": [0], "searchable": false, "visible": true, "orderable": false, "defaultContent": null },
			{ 
				"targets": [1], "searchable": true, "orderable": false, "width": "100%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (rowData.Shift1.indexOf("#") >= 0) {
						$(td).css('background-color', rowData.Shift1);
					}
				}
			},
			{ 
				"targets": [2], "searchable": true, "orderable": false, "width": "100%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (rowData.Shift1.indexOf("#") >= 0) {
						$(td).css('background-color', rowData.Shift1);
					}
				}
			},
			{
				"targets": [3], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}
			},
			{
				"targets": [4], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}
			},
			{
				"targets": [5], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}

			},
			{ "targets": [6], "searchable": true, "orderable": true, "visible": false },
			{ "targets": [7], "searchable": true, "orderable": true, "visible": false }
			],

		"columns": [
			{
				"data": "ID", "defaultContent": "", "title": monthNov, "autoWidth": false,
				render: function (data, type, row) {
					renderCNov++;
					restW = 0;
					restWTemp = "";

					var mtNov = 10;
					var resultWeek = "";
					var strWeek = "";
					if (renderCNov % 7 === 5) {
						resultWeek = processWeek(mtNov, renderCNov);
						strWeek = "Wk" + resultWeek;
						return strWeek;
					}

				}
			},
			{
				"data": "Date",
				"title": "Day",
				render: function (data, type, row) {
					if (data)
						return moment(data).format("dd");
					else
						return '';
				}
			},
			{
				"data": "Date",
				"title": "Date",
				render: function (data, type, row) {
					if (data)
						return moment(data).format("D");
					else
						return '';
				}
			},
			{
				"data": "Shift1",
				"title": "Shift 1",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{
				"data": "Shift2",
				"title": "Shift 2",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{
				"data": "Shift3",
				"title": "Shift 3",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{ "data": "Location", "name": "Location", "autoWidth": true },
			{ "data": "GroupType", "name": "GroupType", "autoWidth": true }
		],
		"fnDrawCallback": function () {
			$('#calNov_paginate')[0].style.display = "none";
		}
	});

	var tableDec = $('#calDec').dataTable({
		"autoWidth": false,
		"processing": true,
		"serverSide": true,
		"filter": false,
		"bLengthChange": false,
		"targets": 'no-sort',
		"bSort": false,
		"order": [],
		"info": false,
		"orderMulti": false,
		"pageLength": countDec,
		"destroy": true,
		"ajax": {
			"url": fastApp.BaseUrl + "/Calendar/GetAllCalendarWithParam",
			"data": { strmonth: "Dec", locID: idLoc, year, gtypeID },
			"type": "POST",
			"datatype": "json"
		},
		"columnDefs":
			[{ "targets": [0], "searchable": false, "visible": true, "orderable": false, "defaultContent": null },
			{ 
				"targets": [1], "searchable": true, "orderable": false, "width": "100%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (rowData.Shift1.indexOf("#") >= 0) {
						$(td).css('background-color', rowData.Shift1);
					}
				}
			},
			{ 
				"targets": [2], "searchable": true, "orderable": false, "width": "100%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (rowData.Shift1.indexOf("#") >= 0) {
						$(td).css('background-color', rowData.Shift1);
					}
				}
			},
			{
				"targets": [3], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}
			},
			{
				"targets": [4], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}
			},
			{
				"targets": [5], "searchable": true, "orderable": false, "width": "90%",
				"createdCell": function (td, cellData, rowData, row, col) {
					if (cellData === 'A') {
						$(td).css('background-color', '#FA55E6');
					}
					if (cellData === 'B') {
						$(td).css('background-color', '#FFDA4D');
					}
					if (cellData === 'C') {
						$(td).css('background-color', '#FDFFB1');
					}
					if (cellData.indexOf("#") >= 0) {
						$(td).css('background-color', cellData);
					}
				}

			},
			{ "targets": [6], "searchable": true, "orderable": true, "visible": false },
			{ "targets": [7], "searchable": true, "orderable": true, "visible": false }
			],

		"columns": [
			{
				"data": "ID", "defaultContent": "", "title": monthDec, "autoWidth": false,
				render: function (data, type, row) {
					renderCDec++;
					restW = 0;
					restWTemp = "";

					var mtDec = 11;
					var resultWeek = "";
					var strWeek = "";
					if (renderCDec % 7 === 3) {
						resultWeek = processWeek(mtDec, renderCDec);
						strWeek = "Wk" + resultWeek;
						return strWeek;
					}

				}
			},
			{
				"data": "Date",
				"title": "Day",
				render: function (data, type, row) {
					if (data)
						return moment(data).format("dd");
					else
						return '';
				}
			},
			{
				"data": "Date",
				"title": "Date",
				render: function (data, type, row) {
					if (data)
						return moment(data).format("D");
					else
						return '';
				}
			},
			{
				"data": "Shift1",
				"title": "Shift 1",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{
				"data": "Shift2",
				"title": "Shift 2",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{
				"data": "Shift3",
				"title": "Shift 3",
				render: function (data, type, row) {
					if (data.indexOf("#") >= 0)
						return '';
					else
						return data;
				}
			},
			{ "data": "Location", "name": "Location", "autoWidth": true },
			{ "data": "GroupType", "name": "GroupType", "autoWidth": true }
		],
		"fnDrawCallback": function () {
			$('#calDec_paginate')[0].style.display = "none";
		}
	});
}