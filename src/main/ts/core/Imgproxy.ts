import Crypto from './Crypto';

const urlSafeBase64 = (str) => {
  return Buffer.from(str).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
};

const hexDecode = (hex) => {
  return Buffer.from(hex, 'hex');
};

const utf8Decode = (utf8) => {
  return Buffer.from(utf8, 'utf8');
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
  const message = Buffer.concat([hexDecode(settings.salt), utf8Decode(path)]);
  const signature = await Crypto.getSignature(hexDecode(settings.key), message);
  const base64Signature = urlSafeBase64(signature);

  return `${settings.url}/${base64Signature}${path}`;
};

export default {
  createImgproxySignatureUrl
};