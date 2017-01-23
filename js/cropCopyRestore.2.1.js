// Crop copy responsively, to user-defined number of lines, then restore onclick - v2.1 (IE9+) - 23/01/2017 - M.J.Foskett - https://websemantics.uk/
var cropCopyRestore = (function (window, document) {

  "use strict";

  var dataAttr = "data-cropCopyRestore";
  var buttonId = "CCR_btn-";
  var ellipsis = "…"; // "\u2026"
  var clonedClass = "CCR-clone";
  var expandedClass = "CCR-expanded";
  var textClass = "CCR_txt"; // html text content class
  var copyClass = "CCR_copy"; // span added inside textClass to contain just the copy
  var iconSVG = "<span class=CCR_icon><svg class=CCR_svg focussable=false><use class=CCR_use-plus xlink:href=#icon-vert></use><use xlink:href=#icon-hori></use></svg></span>";
  var readMoreSpan = "<span class=visually-hidden> [Read more]</span>";

  // Debounce window resize - https://john-dugan.com/javascript-debounce/
  var debounce=function(e,t,n){var a;return function(){var r=this,i=arguments,o=function(){a=null,n||e.apply(r,i)},s=n&&!a;clearTimeout(a),a=setTimeout(o,t||200),s&&e.apply(r,i)}};

  // transitionend event test and prefix - https://gist.github.com/O-Zone/7230245
  !function(n){var i={transition:"transitionend",WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend"},t=document.createElement("div");for(var o in i)if("undefined"!=typeof t.style[o]){n.transitionEnd=i[o];break}}(window);

  // Minimal classList polyfill (for IE9) - Devon Govett - https://gist.github.com/devongovett/1381839
  "classList"in document.documentElement||!Object.defineProperty||"undefined"==typeof HTMLElement||Object.defineProperty(HTMLElement.prototype,"classList",{get:function(){function e(e){return function(t){var s=n.className.split(/\s+/),i=s.indexOf(t);e(s,i,t),n.className=s.join(" ")}}var n=this,t={add:e(function(e,n,t){~n||e.push(t)}),remove:e(function(e,n){~n&&e.splice(n,1)}),toggle:e(function(e,n,t){~n?e.splice(n,1):e.push(t)}),contains:function(e){return!!~n.className.split(/\s+/).indexOf(e)},item:function(e){return n.className.split(/\s+/)[e]||null}};return Object.defineProperty(t,"length",{get:function(){return n.className.split(/\s+/).length}}),t}});


// String cropping functions

  function _removeLastOccur(str, removeStr) {
    return str.substring(0, str.lastIndexOf(removeStr));
  }

  function _removeTrailingPunct(str) {
    return str.replace(/[ .,!?:;"“‘'\-]+$/, "");
  }


// Display and animation functions

  function _display(obj, str) {
    obj.querySelector("." + copyClass).textContent = str;
  }

  function _displayCroppedText(obj) {
    _display(obj, obj.croppedText + ellipsis);
    if (!obj.innerHTML.match("visually-hidden")) {
      obj.innerHTML +=  readMoreSpan;
    }
  }

  function _resetAttr(obj, bool) {
    obj.setAttribute("aria-expanded", bool);
  }

  function _addRemainerText(obj) {

    function __add(obj) {
      _display(obj, obj.fullText);
      obj.removeChild(obj.querySelector(".visually-hidden"));
      _resetAttr(obj, true);
    }

    // maybe use a polyfill?
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(function() {
        __add(obj);
      });
    } else {
      __add(obj);
    }
  }

  function _removeRemainerText(obj) {
    if (obj) {
      _displayCroppedText(obj);
      _resetAttr(obj, false);
    }
  }


// Set copy

  function _createClone(obj, str) {
    // create an invisible clone (used to get an objects height)
    var clone = obj.cloneNode(true);
    clone.classList.add(clonedClass);
    if (clone.querySelector("." + copyClass)) {
      clone.querySelector("." + copyClass).textContent = str;
      obj.parentNode.insertBefore(clone, obj.nextSibling);
      clone.initialHeight = clone.clientHeight;
    }
    return clone;
  }


  function _getCroppedHeight(obj) {
    var clone =_createClone(obj, obj.croppedText);
    obj.parentNode.removeChild(clone);
    return clone.initialHeight;
  }


  function _getFullHeight(obj) {
    var clone =_createClone(obj, obj.fullText);
    obj.parentNode.removeChild(clone);
    return clone.initialHeight;
  }


  function _getCroppedText(obj) {
    var txtArr = obj.fullText.split(" ");
    var i = 0;
    var lines = 1;
    var clone = _createClone(obj, txtArr[i] + " ");
    var textObj = clone.querySelector("." + copyClass);

    for (i = 1; i < txtArr.length; i++) {

      textObj.textContent += txtArr[i] + ellipsis;

      if (clone.clientHeight !== clone.initialHeight) {

        if (lines + "" === obj.noOfLines) {

          _display(clone, _removeLastOccur(textObj.textContent, txtArr[i] + ellipsis));

          obj.croppedMaxHeight = clone.clientHeight;
          obj.parentNode.setAttribute("style", "max-height:" + obj.croppedMaxHeight + "px");
          break;
        }
        lines++;
        clone.initialHeight = clone.clientHeight;
      }

      // Bit of an assumption
      _display(clone, textObj.textContent.replace(txtArr[i] + ellipsis, txtArr[i] + " "));

    }

    _display(clone, _removeTrailingPunct(textObj.textContent));
    obj.parentNode.removeChild(clone);
    return textObj.textContent;
  }


// Handle events

  function _removeText(event) {
    var obj = event.target.p;
    delete event.target.p;
    event.target.removeEventListener(window.transitionEnd, _removeText);
    _removeRemainerText(obj);
  }


  function _getButtonObj(obj) {
    if (obj && obj.classList.contains(textClass)) {
      return obj;
    }
    if (obj.parentNode === null) {
      return false;
    }
    return _getButtonObj(obj.parentNode);
  }


  function _clicked(event) {

    var obj = _getButtonObj(event.target);

    if (obj) {
      if (obj.getAttribute("aria-expanded") === "true") {
        obj.parentNode.style.maxHeight = _getCroppedHeight(obj) + "px";
        obj.parentNode.classList.remove(expandedClass);
        obj.parentNode.p = obj;
        if (window.transitionEnd) {
          obj.parentNode.addEventListener(window.transitionEnd, _removeText, false);
        } else {
          _removeRemainerText(obj);
        }
      } else {
        obj.parentNode.style.maxHeight = _getFullHeight(obj) + "px";
        obj.parentNode.classList.add(expandedClass);
        _addRemainerText(obj);
      }
    }

    event.preventDefault();
  }

  function _keyPressed(event) {
    // Enter or space key
    if (event.which === 13 || event.which === 32) {
      _clicked(event);
    }
  }

  function _addEvents(obj) {
    obj.addEventListener("click", _clicked, false);
    obj.addEventListener("keydown", _keyPressed, false);
  }

  function _removeEvents(obj) {
    obj.removeEventListener("click", _clicked);
    obj.removeEventListener("keydown", _keyPressed);
  }

// Initialisation

  function _initialiseAttributes(obj, i) {
    var str = obj.getAttribute(dataAttr);
    obj.noOfLines = (/^([1-9]\d*)$/.test(str)) ? str : "1"; // Returns 1 - 9 only
    obj.fullText = obj.textContent.trim();
    obj.setAttribute("id", obj.id || buttonId + i);
    obj.setAttribute("role", "button");
    obj.setAttribute("tabindex", "0");
    obj.setAttribute("aria-controls", obj.id);
  }

  function _prepareContent(obj) {

    // Quick and dirty - replace if you wish
    obj.innerHTML =  iconSVG + "<span role=alert aria-live=assertive class=" + copyClass + ">" +obj.innerHTML + "</span>";
  }

  function start() {

    var objs = document.querySelectorAll("[" + dataAttr + "]");
    var i = objs.length;
    var obj;

    while (i--) {

      obj = objs[i];

      // In case it's a resize call rather than initialisation
      if (obj.fullText) {
        obj.parentNode.classList.remove(expandedClass);
        _removeEvents(obj);
      } else {
        _prepareContent(obj);
        _initialiseAttributes(obj, i);
      }

      // Reset, or initialise, common attributes
      _resetAttr(obj, false);
      obj.croppedText = _getCroppedText(obj);

      _displayCroppedText(obj);
      _addEvents(obj);
    }
  }

  start();
  window.addEventListener("resize", debounce(start, 100, false), false);

}(window, document));

window.addEventListener("load", cropCopyRestore, false);
