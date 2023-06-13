import Vue from 'vue'

const defaultOpt = function(Vue) {
    Vue.prototype.$showDialogEnc = function(item) {
        var that = this;
        var _width, _height;
        var _center;
      //  var bodywidth = that.$store.state.rightisopen;
        if (item.width !== undefined) {
            if (typeof item.width === "string") {
                if (item.width.length >= 2 && item.width.substr(-2) == "px") {
                    _width = parseInt(item.width.replace("px", ""));
                }
                if (item.width.length >= 1 && item.width.substr(-1) == "%") {
                    _width = parseInt(item.width.replace("%", ""));
                    _width = document.body.clientWidth * _width;
                }
                if (/^d+$/.test(item.width)) {
                    _width = parseInt(item.width);
                }
            }
            if (typeof item.width === "number") {
                _width = item.width;
            }
            if (!_width) {
                console.error("无效的Dialog宽度");
            }
        } else {
            _width = 1284;
        }
        if (item.height !== undefined) {
            if (typeof item.height === "string") {
                if (item.height.length >= 2 && item.height.substr(-2) == "px") {
                    _height = parseInt(item.height.replace("px", ""));
                }
                if (item.height.length >= 1 && item.height.substr(-1) == "%") {
                    _height = parseInt(item.height.replace("%", ""));
                    _height = document.body.clientHeight * _height;
                }
                if (/^d+$/.test(item.height)) {
                    _height = parseInt(item.height);
                }
            }
            if (typeof item.height === "number") {
                _height = item.height;
            }
            if (!_height) {
                console.error("无效的Dialog高度");
            }
        } else {
            _height = 990;
        }
        var _left, _top;
        if (item.left !== undefined) {
            if (typeof item.left === "string") {
                if (item.left.length >= 2 && item.left.substr(-2) == "px") {
                    _left = parseInt(item.left.replace("px", ""));
                }
                if (/^d+$/.test(item.left)) {
                    _left = parseInt(item.left);
                }
                if(item.left === "keepRight"){
                    _left = (document.body.clientWidth - 0 -  _width)>0?(document.body.clientWidth - 0 -  _width):0;
                }
                if(item.left === "center"){
                    _left = (document.body.clientWidth - _width)/2>0?(document.body.clientWidth - _width)/2:0;
                }
            }
            if (typeof item.left === "number") {
                _left = item.left;
            }
            if (typeof item.left === "function") {
                _left = item.left(_width, _height, that);
            }
        } else {
            _left = 0;
            //_left = ((bodywidth - _width) > 0 ? (bodywidth - _width) * 0.5 : 0);
        }
        if (item.top !== undefined) {
            if (typeof item.top === "string") {
                if (item.top.length >= 2 && item.top.substr(-2) == "px") {
                    _top = parseInt(item.top.replace("px", ""));
                }
                if (/^d+$/.test(item.top)) {
                    _top = parseInt(item.top);
                }
                if(item.left === "center"){
                    _top = (document.body.clientHeight - _height)/2>0?(document.body.clientHeight - _height)/2:0;
                }
            }
            if (typeof item.top === "number") {
                _top = item.top;
            }
            if (typeof item.top === "function") {
                _top = item.top(_width, _height, that);
            }
        } else {
            // _top = (document.body.clientHeight - _height) * 0.5;
            _top = 76;
        }
        var result = Object.assign({}, item);
        result.title = item.contentAlias && typeof item.contentAlias === "function" ?
            item.contentAlias() : item.content,
            result.name = item.name && typeof item.name === "function" ?
            item.name() : item.name,
            result.width = item.width || _width + "px",
            result.height = item.height || _height + "px",
            result.left = _left + "px",
            result.top = _top + "px",
            result.iscenter = _center
        that.$showDialog(result);
    };
}

export default defaultOpt;