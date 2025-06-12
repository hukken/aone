document.addEventListener('DOMContentLoaded', function() {  
    const newsletterPopup = document.getElementById('newsletter-hero-popup');
    
    if (!newsletterPopup) {
        return;
    }

    const closeButton = newsletterPopup.querySelector('.close-dialog-popup');
   
    function setCookie(name, value, hours) {
        var date = new Date();
        date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
        document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
    }

    function getCookie(name) {
        const cookieName = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        
        for(let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return null;
    }
    
    function showPopup() {
        newsletterPopup.classList.remove('is-hidden');
        newsletterPopup.classList.add('is-visible');
    }
    
    function hidePopup() {
        newsletterPopup.classList.add('is-hidden');
        newsletterPopup.classList.remove('is-visible');
    }

    if (!getCookie('newsletterPopupShown')) {
        setTimeout(() => {
            try {
                showPopup();
                setCookie('newsletterPopupShown', 'true', 4382);
            } catch (error) {
                console.error('Error showing popup:', error);
            }
        }, 5000);
    } 

    if (closeButton) {
        closeButton.addEventListener('click', hidePopup);
    } 

    newsletterPopup.addEventListener('click', (event) => {
        if (event.target === newsletterPopup) {
            hidePopup();
        }
    });
});