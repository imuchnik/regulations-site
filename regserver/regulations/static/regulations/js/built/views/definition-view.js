define("definition-view",["jquery","underscore","backbone","regs-view","regs-data","regs-dispatch","regs-helpers"],function(e,t,n,r,i,s,o){var u=r.extend({className:"open-definition",events:{"click .close-button":"close","click .definition":"sendDefinitionLinkEvent","click .continue-link":"sendContinueLinkEvent"},formatInterpretations:function(){var t=this.$el.find(".inline-interpretation"),n;typeof t[0]!="undefined"&&(n=e("#"+this.model.id).data("interpId"),t.remove(),this.$el.append(o.fastLink("#"+n,"Related commentary","continue-link internal interp")))},removeHeadings:function(){var t=this.$el.find("dfn.key-term"),n;if(typeof t[0]!="undefined"){n=t.length;for(var r=0;r<n;r++)e(t[r]).remove()}},sendContinueLinkEvent:function(t){s.trigger("ga-event:definition",{action:"clicked continue link",context:e(t.target).attr("href")})},sendDefinitionLinkEvent:function(t){s.trigger("ga-event:definition",{action:"clicked key term inside definition",context:e(t.target).attr("href")})},render:function(){return this.$el.append(o.fastLink("#"+this.model.id,o.idToRef(this.model.id),"continue-link internal")),this.formatInterpretations(),this.removeHeadings(),this.$el.attr("tabindex","0").append('<a class="close-button" href="#">Close definition</a>'),s.trigger("definition:render",this.$el),this.$el.focus(),this},close:function(e){e.preventDefault(),s.remove("definition"),s.trigger("ga-event:definition",{action:"closed definition by tab-revealed link",context:this.model.id})},remove:function(){return this.stopListening(),this.$el.remove(),s.trigger("definition:remove",this.model.id),this}});return u});