SlideIns.js
Created by Jason Krol
Updated: 12/11/2012
=====================

Usage:
------
1. Include jQuery
2. Include slideins.js
3. During your page initialization ($(document).ready(...)) call SlideIns():
3a. SlideIns([delay ms], ['easing'])
3b. Delay = 300ms by default
3c. Easing = 'swing' by default / (Can use any jqEasing setting if that file is included in your page.)
4. Be sure to use a wrapper div (container) and give it a class of "slidein_row"
5. Be sure that the element you want to slidein has a class of: "slidein_left", "slidein_mid", "slidein_right"
