/*
    For animation element position property other than static;

    elem - DOM element for animation,
    startPos - current position of element or another starting position for animation,
    speed - changing px per second,
    direction - animation direction,
    duration - duration of animation,
    fps - frame per second, smooth animation;
*/

// used setInterval function, setTimeout keeps track of animation time;
function move_v1(elem, startPos, speed, direction, duration, fps) {
    var dtime = 1 / fps;
    var ddist = startPos;

    var h = setInterval(function () {
        ddist += speed * dtime;
            elem.style[direction] = ddist + 'px';
    }, 1000 * dtime);

    setTimeout(function () {
        clearInterval(h);
    }, duration);
}

// in this version used recursion function
function move_v2(elem, startPos, speed, direction, duration, fps) {
    var dtime = 1 / fps;
    var ddist = startPos;
    var date = new Date();

    function m() {
        if (new Date - date > duration) return;
        ddist += speed * dtime;
        elem.style[direction] = ddist + 'px';
        setTimeout(function () {
            m();
        }, 1000 * dtime);
    }

    m();
}