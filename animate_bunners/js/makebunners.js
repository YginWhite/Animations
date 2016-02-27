function constructBunner(width) {
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

    // add elements to banner
    var addElementToStructure = function (element, parent, left, top) {
        element.css({
            'left': width * left + 'px' || 0 + 'px',
            'top': width * top + 'px' || 0 + 'px'
        });
        parent.append(element);
    }

    return {
        createElement: createElement,
        createText: createText,
        addElementToStructure: addElementToStructure
    }
}

function makeSunBunner_v2(parent, imgs, text) {
    // find sizes for bunners
    var parent = $(parent),
        width = Math.round(parent.width() * 0.9);

    var constr = constructBunner(width);

    var createElement = constr.createElement,
        createText = constr.createText,
        addElementToStructure = constr.addElementToStructure;

    // create elements
    var container = createElement(1, 1 / 4, 'relative', imgs.day).css({'overflow': 'hidden'});
    var stars = createElement(1, 1 / 4, 'absolute', imgs.night);
    var sun = createElement(1 / 9, 1 / 9, 'absolute', imgs.sun).hide();
    var cloud = createElement(1 / 8, 1 / 15, 'absolute', imgs.cloud).hide();

    // create text
    var text = createText(text, 'white', width / 500).hide();

    // make structure of bunner
    addElementToStructure(container, $('body'));
    addElementToStructure(stars, container);
    addElementToStructure(sun, container, 1, 1 / 4);
    addElementToStructure(cloud, container, 1 / 12, 1 / 12);
    addElementToStructure(text, container, 1 / 2.5, 1 / 20);

    constr = null;

    // animations
    var SUN_SPEED = 1200;

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

function makeSunBunner_v3(parent, imgs, text) {
    // find sizes for bunners
    var parent = $(parent),
        width = Math.round(parent.width() * 0.9);

    var constr = constructBunner(width);

    var createElement = constr.createElement,
        createText = constr.createText,
        addElementToStructure = constr.addElementToStructure;

    // create elements
    var container = createElement(1, 1 / 4, 'relative', imgs.day).css({'overflow': 'hidden'});
    var cat = createElement(1 / 5.4, 1 / 9, 'absolute', imgs.cat);

    // make structure of bunner
    addElementToStructure(container, $('body'));

    var str = text.split('');
    var txt = [];

    var parts = [];
    var starW = 1 / 16;
    var partPos = 0;
    for (var i = 0; i < 16; i += 1) {
        var star = createElement(1/ 16, 1 / 4, 'absolute', imgs.night)
                                .css({'background-position': -width * starW * i + 'px 0px'});

        var t = createText(str[i], 'white', width / 150).hide();


        parts.push(star);
        txt.push(t);
        addElementToStructure(star, container, partPos);
        addElementToStructure(t, container, partPos, -1 / 20);
        partPos += starW;
    }

    addElementToStructure(cat, container, 1, 1 / 14);

    constr = null;

    // animations
    var ANIM_KOEF = 500;

    var counterP = 15;
    var counterT = 15;
    function fadeOutElms(el) {
        if (counterP < -1) return;
        el.fadeOut(ANIM_KOEF / 5, function() {

            fadeOutElms(parts[counterP--]);

            el.fadeIn(ANIM_KOEF / 3);

            if (counterT >= 0) txt[counterT].fadeIn(ANIM_KOEF / 10);
            counterT--;
        });
    }

    setTimeout(function () {
        fadeOutElms(parts[counterP]);
    }, ANIM_KOEF * 1.2);


    cat.animate({'left': -width / 6 + 'px'}, ANIM_KOEF * 5, function() {
        cat.remove();
        var j = 0;
        for (var i = 0; i < 16; i += 1) {
            parts[i].fadeOut(ANIM_KOEF / 2, function () { 
                txt[j++].css({'color': '#9197F2'});
            });
        }
    });
}