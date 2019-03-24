document.onload(snailAnimate());

function snailAnimate() {
    var snail = document.getElementById("snail-icon");
    var leftPosition = 0;
    var id = setInterval(frame, 5);
    function frame() {
        if (leftPosition === 460) {
            clearInterval(id);
        } else {
            leftPosition++;
            snail.style.left = leftPosition + 'px';
        }
    }
};
