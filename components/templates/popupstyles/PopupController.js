export function getScriptAttributes() {
    const scripts = document.getElementsByTagName('script');
    for (let script of scripts) {
        if (script.src.includes('eventgeni.js')) {
            return {
                showAfterScroll: script.getAttribute('showAfterScroll') || null,
                showAfterSection: script.getAttribute('showAfterSection') || null,
                showAfterCta: script.getAttribute('showAfterCta') || null,
            };
        }
    }
    return {
        showAfterScroll: null,
        showAfterSection: null,
        showAfterCta: null,
    };
}
function handleShowAfterScroll(showAfterScrollValue, popupWidget) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > showAfterScrollValue) {
            popupWidget.style.display = 'block';
        }
    });
}

function handleShowAfterSection(showAfterSectionId, popupWidget) {
    const sectionElement = document.querySelector(showAfterSectionId);
    if (!sectionElement) {
        console.warn(`Section with ID ${showAfterSectionId} not found.`);
        return;
    }

    window.addEventListener('scroll', () => {
        const sectionTop = sectionElement.getBoundingClientRect().top;
        if (sectionTop <= window.innerHeight) {
            setTimeout(() => {
                popupWidget.style.display = 'block';
            }, 200); // 200 ms delay
        }
    });
}
function handleShowAfterCta(showAfterSelector, popupWidget) {
    const buttonElement = document.querySelector(showAfterSelector);
    if (!buttonElement) {
        console.warn(`Button with selector ${showAfterSelector} not found.`);
        return;
    }

    buttonElement.addEventListener('click', () => {
        popupWidget.style.display = 'block';
    });
}


export function handlePopupDisplay() {
    document.addEventListener('DOMContentLoaded', () => {
        const config = getScriptAttributes();
        console.log('Script Attributes:', config);

        const popupWidget = document.querySelector('popup-widget');
        if (popupWidget) {
            popupWidget.style.display = 'none'; // Start hidden
        }

        if (config.showAfterScroll && popupWidget) {
            const showAfterScrollValue = parseInt(config.showAfterScroll, 10);
            console.log("Show after scroll function called with value ,", showAfterScrollValue);
            handleShowAfterScroll(showAfterScrollValue, popupWidget);
        }

        if (config.showAfterSection && popupWidget) {
            const showAfterSectionId = config.showAfterSection;
            console.log("Show after section function called with value ,", showAfterSectionId);
            handleShowAfterSection(showAfterSectionId, popupWidget);
        }

        if (config.showAfterCta && popupWidget) {
            const showAfterSelector = config.showAfterCta;
            console.log("Show after selector function called with value ,", showAfterSelector);
            handleShowAfterCta(showAfterSelector, popupWidget);
        }
    });
}