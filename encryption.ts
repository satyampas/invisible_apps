import CryptoJS from 'crypto-js';
const key = process.env.ENCRYPTION_KEY!;
export const encrypt = (text: string): string => CryptoJS.AES.encrypt(text, key).toString();
export const decrypt = (cipher: string): string => CryptoJS.AES.decrypt(cipher, key).toString(CryptoJS.enc.Utf8);