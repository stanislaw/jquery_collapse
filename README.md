# jQuery Collapse plugin

It's one more of jQuery Collapse plugin variations. Inspired by Daniel
Stock's [jQuery-Collapse](https://github.com/danielstocks/jQuery-Collapse)

It acts as collapse (default) or accordion ({accordion: true} option).

Dec, 26th. WARNING: It is raw and was not tested enough yet.

## Usage

You have container with following structure (h3s for collapse headers, block elements immediatedly following them for collapsible content):

```html
<div id="some_container">
  <h3>Header #1</h3>
  <div>I am collapsible section #1</div>
  <h3>Header #2</h3>
  <div>I am collapsible section #2</div>
  ... and so on
</div>
```

And then:

```html
$('#some_container').collapse();
```

## Options

- accordion: true (default: false) - enables accordion mode - only one
  section can be open at a time;
- cookies: true (default: false) - enables cookies support - if you
  reload page, plugin will remember opened sections and they will stay opened.

## TODO

- Some tricky things with auto-height;

