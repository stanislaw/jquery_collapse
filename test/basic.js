$(document).ready(function() {
    $.cookie('collapse', null);

    var el = $("#main .test").collapse();
    var accordion_el = $("#main .accordion_test").collapse({ accordion: true });
    
    var headings = el.find("h3");
    var lists = el.find("ul");
    
    var first_heading = $(headings[0]);
    var second_heading = $(headings[1]);

    var first_list = $(lists[0]);
    
    module("Collapse - basic features");
    test("initial layout", function() {
        equals(headings.filter(".inactive").length, 3, "Three inactive headings");
        equals(el.find("ul:hidden").length, 3, "Three hidden lists");
    });

    test("expand_all, collapse_all", function() {
        el.collapse_all();
        equals(el.find("ul:hidden").length, 3, "Three lists are all hidden again");
        el.expand_all();
        equals(el.find("ul:visible").length, 3, "Three lists are all visible again");
        el.collapse_all();
        equals(el.find("ul:hidden").length, 3, "Three lists are all hidden again");
    })

    test("basic clicks", function() {
        first_heading.trigger('click');
        
        ok(first_list.is(":visible"), "First list is visible");
        equals(el.find("ul:hidden").length, 2, "Two lists are left hidden");

        first_heading.trigger('click');
 
        ok(first_list.is(":hidden"), "First list is hidden");
        equals(el.find("ul:hidden").length, 3, "Three lists are all hidden again");
    });

    module("Basic and accordeon- modes");
    test("basic, non-accordeon mode", function() {
        first_heading.trigger('click');
        second_heading.trigger('click');
        equals(el.find("ul:hidden").length, 1, "One list is left hidden")
    })

    test("accordeon mode", function() {
        accordion_el.find('h3:first').trigger('click');
        accordion_el.find('h3:last').trigger('click');       
        equals(accordion_el.find("ul:hidden").length, 2, "One list is left hidden");
    })

});
