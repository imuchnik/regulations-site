define("sub-head-view",["jquery","underscore","backbone","regs-dispatch","regs-helpers"],function(e,t,n,r,i){var s=n.View.extend({initialize:function(){r.on("activeSection:change",this.changeTitle,this)},changeTitle:function(e){return this.$el.html('<em class="header-label">'+i.idToRef(e)+"</em>"),this}});return s});