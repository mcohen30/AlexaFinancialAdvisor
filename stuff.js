/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

var investmentRiskScore=0;
const START_MESSAGE="Okay. I will give you some financial advice";

const TIME_HORIZONQ1="When do you plan to begin withdrawing from your investment?";

const TIME_HORIZONQ2="Once you begin withdrawing funds from your investments when do you plan spend all of the funds?"

const SCORE="Your current score is ";

const APP_ID = "amzn1.ask.skill.75b9c99e-bdee-4bbf-8719-34b045597014";  // TODO replace with your app ID (OPTIONAL).

//Declares the states
const states={
	START: '_STARTMODE',
	ADVICE: '_ADVICEMODE'
};

const handlers={
	'LaunchRequest': function(){
		this.emit(":tell", 	START_MESSAGE);
	},
	'IntentRequest': function(){
		this.emit(":resposneReady");
	},
	'SessionEndedRequest': function(){
		this.emit(":resposneReady");
	}
}


const adviceHandlers=Alexa.CreateStateHandler(states.ADVICE,{

	'TimeHorizon': function(){
		this.response.speak(TIME_HORIZONQ1);
		this.emit(":responseReady");


		const response1=parseInt(this.event.request.intent.slots.type);

		// this.response.speak(TIME_HORIZONQ2);
		// this.emit(":responseReady");

		switch(response1){
			case (response1<3): addScore(1); break;
			case (response1>=3 && response1<6): addScore(3); break;
			case (response1>=6 && response1<11): addScore(7); break;
			case (response1>=11): addScore(10);
		}

		this.response.speak(SCORE + investmentRiskScore);
	}

    },   
    
     {
        'Unhandled': function(){
            const message = 'Say yes to continue, or no to end the game.';
            this.response.speak(message);
            this.emit(':responseReady');
        }
    }
);


function addScore(score){
	investmentRiskScore+=score;
}



exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    
    alexa.registerHandlers(handlers, adviceHandlers);
    alexa.execute();   
};
