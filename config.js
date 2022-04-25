import 'dotenv/config'
var cfg = {};

// HTTP Port to run our web application
cfg.port = process.env.PORT || 3000;
// Your Twilio account SID and auth token, both found at:
// https://www.twilio.com/user/account
// 
// A good practice is to store these string values as system environment
// variables, and load them from there as we are doing below. Alternately,
// you could hard code these values here as strings.
cfg.accountSid = process.env.TWILIO_ACCOUNT_SID;
cfg.authToken = process.env.TWILIO_AUTH_TOKEN;

// A Twilio number you control - choose one from:
// https://www.twilio.com/user/account/phone-numbers/incoming
// Specify in E.164 format, e.g. "+16519998877"
cfg.twilioNumber = process.env.TWILIO_NUMBER;

// The sales rep / agent's phone number
cfg.agentNumber1 = process.env.AGENT_NUMBER_1;
cfg.agentNumber2 = process.env.AGENT_NUMBER_2;

// Export configuration object
export default cfg;