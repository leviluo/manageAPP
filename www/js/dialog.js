function dialog(options){
	this.options = options
}

dialog.prototype = {
// 初始化数据
	init:function(){
		var me = this
		return new Promise(function(resolve,reject){
			ajax({
	            url: me.options.queryUrl, //请求地址        
	            type: "GET", //请求方式        
	            success: function(response, xml) {
	                resolve(me.dialogCreate(JSON.parse(response).data))
	            },
	            fail: function(status) {
	                console.log('请求失败', status)
	                reject(status)
	            }
	        });
		}) 
	},

// 对话框
	dialogCreate:function(data){
		if (!data) {
			var data = []
		};
		// this.data = data
		var me = this;
		var dialog = document.createElement('div');
			dialog.className = "dialog";

		var dialogHeader = document.createElement('div');
			dialogHeader.className = "dialogHeader";

		var h3 = document.createElement('h3')
		h3.innerHTML = me.options.header;
// 关闭
		var span = document.createElement('span')
		span.innerHTML = "×";
// 放大窗口
		var zoomin = document.createElement('span')
		zoomin.addEventListener('click',function(){
			if(window.getComputedStyle(dialog).width.slice(0,-2) * 1.3 > window.getComputedStyle(document.getElementById('dialogContent')).width.slice(0,-2)) return
			dialog.style.width = window.getComputedStyle(dialog).width.slice(0,-2) * 1.3 + 'px'
		})
		zoomin.innerHTML = "□";
// 缩小窗口
		var zoomout = document.createElement('span')
		zoomout.addEventListener('click',function(){
			if (window.getComputedStyle(dialog).width.slice(0,-2) / 1.3 < 400) return;
			dialog.style.width = window.getComputedStyle(dialog).width.slice(0,-2) / 1.3 + 'px'
		})
		zoomout.innerHTML = "□";

		dialogHeader.appendChild(h3)
		dialogHeader.appendChild(span)
		dialogHeader.appendChild(zoomin)
		dialogHeader.appendChild(zoomout)

	dialogBody = document.createElement('div');
	dialogBody.className = "dialogBody";

// 添加搜索条件
		for (var i = 0; i < this.options.queryCondition.length; i++) {
			var items = []
			for (var j = 0; j < data.length; j++) {
				 if (data[j][this.options.queryCondition[i].key]!= undefined) {
				 	items.push(data[j][this.options.queryCondition[i].key])
				 };
			};
		dialogBody.appendChild(inputselectCreate(this.options.queryCondition[i],items));
		};

		var button = buttonCreate("查找",function(){
			var items = data.concat()
			for (var j = 0; j < data.length; j++) {
			for (var i = 0; i < dialog.getElementsByClassName('selectinput').length; i++) {
					if(dialog.getElementsByClassName('selectinput')[i].getElementsByTagName('input')[0].value!='' && (data[j][dialog.getElementsByClassName('selectinput')[i].getElementsByTagName('input')[0].name] != dialog.getElementsByClassName('selectinput')[i].getElementsByTagName('input')[0].value)){
						console.log(data.length)
						items.splice(j-(data.length-items.length),1)
						// break
					}else{
						
					}
				};
			};
			table.removeChild(table.getElementsByTagName('tBody')[0]);
			table.appendChild(tBodyCreate(me.options.tableHeader,items))
		})

	dialogBody.appendChild(button)

// 添加主表格
	var table = tableCreate(me.options.tableHeader,data)

	dialogBody.appendChild(table)

// 其他操作

		var div = document.createElement('div')
		div.className = "dialogOperate"

		var add = buttonCreate("新增合约",function(){
			var form = formCreate({
				data:[{
						type:"input",
						id:"contractid",
						name:"合约名称",
					   },{
						type:"input",
						id:"contractid",
						name:"合约名称",
					   },{
						type:"input",
						id:"contractid",
						name:"合约名称",
					   },{
						type:"input",
						id:"contractid",
						name:"合约名称",
					   },{
						type:"input",
						id:"contractid",
						name:"合约名称",
					   },{
						type:"input",
						id:"contractid",
						name:"合约名称",
					   },
						{
						type:"select",
						id:"productid",
						name:"产品",
						items:[222,333]
					}],
				url:"/aaa/bbbb"
				})
			document.getElementById('modal').getElementsByTagName('b')[0].innerHTML = "新增合约"

			var contentBody = document.getElementById('modal').getElementsByClassName('content-body')[0]
			contentBody.innerHTML = '';
			contentBody.appendChild(form)

			var content = document.getElementById('modal').getElementsByClassName('content')[0]
			// var height = window.getComputedStyle(content,null).height.slice(0,-2)
			var width = window.getComputedStyle(content,null).width.slice(0,-2)

			content.style.left = (document.body.clientWidth - width)/2 + 'px'
			// content.style.top = (document.body.clientHeight - height)/2+'px'
			document.getElementById('modal').style.display = "block"
		})
		var deletebtn = buttonCreate("删除合约",function(){
			alert("删除合约")
		})

		div.appendChild(add)
		div.appendChild(deletebtn)
	dialogBody.appendChild(div)
		//添加窗体事件
		this.event = new Evts(dialogHeader,dialog,span)

		dialog.appendChild(dialogHeader)
		dialog.appendChild(dialogBody)
		return dialog
	},

}