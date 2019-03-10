import { window } from '@ephox/dom-globals';

const importKey = async function (key) {
  return await window.crypto.subtle.importKey(
    'raw', // raw format of the key - should be Uint8Array
    key,
    { // algorithm details
      name: 'HMAC',
      hash: { name: 'SHA-256' }
    },
    false, // export = false
    ['sign', 'verify'] // what this key can do
  );
};

const getSignature = async function (key, message) {
  const cryptoKey = await importKey(key);
  return await window.crypto.subtle.sign(
    'HMAC',
    cryptoKey,
    message
  );
};

export default {
  getSignature
};