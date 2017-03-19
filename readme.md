<h1>Crop copy then restore on-click</h1>


Responsively crop your content copy down to a user-defined number of lines.

Click to fully restore the content via a sliding drop-down animation.

All delivered in an accessible manner.


<br>
<h2>Demo</h2>

<strong>CodePen: <a href="http://codepen.io/2kool2/pen/PWmzMa">Responsively crop copy, restore onclick via sliding drop-down animation</a></strong>

As used on Tesco's <a href="http://www.tesco.com/food-love-stories/">Food Love Stories</a>.


<br>
<h2>Basic usage</h2>

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
<h2>Features</h2>

* User-defined number of lines initially displayed, defined in the HTML.
* JavaScript writes an accurate inline max-height property which is animated via CSS.
* Resizing the viewport recalculates the length of text displayed and adjusts the max-height values.
* Utilises ARIA roles and live region to help meet <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 2 (accessibility).
* Vanilla JavaScript and less than 2kB minified &amp; gzipped.
* Support down to IE9.


<br>
<h2>Status</h2>

Cross-browser tested:<br>
  Mac: Firefox Dev, Chrome, Safari, Opera Dev.<br>
  PC: Firefox Dev, Chrome, IE9 - Edge.

In Live testing.<br>To be followed by full accessibility testing.

CodePen demo: <a href="https://codepen.io/2kool2/pen/PWmzMa">Responsively crop copy, restore onclick via sliding drop-down animation</a>

GitHub repo: <a href="https://github.com/2kool2/crop-copy-slide-restore">crop-copy-slide-restore</a>


<hr>
Mike Foskett @ <a href="https://websemantics.uk/">webSemantics</a>
