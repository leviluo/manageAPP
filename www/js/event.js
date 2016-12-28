function Evts(header,dialog,close) {
    this.header = header;
    this.dialog = dialog;
    this.close = close;
    this.addMoveEvent();
}

Evts.prototype = {
    addMoveEvent: function() {
        var canvasId = this.canvasId
        var _this = this;
        // console.log(this.element)
        this.header.addEventListener("mousedown",function(e) {
                _this.onStart(e)
            })
        this.header.addEventListener("mousemove",function(e) {
                _this.onMove(e)
            })
        this.header.addEventListener("mouseout",function(e) {
                _this.onEnd(e)
            })
        this.header.addEventListener("mouseup",function(e) {
                _this.onEnd(e)
            })
        //选中dialog，显示为最顶层
        this.dialog.addEventListener("click",function(e) {
                _this.showInTop(e)
            })
        this.close.addEventListener("click",function(e) {
                _this.removeDialog(e)
            })
    },
    onStart:function(e){
        this.showInTop();
        this.isMove = true;
        this.startX = e.clientX;
        this.startY = e.clientY; 
    },
    onMove:function(e){
        if (!this.isMove) return;
        var diffX = e.clientX - this.startX
        var diffY = e.clientY - this.startY
        var currentStartX = window.getComputedStyle(this.dialog).left.slice(0,-2);
        var currentStartY = window.getComputedStyle(this.dialog).top.slice(0,-2);

        
        if((e.clientX - e.offsetX) <= 200){
            this.dialog.style.left = 0;
            return
        }
        if((e.clientY - e.offsetY) <= 50){
            this.dialog.style.top = 0;
            return
        }

        this.dialog.style.left = parseInt(currentStartX) + diffX + 'px'
        this.dialog.style.top = parseInt(currentStartY) + diffY + 'px'

        this.startX = e.clientX;
        this.startY = e.clientY;

    },
    onEnd:function(e){
        this.isMove = false;
        // console.log("onEnd")
    },
    showInTop:function(e){
        var items = document.getElementsByClassName('dialog');
        for (var i = 0; i < items.length; i++) {
            items[i].style.zIndex = 0
        };
        this.dialog.style.zIndex = 10
        for (var i = 0; i < this.dialog.getElementsByTagName('ul').length; i++) {
             this.dialog.getElementsByTagName('ul')[i].style.display = "none"
        }; 
    },
    removeDialog:function(e){
        this.dialog.parentNode.removeChild(this.dialog)
    }
}
