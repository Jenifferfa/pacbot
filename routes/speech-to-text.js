/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const watson = require('watson-developer-cloud');

const authorizationService = new watson.AuthorizationV1({
  username:
    process.env.SPEECH_TO_TEXT_USERNAME ||
    '6e7f8d74-f822-49c2-9a8f-534e4d9cabe1',
  password: process.env.SPEECH_TO_TEXT_PASSWORD || 'Y8Kxv68NLjQ3',
  url: watson.SpeechToTextV1.URL,
});

// Inform user that TTS is not configured properly or at all
if (
  !(process.env.SPEECH_TO_TEXT_USERNAME && process.env.SPEECH_TO_TEXT_PASSWORD)
) {
  // eslint-disable-next-line
  console.warn(
    'WARNING: The app has not been configured with a SPEECH_TO_TEXT_USERNAME and/or ' +
      'a SPEECH_TO_TEXT_PASSWORD environment variable.',
  );
}

module.exports = function initSpeechToText(app) {
  app.get('/api/speech-to-text/token', (req, res) =>
    authorizationService.getToken(function(err, token) {
      if (err) {
        console.log('error:', err);
        console.log('Tente de novo');
      } else {
        res.send(token);
      }
    }),
  );
};
