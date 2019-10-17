// Module to work with Cookies
// David Vallejo, 2019 ( david@thyngster.com ) 

const Cookies = {
    get: (key) => {
        let result;
        return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? (result[1]) : null;
    },
    set: (name, value) => {        
        const getRootDomainName = (domain=document.location.host) => {
            let rootDomain = null;
            if (domain.substring(0,4)=="www.") {
             domain=domain.substring(4,domain.length);
            }
            const domParts = domain.split('.');
            for(var i=1;i<=domParts.length;i++)
            {   
              document.cookie="testcookie=1; path=/; domain="+domParts.slice(i*-1).join('.');
              if(document.cookie.indexOf("testcookie") != -1){
                 rootDomain = domParts.slice(i*-1).join('.');
                 document.cookie="testcookie=1; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; domain="+domParts.slice(i*-1).join('.');
                 break; 
              }      
            }
            return rootDomain;
        };        
        const date = new Date();
        const path = path || '/';
        date.setTime(date.getTime()+(30*60*1000));
        const expires = "; expires="+date.toGMTString();
        document.cookie = name+"="+value+expires+"; path="+path;    
    }        
}
export default Cookies;