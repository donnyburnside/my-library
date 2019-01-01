require('./sass/styles.scss');

const MyLibrary = require('./MyLibrary').default;

/*
 * Export an anonymous function that returns an instance of the class using ES5.
 */
module.exports = (selector) => {
    return new MyLibrary(selector);
}
