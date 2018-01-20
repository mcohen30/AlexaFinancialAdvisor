'use strict';
const Alexa=require('alexa-sdk'); 

const APP_ID=null; //Fill this in 

const START_MESSAGE="Okay. I will give you some financial advice";

const TIME_HORIZONQ1="When do you plan to begin withdrawing from your investment?";

const TIME_HORIZONQ2="Once you begin withdrawing funds from your investments when do you plan spend all of the funds?"

const SCORE="Your current score is ";

var investmentRiskScore=0;

//Declares the states
const states={
	START: '_STARTMODE',
	ADVICE: '_ADVICEMODE'
};

const startHandlers=Alexa.CreateStateHander(states.START,

	//This should prompt Alexa to start giving financial advice
	"StartFinancialAdvice": function(){
		this.response.speak(START_MESSAGE);
		//Not quite sure why this, but it's here in case it's needed
		this.emit(":responseReady"); 
	}
);

const adviceHandlers=Alexa.CreateStatHander(states.ADVICE,

	"TimeHorizon": function(){
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
	};

);


function addScore(var score){
	investmentRiskScore+=score;
}




exports.handler = (event, context) => {

const alexa=Alexa.handler(event, context, callback);
alexa.appId=APP_ID;
alexa.registerHandlers(handlers, startHandlers, adviceHandlers);
alexa.execute();
	

}