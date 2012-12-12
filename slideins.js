/* File Created: November 26, 2012 - Jason Krol */

function SlideIns(delay, easing) {
    var slideTime = 300;
    if (delay !== null) slideTime = delay;

    var slideEase = 'swing';
    if (easing !== null) slideEase = easing;

    var slides = [];
    var animationQueue = [];
    var isAnimating = false;
    var looping = false;
    var loop = null;

    //initialize:
    function init() {
        $('.slidein_row').each(function (i, row) {
            $(row).css({ 'position': 'relative', 'clear': 'both' });
            $(row).children('*[class*=slidein_]').css('visibility', 'hidden');
            var inrow = [$(row).offset().top + ($(row).height() / 2), $(row), false];
            slides[i] = inrow;
        });
        $(window).scroll(function (event) {
            checkToReveal();
        });
        checkToReveal();
    }
    init(); //execute initialization

    function slideIn(row) {
        slideLeftIn(row);
        slideRightIn(row);
        slideMiddleIn(row);
    }
    function slideLeftIn(row) {
        var $oleft = row.find('.slidein_left');
        if ($oleft.length > 0) {
            $oleft.css('visibility', 'hidden');
            $oleft.clone().addClass('copy').css({ 'position': 'absolute', 'width': $oleft.width(), 'left': '-' + $oleft.width() + 'px', 'top': $oleft.offset().top }).appendTo('body');
            var $nleft = $('.slidein_left.copy')
            $nleft.css('visibility', 'visible').animate({ 'left': $oleft.offset().left }, { queue: true, duration: slideTime, easing: slideEase, complete: function () {
                $oleft.css('visibility', 'visible');
                $('.slidein_left.copy').remove();
                removeFromQueue(row);
            }
            });
        }
    }
    function slideRightIn(row) {
        var $oright = row.find('.slidein_right');

        if ($oright.length > 0) {
            $('body').css('overflow-x', 'hidden');
            $oright.css('visibility', 'hidden');

            $oright.clone().addClass('copy').css({ 'position': 'absolute', 'width': $oright.width(), 'left': $('body').width() + 10, 'top': $oright.offset().top }).appendTo('body');
            var $nright = $('.slidein_right.copy')
            $nright.css('visibility', 'visible').animate({ 'left': $oright.offset().left }, { queue: true, duration: slideTime, easing: slideEase, complete: function () {
                $oright.css('visibility', 'visible');
                $('.slidein_right.copy').remove();
                $('body').css('overflow-x', 'visible');
            }
            });
        }
    }
    function slideMiddleIn(row) {
        var $omid = row.find('.slidein_middle');
        if ($omid.length > 0) {
            $omid.css('visibility', 'visible').hide();
            $omid.fadeIn(slideTime * 2);
        }
    }

    function checkToReveal() {
        var y = $(this).scrollTop();
        for (var i = 0; i < slides.length; i++) {
            if ((y + $(window).height()) >= slides[i][0] && !slides[i][2]) {
                slides[i][2] = true;

                //new code to support queueing
                addToQueue(slides[i][1]);
                if (!looping)
                    startAnimation();
            }
        }
    }

    //animation stuff:
    function startAnimation() {
        looping = true;
        loop = window.setInterval(checkQueue, 100);
    }
    function addToQueue(row) {
        animationQueue.push(row);
    }
    function checkQueue() {
        if (!isAnimating) {
            isAnimating = true;
            slideIn(animationQueue[0]);
        }
    }
    function removeFromQueue(row) {
        //end the animation for the row:
        isAnimating = false;
        animationQueue.shift();

        //end the entire loop if there are no more items to animate:    
        if (animationQueue.length <= 0) {
            looping = false;
            clearInterval(loop);
        }
    }
};