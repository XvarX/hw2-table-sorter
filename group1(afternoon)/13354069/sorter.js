window.onload = function() {
	var tables = getAllTables();
	makeAllTableSortable(tables);
};

function getAllTables() {
	return document.getElementsByTagName('table');
}

function makeAllTableSortable(tables) {
	for (var i = 0, len = tables.length; i < len; i++) {
		clickTh(tables[i]);
	}
}

function clickTh(table) {
	var ths = table.getElementsByTagName('th');
	for (var i = 0; i < ths.length; i++) {
		ths[i].onclick = function() {
			for (var j = 0; j < ths.length; j++) {
				if (j != this.cellIndex) ths[j].className = 'normal';
			}

			if (this.className == 'ascend') {
				this.className = 'descend';
				sortTable(table, this.cellIndex, 'down');
			} else {
				this.className = 'ascend';
				sortTable(table, this.cellIndex, 'up');
			}
		}
	}
}

function sortTable(table, index, UorD) {
	var tds = table.getElementsByTagName('td');
	var num_of_column = table.getElementsByTagName('th').length, num_of_row = parseInt(tds.length / num_of_column);
	var arr = [];
	for (var i = 0; i < num_of_row; i++) {
		arr[i] = tds[index + i * num_of_column];
	}

	var parent = table.getElementsByTagName('tbody')[0];
	var nodeP = [], nodeC = [];
	for (var i = index, k = 0; i < tds.length; i += num_of_column, k++) {
		nodeP[k] = parent.getElementsByTagName('tr')[k].cloneNode(true);
		nodeC[k] = parent.getElementsByTagName('td')[i].cloneNode(true);
	}

	if (UorD == 'up')  arr.sort(ascendSort);
	else arr.sort(descendSort);
	
	for (var i = 0; i < num_of_row; i++) {
		for (var j = 0; j < num_of_row; j++) {
			if (nodeC[j].innerHTML == arr[i].innerHTML) {
				parent.replaceChild(nodeP[j], parent.getElementsByTagName('tr')[i]);
				break;
			}
		}
	}
}

function ascendSort(a, b) { //去除html标签
	return a.innerHTML.replace(/<[^>].*?>/g, "") > b.innerHTML.replace(/<[^>].*?>/g, "");
}

function descendSort(a, b) { 
	return a.innerHTML.replace(/<[^>].*?>/g, "") < b.innerHTML.replace(/<[^>].*?>/g, "");
}