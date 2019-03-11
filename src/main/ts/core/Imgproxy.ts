import { btoa, window, TextEncoder } from '@ephox/dom-globals';

const utf8Decode = function (utf8) {
  if (typeof ArrayBuffer !== 'undefined' && utf8 instanceof ArrayBuffer) {
    return new Uint8Array(utf8);
  }
  if (typeof utf8 === 'string') {
    return new TextEncoder().encode(utf8);
  }
  return utf8;
};

const hexDecode = function (hex) {
  const strLen = hex.length;
  if (strLen % 2 !== 0) {
    throw new TypeError('Invalid hex string');
  }
  const length = strLen / 2;
  const buffer = new Uint8Array(length);
  for (let i = 0; i < length; ++i) {
    const parsed = parseInt(hex.substr(i * 2, 2), 16);
    if (isNaN(parsed)) {
      return buffer;
    }
    buffer[i] = parsed;
  }
  return buffer;
};

const urlSafeBase64 = function (str) {
  const base64Str = btoa(String.fromCharCode.apply(null, utf8Decode(str)));
  return base64Str.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
};

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

const createImgproxySignatureUrl = async function (
  resizingType: string,
  width: number,
  height: number,
  gravity: string,
  enlarge: number,
  nonEncodingUrl: string,
  extension: string,
  settings: any
) {
  const encodedUrl = urlSafeBase64(nonEncodingUrl);
  const path = `/${resizingType}/${width}/${height}/${gravity}/${enlarge}/${encodedUrl}.${extension}`;
  const hexArray = hexDecode(settings.salt);
  const utf8Array = utf8Decode(path);
  const message = new Uint8Array(hexArray.length + utf8Array.length);
  message.set(hexArray);
  message.set(utf8Array, hexArray.length);
  const signature = await getSignature(hexDecode(settings.key), message);
  const base64Signature = urlSafeBase64(signature);

  return `${settings.url}/${base64Signature}${path}`;
};

export default {
  createImgproxySignatureUrl
};