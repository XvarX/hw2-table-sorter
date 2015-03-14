
window.onload = function () {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

function getAllTables() {
	var tables;
	tables = document.getElementsByTagName("table");
    return tables; 
}

function makeAllTablesSortable(tables) {
	var l = tables.length;
	for (var i = 0; i < l; i++) {
		var thead = tables[i].children;
		var tr = thead[0].children;
		var ths = tr[0].children;
		var thl = ths.length;
		for (var j = 0; j < thl; j++) {
			ths[j].addEventListener("click", sortHandler);
			ths[j].setAttribute('class', 'first');
			ths[j].style.backgroundColor = "blue";
		}
	}
}

var column;
function sortHandler() {
	var parent = this.parentNode.parentNode.parentNode.children[1];
	column = this.cellIndex;
	var newArrow = document.createElement("img");
	var oldArrow = this.getElementsByTagName("img");
	var oldSrc = '';
	//If there's an arrow already, reverse the table and the arrow
	if (oldArrow.length) {
		var tmp = oldArrow[0].currentSrc.split('/');
		var l = tmp.length;
		oldSrc = tmp[l-1];
		this.removeChild(oldArrow[0]);
		if (oldSrc === 'ascend.png') {
			newArrow.src = "descend.png";
		} else {
			newArrow.src = "ascend.png";
		}
		reverse(parent);
	//Else set an ascend arrow and search the former arrow in the rows, delete it 
	} else {
		var p = this.parentNode.children;
		var lp = p.length;
		for (var i = 0; i < lp; i++) {
			var former = p[i].getElementsByTagName("img");
			if (former.length) {
				p[i].removeChild(former[0]);
				p[i].style.backgroundColor = "blue";
				break;
			}
		}
		newArrow.src = "ascend.png";
		sort(parent);
	}
	newArrow.style.float = "right";
	this.appendChild(newArrow);
	this.style.backgroundColor = "rgb(146, 182, 237)";
}
//sort the table
function sort(parent) {
	var toSort = [];
	var l = parent.children.length;
	for (var i = 0; i < l; i++) {
		toSort.push(parent.children[0]);
		parent.removeChild(parent.children[0]);
	}
	var small, str1, str2;
	for (var i = 0; i < l; i++) {
		small = toSort[i];
		str1 = small.children[column].innerHTML;
		for (var j = i+1; j < l; j++) {
			str2 = toSort[j].children[column].innerHTML;
			if (str1 > str2) {
				var tmp = small;
				small = toSort[j];
				str1 = str2;
				toSort[j] = tmp;
			}	
		}
		parent.appendChild(small);
	}
}
//reverse the table
function reverse(parent) {
	var toSort = [];
	var l = parent.children.length;
	for (var i = 0; i < l; i++) {
		toSort.push(parent.children[0]);
		parent.removeChild(parent.children[0]);
	}
	for (var i = 0; i < l; i++) {
		parent.appendChild(toSort[l-1-i]);
	}
}
