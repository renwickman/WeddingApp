"use strict";
exports.__esModule = true;
exports.OverdrawnError = exports.MissingResourceError = void 0;
var MissingResourceError = /** @class */ (function () {
    function MissingResourceError(message) {
        this.description = "The resource could not be found";
        this.message = message;
    }
    return MissingResourceError;
}());
exports.MissingResourceError = MissingResourceError;
var OverdrawnError = /** @class */ (function () {
    function OverdrawnError(message) {
        this.description = "Insufficient Funds";
        this.message = message;
    }
    return OverdrawnError;
}());
exports.OverdrawnError = OverdrawnError;
