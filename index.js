'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).


exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        // var messagehelp = 'No No No is fun for kids. Say no no no or yes yes yes to my play the no no no game. Say no no no to get started.';
        // this.emit(':ask', messagehelp, messagehelp);
        var message = 'Yes Yes Yes';
        this.emit(':ask', message, message);
    },
    'ActionIntent': function () {
        var action = null;

        if (this.event.request.intent.slots)
            action = this.event.request.intent.slots.ACTION.value;

        if (typeof action == "undefined") {
            this.emit(':tell', 'good bye');
            return;
        }

        if (action == "Stop" || action == "stop" || action == "end" || action == "End" || action == "cancel" || action == "Cancel") {
            this.emit(':tell', 'good bye');
            return;
        }
        if (action == "help" || action == "Help") {
            var messagehelp = "No No No is fun for kids. Say no no no or yes yes yes to my play the no no no game. Say no no no to get started.";
            this.emit(':ask', messagehelp, messagehelp);
            return;
        }


        var message = action.toLowerCase();

        if (message.search(/yes|no/i) === -1) {
            this.emit(':tell', 'I win!');
            return;
        }

        message = message.replace(/yes/g, "1");
        message = message.replace(/no/g, "0");
        message = message.replace(/0/g, "yes");
        message = message.replace(/1/g, "no");

        this.emit(':ask', message, message);
    },
    'Unhandled': function () {
        var message = 'Try saying an action';
        this.emit(':ask', message, message);
    },
    'AMAZON.HelpIntent': function () {
        var messagehelp = "No No No is fun for kids. Say no no no or yes yes yes to my play the no no no game. Try mixing it up. Say no no no to get started.";
        this.emit(':ask', messagehelp, messagehelp);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("good bye"));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("good bye"));
    }
};