# replaceholder
Replace placeholders with correct images if they exist.

This is jQuery plugin, so you'll need to have an access to jquery instance on your page or as Require/CommonJS dependency.

## Example

#### JS:
```js
$('.replaceholder').replaceholder();
```

#### HTML:
```html
<img class="replaceholder"
     src="/img/placeholders/100x100.png"
     data-src="source_image.png"
     alt="">

<div class="replaceholder"
     style="background-image: url('/img/placeholders/640x480.png');"
     data-type="bg"
     data-src="source_image.png">

<!-- Will be changed into the following once loaded: -->

<img class="replaceholder"
     src="source_image.png"
     data-src="source_image.png"
     alt="">

<div class="replaceholder"
     style="background-image: url('source_image.png');"
     data-type="bg"
     data-src="source_image.png">
```

## Options *(since v.1.1.0)*

You can pass options object as parameter to add classes when image will be loaded or return error. This can be helpful if you use fontawesome icons as placeholders. For example:

#### JS:
```js
var options = {
    src: 'newImage.png', // required image url
    bg: true,            // replaces src attribute (false) or background-image style (true) of the element
    doneClass: 'done',   // class or classes that will be added to the element when image is loaded
    failClass: 'failed', // class or classes that will be added to the element if image can't be loaded
    replaceClass: false  // doneClass and failClass will rewrite (true) or be added (false) current value
};

$('.thumbnail > li').replaceholder(options);
```

#### HTML:
```html
<ul class="thumbnail">
    <li>Element 1</li>
    <li>Element 2</li>
    <li>Element 3</li>
</ul>

<!-- Will be changed into the following once loaded: -->

<ul class="thumbnail">
    <li class="failed">Element 1</li>
    <li class="failed">Element 2</li>
    <li class="failed">Element 3</li>
</ul>

<!-- or -->

<ul class="thumbnail">
    <li class="done" style="background-image: url(newImage.png);">Element 1</li>
    <li class="done" style="background-image: url(newImage.png);">Element 2</li>
    <li class="done" style="background-image: url(newImage.png);">Element 3</li>
</ul>
```
