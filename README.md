# CSDML: Client Side Datalayer Monitoring Library

Hi! Welcome to # CSDML. This a client-side dataLayer monitoring tool. It will allow you to check your dataLayer againts a rules schema, and throw errors 


# How you use it

You may directly grab the code from the *build/bundle.min.js* . 


## Supported Checks
|key|description  |
|--|--|
|present|Checks if a key is present ( doesn't care about it's value )  |
|required|Check for a value in a key|
|contains:string|Check if the dataLayer value contains a certain string ( case senstive )  |
|notcontains:string|Checks if the current values doesn't contain a certain string ( case sensitive )  |
|regex:expresion|Tries to match a datalayer values agains a regex expression|
|integer|Checks if the value is an integer|
|float|Checks if the value is a float|
|string|Checks if the valie is a string|
|object: |Checks if the value is an object|

The file explorer is accessible using the button in left corner of the navigation bar. You can create a new file by clicking the **New file** button in the file explorer. You can also create folders by clicking the **New folder** button.

## How to use it

    window._validateDataLayer({DATALAYER},{SCHEMA},{THROTTLING});
   


you may have something like this

    <script>
    /* CODE GOES HERE */
    var myDatalayer = { user :{ id: 1, name:'david' }};
    var mySchema = { "page": {
                           "author": "required",
                   },
    		       "user": {
    				        "id": "integer",
    				        "name": "contains:David"
       		      }
    };
    var validationResults = window._validateDataLayer(myDatalayer , mySchema ,false);
    if(validationResults && validationResults.length>0){     
      console.log(validationResults);
    }
    </script>


## Example Response

    [{
        "key": "page.author",
        "value": undefined,
        "rule": "required",
        "condition": undefined        
    }, {
        "key": "user.name",
        "value": "david",
        "rule": "contains",
        "condition": "David"
    }]

Now you could send this alerts whatever you want, for example if you want to send them to GTM dataLayer you'd be doing something like this: 

```
        dataLayer.push({
            event: 'dataLayer-validation-errors',
            errors: validationResults
        });
```

## Built-in TMS Helpers

Sometimes may not be easy to grab the current dataLayer model, like on GTM, since it's get modelled internally, for helping on this task, the library allows you to pass a tms name instead of a dataLayer and the library itself will automatically grab the dataLayer name automatically without needed to care about the dataLayer name being use or anything else.

For this we need to pass a string with a supported tms key instead of a dataLayer.

    window._validateDataLayer('gtm',{SCHEMA},true);

### Current Supported TMS

|key|Tag Management System Name|
|--|--|
|gtm|Google tag Manager|
|tealium|Tealium IQ|

*More to come