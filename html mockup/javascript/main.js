$( document ).ready(function() {
    var mobileNavOpen = false;
    var bagOpen = false
    var savedScrollTop;
    var shadowDisabled = false;
    var searchBlurDisabled = false;
    var mobileNavOpenDisabled = false;

    /* swipers */
    const heroSwiper = new Swiper('.heroSwiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
      
        // If we need pagination
        pagination: {
            el: '.heroSwiper-pagination',
        },
      
        // Navigation arrows
        navigation: {
            nextEl: '.heroSwiper-button-next',
            prevEl: '.heroSwiper-button-prev',
        },
    });
    const reviewSwiper = new Swiper('.reviewSwiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
      
        // If we need pagination
        pagination: {
            el: '.reviewSwiper-pagination',
        },
      
        // Navigation arrows
        navigation: {
            nextEl: '.reviewSwiper-button-next',
            prevEl: '.reviewSwiper-button-prev',
        },
    });

    /* event listeners */
    $( window ).on('scroll', function() {
        throttle(calculateHeaderShadow($(window).scrollTop()), 200);
        throttle(setUpScrollAnimations(), 500);
    });
    $('div.darkBackground').click(function() {
        closeBag(false);
        closeMobileNav(false);
    });
    $('div.hamburgerMenu').click(function() {
        if (!mobileNavOpen) {
            openMobileNav();
        } else {
            closeMobileNav(false);
        }
    });
    $('div.bagWrapper').click(function() {
        if (!bagOpen) {
            openBag();
        } else {
            closeBag(false);
        }
    });
    $('.hasSubmenu').click(function() {
        openSubmenu($(this));
    });
    $('svg.searchBarXIcon').click(function() {
        temporarySearchBlurDisable();
        $('input.mobileSearch').val('');
        $('input.mobileSearch').focus();
        $('svg.searchBarXIcon').css('opacity', 0);
    });
    $('input.mobileSearch').blur(function() {
        setTimeout( function() {
            if (!searchBlurDisabled) {
                if ($('input.mobileSearch').val() == '') {
                    fadeOutSearchSuggestions(function() {
                        fadeInNavLinks(function() {
                            fadeInUserLinks(function() {});
                        });
                    });
                } else {
                    fadeInNavLinks(function() {
                        fadeInUserLinks(function() {});
                    });
                }
            }
        }, 150);
    });
    $('input.mobileSearch').focus(function() {
        closeSubmenus();
        fadeOutUserLinks(function() {});
        fadeOutNavLinks(function() {
            if ($('.mobileNavSearchSuggestions').css('display') == 'none') {
                fadeInSearchSuggestions(function() {});
            }
        });
    });
    $('input.mobileSearch').on('input', function() {
        if ($('input.mobileSearch').val() == '') {
            $('svg.searchBarXIcon').css('opacity', 0);
        } else {
            $('svg.searchBarXIcon').css('opacity', 1);
        }
    });
    $('div.sunToggleWrapper').on('click', function() {
        toggleProductCard($(this));
    });
    $('img.productCardImg').on('mouseenter', function() {
        toggleProductCard($(this));
    });
    $('img.productCardImg').on('mouseleave', function() {
        toggleProductCard($(this));
    });
    $(window).on('resize', function(){
        throttle(checkLandscape(), 100)
    });

    /* set up page */
    function populateBagQuantitySelect() {
        $('.bagQuantitySelect').each(function() {
            var optionsHTML = '';

            var selected = $(this).attr('data-value');

            for (var i = 1; i < 21; i++) {
                optionsHTML = optionsHTML + `<option value="${i}"${i == selected?'selected':''}>${i}</option>`;
            }

            $(this).html(optionsHTML);
        });
    }
    populateBagQuantitySelect();
    function checkLandscape() {
        if ($( window ).width() > 1 * $( window ).height()) {
            $('.heroSwiper').css('height', $( window ).width() * 0.45);
        }else if ($( window ).width() > 0.65 * $( window ).height()) {
            $('.heroSwiper').css('height', $( window ).width() * 0.8);
        } else {
            $('.heroSwiper').css('height', $( window ).width() * 1.2);
        }
    }
    checkLandscape();
    function setUpFade() {
        $('.categoryBoxLink').each(function(index) {
            $(this).addClass('fadeIn');
            if (index % 2 == 1) {
                $(this).addClass('fadeInDelayed');
            }
        });
        $('.learnBoxLink').addClass('fadeIn');
        $('.calloutBox').addClass('fadeIn');
        $('.productSpotlightBox').addClass('fadeIn');
        // $('.productSpotlightBoxHeading').addClass('fadeIn');
        // $('.productSpotlightBoxBullet').addClass('fadeIn');
        $('.productSpotlightShopLink').addClass('fadeIn');
        $('.productCardWrapper').each(function(index) {
            $(this).addClass('fadeIn');
            if (index % 2 == 1) {
                $(this).addClass('fadeInDelayed');
            }
        });
        $('.reviewWrapper').addClass('fadeIn');
        $('.asSeenOnWrapper').addClass('fadeIn');
        setUpScrollAnimations();
    }
    setUpFade();
    function fadeInHero() {
        element = $('.heroSwiper')
        element.css('transition', 'unset');
        element.css('opacity', 0);
        setTimeout( function() {
            element.css('transition', 'opacity 1s ease');
            element.css('opacity', 1);
        }, 10);
    }
    fadeInHero();

    /* header shadow functions */
    function calculateHeaderShadow(scrollTop) {
        if (!shadowDisabled) {
            if (scrollTop > 1) {
                addHeaderShadow();
            } else {
                removeHeaderShadow();
            }
        }
    }
    function addHeaderShadow() {
        $('header.stickyHeader').addClass('shadow');
    }
    function removeHeaderShadow() {
        $('header.stickyHeader').removeClass('shadow');
    }

    /* mobile nav functions */
    function setDarkBackground() {
        var darkBackground = $('div.darkBackground');
        darkBackground.css('width', '100%');
        darkBackground.css('opacity', 1);
        darkBackground.css('backdrop-filter', 'blur(12px)');

        $('header.stickyHeader').css('background-color', 'rgba(255, 255, 255, 1)');

        shadowDisabled = true;

        $('header.stickyHeader').removeClass('shadow');

        savedScrollTop = $(window).scrollTop();

        setTimeout(function () {
            $(window).scrollTop(0);

            const height = window.innerHeight;

            $('div.contentWrapper').css('height', height);
            $('div.contentWrapper').css('overflow', 'hidden');
            $('div.contentWrapper').children().css('position', 'relative');
            $('div.contentWrapper').children().css('bottom', savedScrollTop + 'px');
        }, 0);
    }
    function unsetDarkBackground() {
        var darkBackground = $('div.darkBackground');
        darkBackground.css('opacity', 0);
        darkBackground.css('backdrop-filter', 'unset');

        $('header.stickyHeader').css('background-color', 'rgba(255, 255, 255, 0.85)');

        shadowDisabled = false;

        if (savedScrollTop > 1) {
            $('header.stickyHeader').addClass('shadow');
        }

        $('div.contentWrapper').css('height', 'unset');
        $('div.contentWrapper').css('overflow', 'unset');
        $('div.contentWrapper').children().css('bottom', 'unset');

        $(window).scrollTop(savedScrollTop);

        setTimeout( function() {
            darkBackground.css('width', '0');
        }, 300);
    }
    function openMobileNav() {
        if (!mobileNavOpenDisabled) {
            $('div.hamburgerMenu').addClass('open');

            if (bagOpen) {
                closeBag(true);
            } else {
                setDarkBackground();
            }

            fadeInSearch(function() {
                fadeInNavLinks(function() {
                    fadeInUserLinks(function() {});
                });
            });

            $('.mobileNav').css('width', '80%');

            mobileNavOpen = true;
        }
    }
    function closeMobileNav(keepDark) {
        closeSubmenus();

        temporarySearchBlurDisable();

        mobileNavOpenDisabled = true;
        setTimeout( function() {
            mobileNavOpenDisabled = false;
        }, 300);

        $('.hamburgerMenu').removeClass('open');

        fadeOutSearch(function() {});
        fadeOutNavLinks(function() {});
        fadeOutUserLinks(function() {});
        fadeOutSearchSuggestions(function() {});

        var nav = $('.mobileNavWrapper');

        if (!keepDark) {
            unsetDarkBackground();
        }

        $('.mobileNav').css('width', '0');

        mobileNavOpen = false;
    }
    function openBag() {
        if (mobileNavOpen) {
            closeMobileNav(true);
        } else {
            setDarkBackground();
        }

        $('.bagView').css('display', 'block');
        setTimeout(function() {
            $('.bagView').css('width', '80%');
        }, 10);

        fadeInLeft('bagView', 'block', 'bagHeader', function() {
            fadeInLeft('bagView', 'block', 'bagListItem', function() {});
        });

        $('.bagPath').removeClass('noAnimation');
        $('.bagPath').addClass('open');
        $('.closeBarBag').addClass('open');

        bagOpen = true;
    }
    function closeBag(keepDark) {
        if (!keepDark) {
            unsetDarkBackground();
        }

        fadeOutReset('bagView', 'bagHeader', function(){});
        fadeOutReset('bagView', 'bagListItem', function(){});

        $('.bagPath').removeClass('open');
        $('.closeBarBag').removeClass('open');
        $('.bagView').css('width', '0');

        $('.bagView').scrollTop(0);

        bagOpen = false;
    }
    function openSubmenu(element) {
        if (!element.next().hasClass('open')) {
            closeSubmenus();
            element.children('.mobileNavChevron').css('transform', 'rotate(90deg)');

            var mobileNavSubmenu = element.next();
            mobileNavSubmenu.css('height', 'auto');

            var height = mobileNavSubmenu.height();
            mobileNavSubmenu.css('height', '0');
            mobileNavSubmenu.addClass('open');

            setTimeout(
                function()
                {
                    mobileNavSubmenu.css('height', height + 'px');
                }, 10);
        } else {
            closeSubmenus();
        }
    }
    function closeSubmenus() {
        var mobileNavSubmenus = $('div.mobileNavSubmenu.open');
        mobileNavSubmenus.prev().children('.mobileNavChevron').css('transform', 'rotate(0deg)');
        mobileNavSubmenus.css('height', '0');
        mobileNavSubmenus.removeClass('open');
    }
    function fadeInLeft(parentClass, parentDisplay, childClass, callback) {
        $('.' + childClass).css('transition', 'unset');
        $('.' + childClass).css('opacity', 0);
        $('.' + childClass).css('transform', 'translate(-10px, -5px) scale(1.1)');
        $('.' + parentClass).css('display', parentDisplay);
        setTimeout( function() {
            $('.' + childClass).css('transition', 'opacity 0.3s ease, transform 0.3s ease');

            $('.' + parentClass).find('.' + childClass).each(function(index, element) {
                setTimeout( function() {
                    $(element).css('opacity', 1);
                    $(element).css('transform', 'translate(0,0) scale(1)');
                }, 100 * (index + 1));
            })

            setTimeout( function() {
                callback();
            }, $('.' + parentClass).find('.' + childClass).length * 100)
        }, 10);
    }
    function fadeInSearch(callback) {
        fadeInLeft('mobileNavWrapper', 'flex', 'searchWrapper', callback);
    }
    function fadeInNavLinks(callback) {
        fadeInLeft('mobileProductNav', 'flex', 'mobileNavLink', callback);
    }
    function fadeInUserLinks(callback) {
        fadeInLeft('mobileUserNav', 'flex', 'mobileAccountLink', callback);
    }
    function fadeInSearchSuggestions(callback) {
        fadeInLeft('mobileNavSearchSuggestions', 'block', 'suggestionItem', callback);
    }
    function fadeOutReset(parentClass, childClass, callback) {
        $('.' + childClass).css('transition', 'opacity 0.3s ease, transform 0.3s ease');
        $('.' + childClass).css('opacity', 0);
        setTimeout( function() {
            $('.' + parentClass).css('display', 'none');
            $('.' + childClass).css('transition', 'unset');
            callback();
        }, 300);
    }
    function fadeOutSearch(callback) {
        fadeOutReset('mobileNavWrapper', 'searchWrapper', callback);
    }
    function fadeOutNavLinks(callback) {
        fadeOutReset('mobileProductNav', 'mobileNavLink', callback);
    }
    function fadeOutUserLinks(callback) {
        fadeOutReset('mobileUserNav', 'mobileAccountLink', callback);
    }
    function fadeOutSearchSuggestions(callback) {
        fadeOutReset('mobileNavSearchSuggestions', 'suggestionItem', callback);
    }
    function temporarySearchBlurDisable() {
        searchBlurDisabled = true;
        setTimeout( function() {
            searchBlurDisabled = false;
        }, 180);
    }

    /* page functions */
    function setUpScrollAnimations() {
        var ua = window.navigator.userAgent;
        var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
        var webkit = !!ua.match(/WebKit/i);
        var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);
        var bottomOffset = 110;
        var fadedBottomOffset = 150;
        
        if (iOSSafari) {
            bottomOffset = 40;
        }

        $('.fadeIn').each(function() {
            fadeOnScroll($(this), bottomOffset, function() {});
        });
        $('.faded').each(function() {
            resetFadeOnScroll($(this), fadedBottomOffset);
        });
    }
    function fadeOnScroll(element, bottomOffset, callback) {
        var pagePosition = $(window).scrollTop() + $(window).height() - element.offset().top - bottomOffset;

        if (pagePosition > 0) {
            element.removeClass('fadeIn');
            element.addClass('faded');
            fadeInBottom(element, callback);
        }
    }
    function resetFadeOnScroll(element, bottomOffset) {
        var pagePosition = $(window).scrollTop() + $(window).height() - element.offset().top + bottomOffset;

        if (pagePosition < 0) {
            element.removeClass('faded');
            element.addClass('fadeIn');
            resetFade(element);
        }
    }
    function calculateScrollFade(element, topOffset, bottomOffset) {
        var pagePosition = -1 * (element.offset().top - $(window).height() - $(window).scrollTop() + (element.height() + bottomOffset));
        var animationHeight = $(window).height() - 60 - topOffset - (element.height() + bottomOffset);
        var percent = pagePosition / animationHeight;

        if (percent > 0.99) {
            percent = 0.99;
        }

        if (percent < 0) {
            percent = 0;
        }

        element.css('opacity', percent);
    }
    function fadeInBottom(element, callback) {
        element.css('transition', 'unset');
        element.css('opacity', 0);
        element.css('transform', 'translate(0,20px) scale(1)');
        setTimeout( function() {
            if (element.hasClass('fadeInDelayed')) {
                element.css('transition', 'opacity 1.2s .3s ease, transform 1.2s .3s ease');
            } else {
                element.css('transition', 'opacity 1.2s ease, transform 1.2s ease');
            }
            element.css('opacity', 1);
            element.css('transform', 'translate(0,0) scale(1)');

            setTimeout( function() {
                callback();
            }, 300)
        }, 10);
    }
    function resetFade(element) {
        element.css('transition', 'unset');
        element.css('opacity', 0);
        element.css('transform', 'translate(0,10px) scale(1.02)');
    }
    function toggleProductCard(element) {
        var productCardWrapper = element.closest('div.productCardWrapper');
        if (productCardWrapper.hasClass('toggled')) {
            productCardWrapper.removeClass('toggled');
        } else {
            productCardWrapper.addClass('toggled');
        }
    }
});

/* From https://stackoverflow.com/questions/27078285/simple-throttle-in-javascript */
function throttle (callback, limit) {
    var waiting = false;                      // Initially, we're not waiting
    return function () {                      // We return a throttled function
        if (!waiting) {                       // If we're not waiting
            callback.apply(this, arguments);  // Execute users function
            waiting = true;                   // Prevent future invocations
            setTimeout(function () {          // After a period of time
                waiting = false;              // And allow future invocations
            }, limit);
        }
    }
}