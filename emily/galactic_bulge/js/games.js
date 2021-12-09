$( document ).ready(function() {

    var totalFrames = 240;
    var currentHexxedFrame = 1;
    var currentPhahooganophFrame = 1;
    var currentLiarFrame = 1;
    var currentGreenFrame = 1;

    var planetHexxedImage = $("#planetHexxedWrapper > .planetImage");
    var planetPhahooganophImage = $("#planetPhahooganophWrapper > .planetImage");
    var planetLiarImage = $("#planetLiarWrapper > .planetImage");
    var planetGreenImage = $("#planetGreenWrapper > .planetImage");

    for (var i = 1; i < totalFrames + 1; i++) {
        $('#preloadedImages').append(`<div id="preload-image-${i}" style="background-image: url('img/hexxed-render/${pad(i)}.png');"></div>`);
        $('#preloadedImages').append(`<div id="preload-image-${i}" style="background-image: url('img/phahooganoph-render/${pad(i)}.png');"></div>`);
        $('#preloadedImages').append(`<div id="preload-image-${i}" style="background-image: url('img/liar-render/${pad(i)}.png');"></div>`);
        $('#preloadedImages').append(`<div id="preload-image-${i}" style="background-image: url('img/green-newrender/${pad(i)}.png');"></div>`);
    }

    function pad(n) {
        var s = "000" + n;
        return s.substr(s.length-4);
    }

    var hexxedInterval, phahooganophInterval, liarInterval, greenInterval;

    $("a").click(function(e) {
        clearInterval(hexxedInterval);
        clearInterval(phahooganophInterval);
        clearInterval(liarInterval);
        clearInterval(greenInterval);
    });

    planetHexxedImage.hover(function() {
        hexxedInterval = setInterval(swapHexxedImage, 42)
    }, function() {
        clearInterval(hexxedInterval)
    });

    planetPhahooganophImage.hover(function() {
        PhahooganophInterval = setInterval(swapPhahooganophImage, 42)
    }, function() {
        clearInterval(PhahooganophInterval)
    });

    planetLiarImage.hover(function() {
        liarInterval = setInterval(swapLiarImage, 42)
    }, function() {
        clearInterval(liarInterval)
    });

    planetGreenImage.hover(function() {
        greenInterval = setInterval(swapGreenImage, 42)
    }, function() {
        clearInterval(greenInterval)
    });

    function swapHexxedImage() {
        currentHexxedFrame += 1;

        if (currentHexxedFrame > 240) {
            currentHexxedFrame = 1;
        }

        planetHexxedImage.attr("src", `img/hexxed-render/${pad(currentHexxedFrame)}.png`);
    }

    function swapPhahooganophImage() {
        currentPhahooganophFrame += 1;

        if (currentPhahooganophFrame > 240) {
            currentPhahooganophFrame = 1;
        }

        planetPhahooganophImage.attr("src", `img/phahooganoph-render/${pad(currentPhahooganophFrame)}.png`);
    }

    function swapLiarImage() {
        currentLiarFrame += 1;

        if (currentLiarFrame > 240) {
            currentLiarFrame = 1;
        }

        planetLiarImage.attr("src", `img/liar-render/${pad(currentLiarFrame)}.png`);
    }

    function swapGreenImage() {
        currentGreenFrame += 1;

        if (currentGreenFrame > 240) {
            currentGreenFrame = 1;
        }

        planetGreenImage.attr("src", `img/green-newrender/${pad(currentGreenFrame)}.png`);
    }

    particlesJS("particles-js", {"particles":{"number":{"value":80,"density":{"enable":true,"value_area":300}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":false,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":false,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":false,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});
});