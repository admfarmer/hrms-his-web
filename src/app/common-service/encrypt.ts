import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
// var CryptoJS = require("crypto-js");

import * as CryptoJS from 'crypto-js';

@Injectable()
export class Encrypt {
    secretKey: string = '1234567890';

    constructor(public http: Http) { }

    encrypt(plaintext) {
        let ciphertext = CryptoJS.AES.encrypt(plaintext, this.secretKey);
        return ciphertext.toString();
    }

    decrypt(encryptText) {
        let bytes = CryptoJS.AES.decrypt(encryptText, this.secretKey);
        let plaintext = bytes.toString(CryptoJS.enc.Utf8);
        return plaintext;
    }

}
