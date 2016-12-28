function formCreate(items){
	var url = items.url;
	var data = items.data;
	var form = document.createElement('form');
	
	for (var i = 0; i < data.length; i++) {
		switch(data[i].type){
			case 'input':
				var input = inputCreate(data[i].name,data[i].id)
				form.appendChild(input)
				break
			case 'select':
				var select = selectCreate(data[i].name,data[i].id,data[i].items)
				form.appendChild(select)
				break
			default:

		}
	};

	var button = buttonCreate("提交",function(){
		alert(submit)
	});

	button.style.width = "100%"
	button.style.marginTop = "20px"
	form.appendChild(button)
	return form
}

function inputCreate(placeHolder,id,type){
	var input = document.createElement("input")
	input.setAttribute('placeHolder',placeHolder)
	input.name = id;
	input.type = type;
    return input
}

function selectCreate(labelText,id,items){
        var select = document.createElement("select")
        select.name = id

        for (var i = -1; i < items.length; i++) {
            var option = document.createElement("option")
            if (i == -1) {
                option.innerHTML = "--请选择"+labelText+'--'
            } else {
                option.innerHTML = items[i]
            }

            select.appendChild(option)
        }
        return select
}

// 输入搜索框
function inputselectCreate(condition,items){
		
		var span = document.createElement('span');
		span.className = "selectinput";

		var input = document.createElement('input');
		input.name = condition.key
		input.setAttribute('placeHolder',condition.header)

		var a = document.createElement('a');
		a.innerHTML = "∨"
		a.addEventListener('click',function(e){
			var event = event || window.event
	    	event.srcElement.parentNode.getElementsByTagName('ul')[0].style.display = event.srcElement.parentNode.getElementsByTagName('ul')[0].style.display != "block" ? "block" :"none"
			event.stopPropagation()
		},false)

		var ul = document.createElement('ul')

		for (var i = 0; i < items.length; i++) {
			var li = document.createElement('li')
			li.innerHTML = items[i]
			li.addEventListener('click',function(e){
				var event = event || window.event
				event.srcElement.parentNode.parentNode.getElementsByTagName('input')[0].value = event.srcElement.innerHTML;
				event.srcElement.parentNode.style.display = "none"
			},false)
			ul.appendChild(li);
		};

		span.appendChild(input)
		span.appendChild(a)
		span.appendChild(ul)
		return span
	}

// 创建button
function buttonCreate(text,action) {
        var Button = document.createElement("Button")
        Button.innerHTML = text
        Button.className = "btn-primary"
        Button.addEventListener("click", action, false);
        return Button
    }

// 创建表格
function tableCreate(theads,items){
		var mytable = document.createElement('table')
			mytable.setAttribute("cellspacing",0);
		
		var tHead = tHeader(theads,mytable)
		var tbody = tBodyCreate(theads,items)
		mytable.appendChild(tHead)
		mytable.appendChild(tbody)
		return mytable
	}

function tHeader(theads,mytable) {
    	var tHead = mytable.createTHead();
        var tr = document.createElement('tr');    //
        for (var i = -1; i < theads.length; i++) {
            var th = document.createElement('th')
            if (i==-1) {
            	var Checkbox = document.createElement('input');
            	var text = document.createTextNode("全选")
            	Checkbox.type = "Checkbox"
            	th.appendChild(Checkbox)
            	th.appendChild(text)
            	tr.appendChild(th)
            	continue
            };
			if(theads[i].cells){
				th.setAttribute("colspan",theads[i].cells);
			}
            if (typeof theads[i].value == 'string') {
                th.innerHTML = theads[i].value
            } else if (typeof theads[i].value == 'object') {
                th.appendChild(theads[i].value)
            }
            tr.appendChild(th)
        }
        tHead.appendChild(tr)
        return tHead
    }

function tBodyCreate(theads,items) {
    	// console.log(items)
    	var tbody = document.createElement('tbody')
	        for (var i = 0; i < items.length; i++) {
	        	var tr = document.createElement('tr'); 
	        	for (var j = -1; j < theads.length; j++) {
		        	if (j==-1) {
	        			var td = document.createElement('td')
	        			var Checkbox = document.createElement('input');
            			Checkbox.type = "Checkbox"
            			td.appendChild(Checkbox)
		        		tr.appendChild(td)
		        		continue
		        	};
	        		if (items[i][theads[j].key]!= undefined) {
	        			var td = document.createElement('td')
	        			td.innerHTML = items[i][theads[j].key];
	        			tr.appendChild(td)
	        		};
	        	};
	        	tbody.appendChild(tr)
	        };
	        return tbody
}