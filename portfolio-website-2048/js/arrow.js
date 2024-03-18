window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("backToTop").style.display = "block";
    } else {
        document.getElementById("backToTop").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
document.getElementById("backToTop").addEventListener("click", function() {
    scrollToTop(1000); // Прокрутка до верху за 1000 мілісекунд (1 секунда)
});

function scrollToTop(duration) {
    const startingY = window.pageYOffset;
    const startTime = performance.now();

    function step(time) {
        const normalizedTime = (time - startTime) / duration;
        if (normalizedTime > 1) {
            window.scrollTo(0, 0);
            return;
        }
        window.scrollTo(0, startingY * (1 - Math.pow(normalizedTime, 4)));
        requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}
