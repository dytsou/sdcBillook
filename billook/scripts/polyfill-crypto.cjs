const { webcrypto } = require('crypto');

if (typeof global.crypto === 'undefined' && webcrypto) {
  global.crypto = webcrypto;
}

