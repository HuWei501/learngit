(function($){
	//alert($);
	//默认参数
	var defaults = {
		data:[]
	}
	var _propotype = {
		printLength:function(){
			alert(this.ops.data.length);
		},
		init:function(){
			this.$root = $('<ul class="dn-menu-wrapper"></ul>');
			this._render();
			this.append(this.$root);
		},
		_render:function(){
			var _self = this;
			var _$root = this.$root;
			$.each(this.ops.data,function(index,item){
				// console.log(item);
				// 判断是否有子元素
				if(item.child && item.child.length>0){
					var $item = $('<li><a href="'+item.url+'"><i class="'+ item.iconClass +'"></i>'+item.text+'<span class="fa fa-bars"></span></a></li>');
					_self._genChilds($item,item.child);
					_$root.append($item);	
				}else{
					_$root.append($('<li><a href="'+item.url+'"><i class="'+ item.iconClass +'"></i>'+item.text+'</a></li>'));
				}
			});
		},
		_genChilds:function($i,data){
			var $ul = $('<ul></ul>');
			$.each(data,function(index,item){
				$ul.append('<li><a href="'+item.url+'">'+item.text+'</a></li>');
			});
			$i.append($ul);
		},
	};
	$.fn.DnMenu = function(ops){
		this.ops = $.extend(defaults,ops);
		//console.log(this.ops.data);
		$.extend(this,_propotype);
		//this.printLength();
		this.init();
		//把this注册，作用是 调用对象的功能方法
		this.data('DnMenu',this);
	}
})(jQuery);