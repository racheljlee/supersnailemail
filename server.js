var express = require('express');

var app = express();
var port = 3000;

var exphbs = require('express-handlebars');

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var request = require('request');
var path = require('path');

require("dotenv").config();

var apiKey = process.env.API_KEY;
var apiKeyTwo = process.env.API_KEY_2;
var requestURL = "https://rachelique.api-us1.com/api/3/";
var requestURLTwo = "https://lamppoststudios.activehosted.com/api/3/";

var options = { 
    method: 'GET',
    url: requestURL + "contacts&api_key=" + apiKey
};

request(options, function (error, response, data) {
    if(error) throw new Error(error);
    var contactsData = JSON.parse(data);

    var contactOutput = { // need to create object to be able to pass to contacts.handlebars
        contactInfo: [],
    };

    for (var i = 0; i < contactsData.contacts.length; i++) {
        var currentContact = contactsData.contacts[i];
        var contactName = currentContact.firstName + " " + currentContact.lastName;
        var contactEmail = currentContact.email;

        console.log("Name: " + contactName);
        console.log("E-mail: " + contactEmail);
        console.log("====================================");

        // Stuff contactObject into contactInfo array
        var contactObject = {
            name: contactName,
            email: contactEmail
        }

        contactOutput.contactInfo.push(contactObject); // pushes each object into contactInfo array
    
        console.log(contactOutput.contactInfo);

        app.get("/contacts", function(req, res) {
            res.render("contacts", contactOutput); // passes contactOutput object to contacts page
        });
    };
            
});

app.use(express.static(path.join(__dirname, '/public')));


app.listen(port);
console.log('ActiveCampign app server is running on port ' + port);