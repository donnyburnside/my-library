export default class MyLibrary {
    /*
     * Constructor
     *
     * @param {string} selector - A string representing a selector for an existing DOM node
     */
    constructor(selector = '') {
        this.element = (selector !== '' && document.querySelector(selector)) ? document.querySelector(selector) : null;
    }

    /*
     * Initialise the class
     */
    init() {
        try {
            // Check the 'element' property is valid
            if (!this.element) {
                throw('Element not found.');
            }

            // Everything looks OK! Now let's get started!
            console.log('My Library:', this);
            this.element.textContent = 'Hello world!';
        }

        catch(error) {
            console.warn('My Library:', error);

            return false;
        }
    }
}