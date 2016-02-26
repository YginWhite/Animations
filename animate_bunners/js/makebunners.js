function makeSunBunner_v2(parent, imgs, text) {
    // find sizes for bunners
    var parent = $(parent),
        width = Math.round(parent.width() * 0.9);

    // function for elements creation
    var createElement = function (w, h, position, url) {
        return $('<div><div/>').css({
            'width': width * w + 'px',
            'height': width * h + 'px',
            'background-image': 'url("' + url + '")',
            'background-size': 'cover',
            'position': position
        });
    }

    // function for text creation
    var createText = function (text, color, size) {
        return $('<p>' + text + '</p>').css({
            'position': 'absolute',
            'color': color,
            'font-size': size + 'em'
        });
    };

    // create elements
    var container = createElement(1, 1 / 4, 'relative', imgs.day).css({'overflow': 'hidden'});
    var stars = createElement(1, 1 / 4, 'absolute', imgs.night);
    var sun = createElement(1 / 9, 1 / 9, 'absolute', imgs.sun).hide();
    var cloud = createElement(1 / 8, 1 / 15, 'absolute', imgs.cloud).hide();

    // create text
    var text = createText(text, 'white', width / 500).hide();

    // add elements to banner
    var addElementToStructure = function (element, parent, left, top) {
        element.css({
            'left': width * left + 'px' || 0 + 'px',
            'top': width * top + 'px' || 0 + 'px'
        });
        parent.append(element);
    }

    // make structure of bunner
    addElementToStructure(container, $('body'));
    addElementToStructure(stars, container);
    addElementToStructure(sun, container, 1, 1 / 4);
    addElementToStructure(cloud, container, 1 / 12, 1 / 12);
    addElementToStructure(text, container, 1 / 2.5, 1 / 20);

    // animations
    var SUN_SPEED = 1000;

    sun.fadeIn(SUN_SPEED / 2).animate(
        {'left': '-=' + width / 1.02 + 'px'},
        {duration: SUN_SPEED * 2, queue: false}
    );
    sun.animate(
        {'top': '-=' + width / 4.4 + 'px'},
        {duration: SUN_SPEED, queue: false}
    );
    stars.fadeOut(SUN_SPEED * 2);
    setTimeout(function () {
        text.fadeIn(SUN_SPEED / 2, function () {
            text.fadeOut(SUN_SPEED / 2, function () {
                text.html('...and its true').css({
                    'top': width / 10,
                    'color': 'gold',
                    'font-size': width / 600 + 'em'
                }).fadeIn(SUN_SPEED * 2);
            });
        });
    }, SUN_SPEED);
    setTimeout(function () {
        cloud.fadeIn(SUN_SPEED * 1.3, function () {
            var flag = true;
            var dist = 10;
            var counter = 0;

            function upDown(element) {
                if (counter > 10) return;
                if (flag) {
                    element.animate({'top': '+=' + dist + 'px'}, SUN_SPEED);
                    flag = false;
                } else {
                    element.animate({'top': '-=' + dist + 'px'}, SUN_SPEED);
                    flag = true;
                }
                counter++;
                upDown(element);
            }

            upDown(sun);
        });
    }, SUN_SPEED * 1.7);
}