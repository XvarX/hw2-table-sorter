window.onload = function()
{
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

function getAllTables()
{
	return document.getElementsByTagName("table");
}

function makeAllTablesSortable(tables)
{
	for (var i=0; i<tables.length; i++)
	{
		var tHead = tables[i].getElementsByTagName("thead");
		var hTr = tHead[0].getElementsByTagName("tr");
		var hTh = hTr[0].getElementsByTagName("th");
		
		for (var j=0; j<hTh.length; j++)
		{
			//console.log(hTh[j]);
			//var img = "<img />";
			var bool;
			hTh[j].onclick = function()
			{
				//��ȡ����ı��
				var tBody = this.parentNode.parentNode.nextSibling.nextSibling;
				var bTr = tBody.rows;
				var arr = new Array();
				for (var k=0; k<bTr.length; k++)
					arr.push(bTr[k]);
				
				//��õ�����к�
				var tmpHeads = this.parentNode.getElementsByTagName("th");
				var col;
				for (var k=0; k<tmpHeads.length; k++)
				{
					if (tmpHeads[k] == this)
						col = k;
				}
				
				//�Ƿ��ѱ�ѡ�У�����������
				if (this.className == "")
				{
                    bool = 1;
                    var bro = this.parentNode.getElementsByTagName("th");
                    for (var k=0; k<bro.length; k++)
					{
                        bro[k].className = "";
					}
                    this.className = "clicked";
					arr.sort(cmp(col));
						
                }
				else
				{
					arr.reverse();
					if (bool == 1)
						bool = 0;
					else
						bool = 1;
				}
				var str = this.innerHTML;
				var count = 0;
				for (var k=0; k<str.length; k++)
				{
					if(str[k] != '<')
						count++;
				}
				this.innerHTML = str.substring(0, count);
				if (bool == 1)
					this.innerHTML = this.innerHTML + "<img src = 'ascend.png' />";
				else
					this.innerHTML = this.innerHTML + "<img src = 'descend.png' />";
				
				//����alternate
				for(var k=0; k<arr.length; k++)
				{
					if(k%2 == 0)
						arr[k].className = "";
					else
						arr[k].className = "alternate";
				}
				
				//����������tbody
				var oFragment = document.createDocumentFragment();
				for (var k=0; k < arr.length; k++)
				{
					oFragment.appendChild(arr[k]);
				}
				tBody.appendChild(oFragment);
			}
		}
	}
}

function cmp(col)
{
	return function (obj1, obj2)
	{
		var fst = obj1.cells[col];
		var snd = obj2.cells[col];
		if (fst.innerText > snd.innerText)
			return 1;
		else if (fst.innerText < snd.innerText)
			return -1;
		else
			return 0;
	};
}