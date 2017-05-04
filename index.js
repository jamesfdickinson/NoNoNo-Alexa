'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).
var quitKeywords = ["quit", "cancel", "stop", "exit", "end", "you win", "i give up"];
var messageHelp = "Toddler Simulator will simulate a child's response as if it were opposite day. For example try saying, yes you can.";
var helpKeywords = ["help"];


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
        var message = messageHelp;
        this.emit(':ask', message, "say something");
    },
    'ActionIntent': function () {
        var action = null;

        if (this.event.request.intent.slots)
            action = this.event.request.intent.slots.ACTION.value;

        if (typeof action == "undefined") {
            this.emit(':tell', 'I win! Good bye');
            return;
        }

        action = action.toLowerCase();

        //quit
        for (let keyWord of quitKeywords) {
            if (action === keyWord) {
                this.emit(':tell', 'I win! Good bye');
                return;
            }
        }

        //help
        for (let keyWord of helpKeywords) {
            if (action === keyWord) {
                this.emit(':ask', messageHelp, "say something");
                return;
            }
        }

        var wordCount = action.split(' ').length;
        if (wordCount < 2) {
            this.emit(':tell', 'I win! Good bye');
            return;
        }


        var message = action;

        //http://stackoverflow.com/questions/4921701/javascript-regex-for-replace-words-inside-text-and-not-part-of-the-words
        message = message.replace(/\bnow\b/g, "1");
        message = message.replace(/\bnever\b/g, "0");
        message = message.replace(/0/g, "now");
        message = message.replace(/1/g, "never");

        message = message.replace(/\byes\b/g, "1");
        message = message.replace(/\bno\b/g, "0");
        message = message.replace(/\b0\b/g, "yes");
        message = message.replace(/\b1\b/g, "no");

        message = message.replace(/\bcan\b/g, "1");
        message = message.replace(/\bcan't\b/g, "0");
        message = message.replace(/\b0\b/g, "can");
        message = message.replace(/\b1\b/g, "can't");

        message = message.replace(/\bwill\b/g, "1");
        message = message.replace(/\bwon't\b/g, "0");
        message = message.replace(/\b0\b/g, "will");
        message = message.replace(/\b1\b/g, "won't");


        message = message.replace(/\bdon't do\b/g, "1");
        message = message.replace(/\bdo\b/g, "0");
        message = message.replace(/\b0\b/g, "don't do");
        message = message.replace(/\b1\b/g, "do");

        message = message.replace(/\bup\b/g, "1");
        message = message.replace(/\bdown\b/g, "0");
        message = message.replace(/\b0\b/g, "up");
        message = message.replace(/\b1\b/g, "down");

        message = message.replace(/\byours\b/g, "1");
        message = message.replace(/\bmine\b/g, "0");
        message = message.replace(/\b0\b/g, "yours");
        message = message.replace(/\b1\b/g, "mine");

        message = message.replace(/\byour\b/g, "1");
        message = message.replace(/\my\b/g, "0");
        message = message.replace(/\b0\b/g, "your");
        message = message.replace(/\b1\b/g, "my");


        message = message.replace(/\bthere\b/g, "1");
        message = message.replace(/\bhere\b/g, "0");
        message = message.replace(/\b0\b/g, "there");
        message = message.replace(/\b1\b/g, "here");

        message = message.replace(/\bshould\b/g, "1");
        message = message.replace(/\bshouldn't\b/g, "0");
        message = message.replace(/\b0\b/g, "should");
        message = message.replace(/\b1\b/g, "shouldn't");



        //promt
        var promts = ["What do you say to that?", "What is your response?", "hmmm, what is your reply?", "Try saying something else."];
        var promt = promts[Math.floor(Math.random() * promts.length)];


        this.emit(':ask', message + ".  " + promt, promt);
    },
    'Unhandled': function () {
        var message = 'Try asking my a question';
        this.emit(':ask', message, message);
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', messageHelp, messageHelp);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("I win! good bye"));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("I win! good bye"));
    }
};