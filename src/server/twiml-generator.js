import twilio from 'twilio';

export const connectConferenceTwiml = function(options) {
  return new twilio.TwimlResponse().dial(function(dialNode) {
    dialNode.conference(options.conferenceId, {
      'startConferenceOnEnter': options.startConferenceOnEnter,
      'endConferenceOnExit': options.endConferenceOnExit,
      'record': 'record-from-start',
      'waitUrl': options.waitUrl
    });
  });
};

export const waitResponseTwiml = function() {
  return new twilio.TwimlResponse()
    .say('Thank you for calling. Please wait in line for a few seconds. An agent will be with you shortly.')
    .play('http://com.twilio.music.classical.s3.amazonaws.com/BusyStrings.mp3');
};
