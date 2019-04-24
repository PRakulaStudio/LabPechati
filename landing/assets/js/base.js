var supportsPassive = false;
try {
    var opts = Object.defineProperty({}, 'passive', {
        get: function () {
            supportsPassive = true;
        }
    });
    window.addEventListener("testPassive", null, opts);
    window.removeEventListener("testPassive", null, opts);
} catch (e) {
}

document.addEventListener('scroll', debounce(scrolledIntroHandler, 1), supportsPassive ? {passive: true} : false);
window.addEventListener('popstate', scrolledIntroHandler);

function scrolledIntroHandler() {
    const headerHeight = parseInt(getComputedStyle(document.body).getPropertyValue('--header-height'));
    const currentScrollOffset = window.innerHeight - document.scrollingElement.scrollTop;
    const thresholdOffset = 20;
    const scrolledState = currentScrollOffset < headerHeight + thresholdOffset;
    const headerNode = document.querySelector('header');
    const introSectionNode = document.querySelector('section#intro');
    if (headerNode.classList.contains('scrolled') !== scrolledState)
        headerNode.classList.toggle('scrolled', scrolledState);
    if (introSectionNode.classList.contains('scrolled') !== scrolledState)
        introSectionNode.classList.toggle('scrolled', scrolledState)
}

function debounce(func, wait) {
    // Уменьшение тактов вызова функции
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait)
    }
}

document.querySelectorAll('.timer').forEach(timer => {
    const defaultTime = {
        hours: 1,
        minutes: 23,
        seconds: 45
    };

    timer.loadTimeFromStorage = () => (timer.timeFromStorage = localStorage.getItem('timer')) ? timer.time = new Date(timer.timeFromStorage) : null;
    timer.checkTime = () => timer.time && timer.time.getTime() > new Date(null, null, null, null, null, null, null).getTime();
    timer.reset = () => timer.time = new Date(null, null, null, defaultTime.hours, defaultTime.minutes, defaultTime.seconds);
    timer.render = () => timer.innerText = `${timer.time.getHours()} : ${timer.time.getMinutes()} : ${timer.time.getSeconds()}`;
    timer.stop = () => clearInterval(timer.interval);
    timer.start = () => timer.interval = setInterval(() => {
        if (timer.checkTime()) timer.time.setSeconds(timer.time.getSeconds() - 1); else timer.reset();
        timer.render();
        localStorage.setItem('timer', timer.time);
    }, 1000);

    timer.loadTimeFromStorage();
    timer.start();
});