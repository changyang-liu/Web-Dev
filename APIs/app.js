var request = require('request');
request("https://www.google.com", function(error, response, body){
    if(error){
        console.log(error);
    }else{
        if(response.statusCode === 200){
            console.log(body);
        }
    }
})