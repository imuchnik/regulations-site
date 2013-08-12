define("content-view",["jquery","underscore","backbone","jquery-scrollstop","regs-dispatch","definition-view","sub-head-view"],function(e,t,n,r,i,s,o){var u=n.View.extend({el:".main-content",events:{"click .definition":"termLinkHandler","click .inline-interp-header":"expandInterp","mouseenter *[data-permalink-section]":"showPermalink"},initialize:function(){var n,r;i.on("definition:remove",this.closeDefinition,this),i.on("toc:click",this.changeFocus,this),e(window).on("scrollstop",t.bind(this.checkActiveSection,this)),this.$sections={},this.$contentHeader=e("header.reg-header"),this.$contentContainer=this.$el.find(".level-1 li[id], .reg-section, .appendix-section, .supplement-section"),this.activeSection="",this.$activeSection="",this.$window=e(window),n=this.$contentContainer.length;for(r=0;r<n;r++)this.$sections[r]=e(this.$contentContainer[r]);this.header=new o},checkActiveSection:function(){var e=this.$contentContainer.length-1;for(var n=0;n<=e;n++)if(this.$sections[n].offset().top+this.$contentHeader.height()>=this.$window.scrollTop())if(t.isEmpty(this.activeSection)||this.activeSection!==this.$sections[n].id){this.activeSection=this.$sections[n][0].id,this.$activeSection=this.$sections[n][0],i.trigger("activeSection:change",this.activeSection);return}return this},closeDefinition:function(){this.clearActiveTerms(),i.trigger("ga-event:definition",{action:"clicked key term to close definition",context:this.openDefinition.id})},toggleDefinition:function(e){return this.setActiveTerm(e),this},termLinkHandler:function(t){t.preventDefault();var n=e(t.target),r=n.attr("data-definition");return n.data("active")?i.remove("definition"):i.getViewId("definition")===r?this.toggleDefinition(n):(i.remove("definition"),this.openDefinition(r,n)),this},openDefinition:function(e,t){var n=new s({id:e,$anchor:t});return i.set("definition",n),i.trigger("ga-event:definition",{action:"clicked key term to open definition",context:e}),this.setActiveTerm(t),n},expandInterp:function(t){t.stopPropagation();var n=e(t.currentTarget),r=n.parent(),i=n.find(".expand-button");return r.toggleClass("open"),n.next(".hidden").slideToggle(),i.html(r.hasClass("open")?"Hide":"Show"),this},showPermalink:function(t){e(".permalink-marker").remove();var n=document.createElement("a"),r=e(t.currentTarget),s;n.href="#"+r[0].id,n.innerHTML="Permalink",n.className="permalink-marker",s=e(n),r.children().first().prepend(s),i.trigger("ga-event:permalink",e(t.target).attr("href"))},changeFocus:function(t){e(t).focus()},clearActiveTerms:function(){this.$el.find(".active.definition").removeClass("active").removeData("active")},setActiveTerm:function(e){this.clearActiveTerms(),e.addClass("active").data("active",1)}});return u});