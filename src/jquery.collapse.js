/*
 * Collapse plugin for jQuery
 * http://github.com/danielstocks/jQuery-Collapse/
 *
 * @author Daniel Stocks (http://webcloud.se)
 * Copyright 2010, Daniel Stocks
 * Released under the MIT, BSD, and GPL Licenses.
 */

(function($) {
    var collapse_context_global = 0; 
    // var cookie_blocks = JSON.parse($.cookie('collapse')) || {};

    var cookie_blocks = {
        cookie_blocks: {},
        
        load: function(hash) {
            this.cookie_blocks = hash || {}; 
        },
       
        get: function(collapse_context, container_index) {
            if (collapse_context !== undefined && container_index !== undefined) {
                return this.cookie_blocks[collapse_context][container_index];
            }
            return this.cookie_blocks;
        },

        set: function(collapse_context, container_index, index, splice) { 
            cb = this.cookie_blocks; 
            cb[collapse_context] = cb[collapse_context] || {};
              
            if (container_index !== undefined) {
                cb[collapse_context][container_index] = cb[collapse_context][container_index] || [];   

                if (index !== undefined) {
                    if (index instanceof Array && index == 0) {
                        cb[collapse_context][container_index] = [];
                    } else if (!splice) {
                        if (cb[collapse_context][container_index].indexOf(index) == -1) {
                            cb[collapse_context][container_index].push(index);
                            cb[collapse_context][container_index].sort();
                        }
                    } else {
                        var io = cb[collapse_context][container_index].indexOf(index);
                        cb[collapse_context][container_index].splice(io, 1);           
                    }
                } 
            } 
            this.cookie_blocks = cb; 
        }
    }

    $.fn.extend({
        collapse: function(init_options) {
            collapse_context_global++; 
            var collapse_context = collapse_context_global;
            
            // Initialize cookie_blocks "instance"
            cookie_blocks.set(collapse_context);

            var defaults = {
                cookies: false,
                accordion: false,
                header_tag : "h3",
                block_tag : "div, ul",
            };
            
            var options = $.extend(defaults, init_options);
            var accordion = options.accordion;
            var cookies  = options.cookies;

            if (cookies) { cookie_blocks.load(JSON.parse($.cookie('collapse'))) }

            var active = "active",
                inactive = "inactive";

            this.collapse_all = function() {
                this.children(options.block_tag).each(function(index, el){
                    $(el).trigger('hide');
                })
            } 

            this.expand_all = function() {
                this.children(options.block_tag).each(function(index, el){
                    $(el).trigger('show');
                })
            } 

            return this.each(function(container_index, elem) {
                cookie_blocks.set(collapse_context, container_index);
                var container = $(elem);
                var headers = container.children(options.header_tag);
                var blocks = container.children(options.block_tag);

                blocks.each(function() {
                    var block = $(this);

                    block.bind('show', function(e) {
                        var block = $(e.target); 
                        block.prev().addClass(active);
                        block.prev().removeClass(inactive);
                        block.show();
                    })

                    block.bind('hide', function(e) {
                        var block = $(e.target);
                        block.prev().removeClass(active);
                        block.prev().addClass(inactive);
                        block.hide();
                    })
                })
                
                headers.each(function(index, header) {
                    var header = $(header);
                
                    var is_header_active = $.inArray(index, cookie_blocks.get(collapse_context, container_index));
                    if (cookies && is_header_active > -1) {
                        header.next().trigger('show'); 
                    } else if (header.hasClass(active)) {
                        header.next().trigger('show'); 
                        cookie_blocks.set(collapse_context, container_index, index);
                    } else {
                        header.next().trigger('hide');  
                    } 

                    header.bind('click', function(e) {
                        var header = $(this); 

                        if (header.hasClass(active)) {
                            if (accordion) return;
                            header.next().trigger('hide'); 
                            cookie_blocks.set(collapse_context, container_index, index, true);
                        } else {
                            if (accordion) {
                                blocks.trigger('hide');
                                cookie_blocks.set(collapse_context, container_index, [])
                            }
                            header.next().trigger('show');
                            cookie_blocks.set(collapse_context, container_index, index);
                        }
                        $.cookie('collapse', JSON.stringify(cookie_blocks.get()), { path: '/'});
                    })
                })
               
                // No active sections? Open the first.
                if (!(headers).is('.active')) {
                    $(headers).first().trigger('click');
                }
            });
        }
    });

})(jQuery);
