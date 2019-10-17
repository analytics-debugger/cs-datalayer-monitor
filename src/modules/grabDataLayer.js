const grabDataLayer = function(vendor) {
    let _dlModel;
    switch (vendor) {
        case 'gtm':
            // Find the default dataLayer variable name from the global object
            const findDataLayerId = function() {
                var array = Object.entries(window.google_tag_manager);
                for (var i = 0; i < array.length; i++) {
                    if (array[i][1] && array[i][1].dataLayer) {
                        return array[i][0];
                    }
                }
                return null;
            };
            _dlModel = window.google_tag_manager[findDataLayerId()].dataLayer.get({
                split: function() {
                    return [];
                }
            });
            break;
        case 'tealium':
            _dlModel = window[window.utag.udoname];
            break;            
        default:
            break;
    }
    return JSON.parse(JSON.stringify(_dlModel));
};

export default grabDataLayer;