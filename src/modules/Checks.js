// Module to hold the checks
// David Vallejo, 2019 ( david@thyngster.com ) 

const Checks = {
    present: function(v) {
        if (v)
            return true;
        else
            return false;
    },
    required: function(v) {
        if (v)
            return true;
        else
            return false;
    },
    integer: function(v) {
        return Number(v) === v && v % 1 === 0;
    },
    contains: function contains(v, string) {
        return (typeof v !== "undefined" && v.indexOf(string) > -1) ? true : false;
    },
    notcontains: function contains(v, string) {
        return (typeof v !== "undefined" && v.indexOf(string) === -1) ? true : false;
      },
    regex: function regex(v, _regex) {
        const re = new RegExp(_regex,'i');
        return re.test(v);
      },  
    float: function(v) {
        return Number(v) === v && v % 1 !== 0;
    },
    string: function(v) {
        return Object.prototype.toString.call(v) === "[object String]";
    },
    object: function(v) {
        return Object.prototype.toString.call(v) === "[object Object]";
    }
}

export default Checks;