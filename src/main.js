import Cookies from './modules/Cookies';
import Checks from './modules/Checks';
import Helpers from './modules/Helpers';
import grabDataLayer from './modules/grabDataLayer';

(function () {
    window._validateDataLayer = window._validateDataLayer || function(datalayer, schema, throttling){
        const throttlingCookieName = 'validateDLthrottling';
        if(Cookies.get(throttlingCookieName)) return;
        let errors = [];
        let _dataLayer;
        // If current dataLayer value is an object, we'll parse it
        if(datalayer === Object(datalayer)){
            _dataLayer = Helpers.flattenObject(datalayer);
        }else{
        // If not we'll try to autofind it using the dataLayer grabber helper            
            _dataLayer = Helpers.flattenObject(grabDataLayer(datalayer));
        }
        
        const _schema = Helpers.flattenObject(schema);
        Object.entries(_schema).forEach(function(e) {
            const rules = e[1].split(',');
            rules.forEach(function(rule) {
                const ruleName = rule.split(':')[0];
                const ruleCondition = rule.split(':')[1];
                if (Checks[ruleName]) {
                    if (ruleName === "present") {
                        if (Object.keys(_dataLayer).indexOf(e[0]) === -1) { 
                            errors.push({
                                key: e[0],
                                value: _dataLayer[e[0]],                                
                                rule: ruleName,
                                condition: undefined
                            });
                        }
                    } else if(ruleCondition){
                        if (Checks[ruleName](_dataLayer[e[0]],ruleCondition) === false) {
                            errors.push({
                                key: e[0],
                                value: _dataLayer[e[0]],
                                rule: ruleName,
                                condition: ruleCondition,
                            });
                        }
                    } else {
                        if(ruleName.indexOf(':')>-1) console.log("CONDITIOJNAL RULE");
                        if (Checks[ruleName](_dataLayer[e[0]]) === false) {
                            errors.push({
                                key: e[0],
                                value: _dataLayer[e[0]],                                
                                rule: ruleName,
                                condition: undefined
                            });
                        }
                    }
                }
            });
        });
        if(throttling && throttling===true){
            Cookies.set(throttlingCookieName,'1');
        }
        if(errors.length>-1) return errors;            
    };
})();