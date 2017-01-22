#Responsively crop copy, restore onclick via sliding drop-down animation


Responsively crop content copy down to a user-defined number of lines in an accessible manner.

Click to fully restore content via a sliding drop-down animation.

As used on Tesco's <a href="http://www.tesco.com/food-love-stories/">Food Love Stories</a>.

Vanilla JavaScript, small script <2kB minified and gzipped. Support down to IE9.

I believe <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 2 level AA accessible but as yet unconfirmed.

<strong>CodePen demo: <a href="http://codepen.io/2kool2/pen/PWmzMa">Responsively crop copy, restore onclick via sliding drop-down animation</a></strong>


<br>
##Example

<p data-height="265" data-theme-id="dark" data-slug-hash="PWmzMa" data-default-tab="js,result" data-user="2kool2" data-embed-version="2" data-pen-title="Responsively crop copy, restore onclick via slide animation" data-preview="true" class="codepen">See the Pen <a href="http://codepen.io/2kool2/pen/PWmzMa/">Responsively crop copy, restore onclick via slide animation</a> by mike foskett (<a href="http://codepen.io/2kool2">@2kool2</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

<br>
##Basic usage

Incude a link to the styles:

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
<script src="js/cropCopyRestore.2.0.min.js"></script>
```

<br>
##Status

In cross-browser / platform testing. Accessibility testing to follow.

CodePen demo: <a href="https://codepen.io/2kool2/pen/PWmzMa">Responsively crop copy, restore onclick via sliding drop-down animation</a>

GitHub repo: <a href="https://github.com/2kool2/crop-copy-slide-restore">crop-copy-slide-restore</a>


<hr>
Mike Foskett @ <a href="https://websemantics.uk/">webSemantics</a>
