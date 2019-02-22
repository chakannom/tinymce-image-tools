import * as createHmac from 'create-hmac';
import { Buffer } from 'buffer';

const createImgproxySignatureUrl = function (
    resizingType: string,
    width: number,
    height: number,
    gravity: string,
    enlarge: number,
    nonEncodingUrl: string,
    extension: string,
    settings: any
) {
    const urlSafeBase64 = (str) =>
        new Buffer(str)
            .toString('base64')
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    const hexDecode = (hex) => Buffer.from(hex, 'hex');

    const encodedUrl = urlSafeBase64(nonEncodingUrl);
    const path = `/${resizingType}/${width}/${height}/${gravity}/${enlarge}/${encodedUrl}.${extension}`;

    const hmac = createHmac('sha256', hexDecode(settings.key));
    hmac.update(hexDecode(settings.salt));
    hmac.update(path);

    const signature = urlSafeBase64(hmac.digest());

    return `${settings.url}/${signature}${path}`;
};

export default {
    createImgproxySignatureUrl
};