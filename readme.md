#Crop copy then restore onclick


Responsively crop your content copy down to a user-defined number of lines, all in an accessible manner.

Click to fully restore the content via a sliding drop-down animation.


<br>
##Demo

<strong>CodePen: <a href="http://codepen.io/2kool2/pen/PWmzMa">Responsively crop copy, restore onclick via sliding drop-down animation</a></strong>

As used on Tesco's <a href="http://www.tesco.com/food-love-stories/">Food Love Stories</a>.


<br>
##Basic usage

Include a link to the styles:

```html
<link rel="stylesheet" href="css/styles.css">
```

Add content block(s) with data attribute (value = number of lines to display).

```html
<div class="CCR">
  <div class="CCR_txt" data-cropCopyRestore="2">
    Content copy...
  </div>
</div>
```

Include a link to the script:

```html
<script src="js/cropCopyRestore.2.1.min.js"></script>
```

<br>
##Features

* User-defined number of lines initially displayed, defined in the HTML.
* JavaScript writes an accurate inline max-height property and is animated via CSS.
* Resizing the viewport recalculates the length of text displayed and adjusts the max-height values.
* Utilises ARIA roles and live region to help meet accessibility <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 2.
* Vanilla JavaScript and less than 2kB minified &amp; gzipped.
* Support down to IE9.


<br>
##Status

Cross-browser tested:<br>
  Mac: Firefox Dev, Chrome, Safari, Opera Dev.<br>
  PC: Firefox Dev, Chrome, IE9 - Edge.

In Live testing.<br>To be followed by full accessibility testing.

CodePen demo: <a href="https://codepen.io/2kool2/pen/PWmzMa">Responsively crop copy, restore onclick via sliding drop-down animation</a>

GitHub repo: <a href="https://github.com/2kool2/crop-copy-slide-restore">crop-copy-slide-restore</a>


<hr>
Mike Foskett @ <a href="https://websemantics.uk/">webSemantics</a>
