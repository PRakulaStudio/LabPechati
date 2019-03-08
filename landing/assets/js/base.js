document.addEventListener('scroll', debounce(scrolledIntroHandler, 1));
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
