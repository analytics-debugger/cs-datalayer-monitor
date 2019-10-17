const Helpers = {
    flattenObject: function flattenObject(data) {
        const result = {};
        function recurse(cur, prop) {
            if (Object(cur) !== cur) {
                result[prop] = cur;
            } else if (Array.isArray(cur)) {
                var l = cur.length;
    
                for (var i = 0; i < l; i++) {
                    recurse(cur[i], prop + "." + i);
                }
    
                if (l === 0)
                    result[prop] = [];
            } else {
                var isEmpty = true;
    
                for (var p in cur) {
                    isEmpty = false;
                    recurse(cur[p], prop ? prop + "." + p : p);
                }
    
                if (isEmpty && prop)
                    result[prop] = {};
            }
        }
    
        recurse(data, "");
        return result;
    }
}
export default Helpers;