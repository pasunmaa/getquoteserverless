// Copyright 2018 Seth Vargo
// Copyright 2018 Google, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// renamed from readSecretsFromStorage.js to function.js
// Google cloud expects a serverless function to be found from function.js or index.js

'use strict';

const {Storage} = require('@google-cloud/storage');
const storage = new Storage();

let username;
let password;
storage.bucket(process.env.STORAGE_BUCKET).file('app1').download()
  .then(data => {
    console.log('here');
    const j = JSON.parse(data);
    username = j.username;
    password = j.password;
  })
  .catch(err => {
    console.error(err)
  });

exports.F = (req, res) => {
  res.send(`${username}:${password}`)
}