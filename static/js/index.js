var $container = $('.container');
var $backdrop = $('.backdrop');
var $highlights = $('.highlights');
var $textarea = $('textarea');
var $toggle = $('button');
var forAnnotation = [{'start':37,'end':39,'desc':'annotation2'},{'start':22,'end':24,'desc':'annotation1'}]
// yeah, browser sniffing sucks, but there are browser-specific quirks to handle that are not a matter of feature detection
var ua = window.navigator.userAgent.toLowerCase();
var isIE = !!ua.match(/msie|trident\/7|edge/);
var isWinPhone = ua.indexOf('windows phone') !== -1;
var isIOS = !isWinPhone && !!ua.match(/ipad|iphone|ipod/);

function applyHighlights(text) {
  text = text
    .replace(/\n$/g, '\n\n').replace(/[<>/]/g,'a');
  for (var obj in forAnnotation){
	  slice = text.substring(0,forAnnotation[obj]['start'])+'<mark title="'+forAnnotation[obj]['desc']+'">'+text.substring(forAnnotation[obj]['start'],forAnnotation[obj]['end'])+'</mark>'+text.substring(forAnnotation[obj]['end'],text.lenth);
	  text = slice;
  }
  
  if (isIE) {
    // IE wraps whitespace differently in a div vs textarea, this fixes it
    text = text.replace(/ /g, ' <wbr>');
  }
  
  return text;
}

function handleInput() {
  var text = $textarea.val();
  var highlightedText = applyHighlights(text);
  $highlights.html(highlightedText);
}

function handleScroll() {
  var scrollTop = $textarea.scrollTop();
  $backdrop.scrollTop(scrollTop);
  
  var scrollLeft = $textarea.scrollLeft();
  $backdrop.scrollLeft(scrollLeft);  
}

function fixIOS() {
  // iOS adds 3px of (unremovable) padding to the left and right of a textarea, so adjust highlights div to match
  $highlights.css({
    'padding-left': '-=3px',
    'padding-right': '-=3px'
  });
}

function bindEvents() {
  $textarea.on({
    'input': handleInput,
    'scroll': handleScroll
  });

  $toggle.on('click', function() {
   // $container.toggleClass('perspective');
  });  
}

if (isIOS) {
  fixIOS();
}

bindEvents();
handleInput();