// Knockout Select plugin v0.0.1
// (c) 2012 Dennis Schaaf, http://dennisschaaf.com
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

(function (factory) {
    // Module systems magic dance.

    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        // CommonJS or Node: hard-coded dependency on "knockout"
        factory(require("knockout"), exports);
    } else if (typeof define === "function" && define["amd"]) {
        // AMD anonymous module with hard-coded dependency on "knockout"
        define(["knockout", "exports"], factory);
    } else {
        // <script> tag: use the global `ko` object, attaching a `select` property
        factory(ko, ko.select = {});
    }
}(function (ko, exports) {
    var _defaultOptions = {
        
    };
    var defaultOptions = _defaultOptions;

    exports.select = function (object, path) {
        splitPath = path.split('.');
        
        return ko.computed(() ->
            lastObject = this;
            for element in splitPath
                # element format can be
                #
                #   'propretyName'
                #   'arrayProperty[selector]'

                arrayIndex = element.indexOf('[')
                # if is array
                if arrayIndex > -1 
                    elementName = element.slice(0, arrayIndex);
                    selector = element.slice(arrayIndex + 1, element.length - 1);
                    array = ko.utils.unwrapObservable(lastObject[elementName])

                    signIndex = selector.indexOf('=');

                    # array is null or not an array object
                    if not array or not array.length 
                        return undefined;

                    # if is conditional
                    if signIndex > -1
                        console.log('todo conditional');

                    # is index
                    else 
                        index = parseInt(selector);
                        console.log 'is array', array, 'index', index;
                        debugger;
                        lastObject = array[index]
                    


                # normal property
                else 
                    lastObject = ko.utils.unwrapObservable(lastObject[element])
                    if lastObject == undefined || lastObject == null
                        return lastObject;

            return lastObject; 
        , object);
    }
}));








