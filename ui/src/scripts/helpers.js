/**
 * Helper functions
 */
define([], function () {
    var helpers = {
        /**
         * Return the URL to a template with the given name.
         * @param name
         * @returns {String}
         */
        templateUrl: function (name) {
            return '/assets/views/' + name + '.html';
        },

        /**
         * Append an array to another array element by element.
         *
         * THIS WILL MODIFY THE ORIGINAL ARRAY!
         *
         * @param {Array} original The array to be appended to
         * @param {Array} append The array to append
         */
        arrayAppend: function (original, append) {
            Array.prototype.push.apply(original, append);
        }
    };
    return helpers;
});