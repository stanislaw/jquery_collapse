$(document).ready(function() {
    module("Collapse - Cookies support");

    $.cookie('collapse', null);
    $.cookie('collapse', '{"1":{"0":[1,2]},"2":{"0":[1]}}');

    var el = $("#main .test").collapse({ cookies: true });
    var accordion_el = $("#main .accordion_test").collapse({ cookies: true, accordion: true });
    
    var headings = el.find("h3");
    var lists = el.find("ul");
    
    var first_heading = $(headings[0]);
    var second_heading = $(headings[1]);

    var first_list = $(lists[0]);
 
    module("Basic and accordion- modes");
    test("basic mode", function() {
        ok(first_list.is(':hidden', "first list is hidden"));
        equal(el.find('ul:hidden').length, 1, "two lists are hidden");
        ok(second_heading.hasClass('active'), 'second heading has class "active"');
    }); 
    
    test("accordion mode", function() {
        ok($(accordion_el.find("ul")[1]).is(":visible"), "second list is visible");
        equal($(accordion_el.find("ul").not(':visible')).length, 2, "two lists are hidden");
    });

    test("resulting cookie", function() {
        equal($.cookie('collapse'), '{"1":{"0":[1,2]},"2":{"0":[1]}}');
    });

});
