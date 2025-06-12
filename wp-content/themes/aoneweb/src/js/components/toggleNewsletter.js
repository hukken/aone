const toggleNewsLetterOverlay = () => {
    const newsLetterOverlay = document.querySelector(".newsletter-overlay");
    const newsLetterButton = document.querySelector(".newsletter-toggle-btn");
    const closeOverlayButton = document.querySelector(".close-dialog");

    
    if (newsLetterButton) {
        newsLetterButton.addEventListener("click", () => {
            
            if (newsLetterOverlay) {
                newsLetterOverlay.setAttribute( 'aria-expanded', true)
                newsLetterOverlay.showModal();
            }
        });
    }

    if (closeOverlayButton) {
        closeOverlayButton.addEventListener("click", () => {
           
            if (newsLetterOverlay) {
                newsLetterOverlay.close(); 
            }
        });
    }
};


export default toggleNewsLetterOverlay;

