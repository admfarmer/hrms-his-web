import { Component, Injectable, Inject } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()

export class NotypeService {
    // URL to web API
    constructor(
        @Inject('API_URL')
        private url: string,
        private http: Http) { }

    getNotype() {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/notype`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }
    getType(id_type) {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/notype/${id_type}`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    addNotype(
        id_notype: any,
        id_type: any,
        code_notype: any,
        name_notype: any,
        name_TH: any
    ) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.url}/notype`, {
                id_type: id_type,
                code_notype: code_notype,
                name_notype: name_notype,
                name_TH: name_TH
            })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    updateNotype(
        id_notype: any,
        id_type: any,
        code_notype: any,
        name_notype: any,
        name_TH: any
    ) {
        return new Promise((resolve, reject) => {
            this.http.put(`${this.url}/notype`, {
                id_notype: id_notype,
                id_type: id_type,
                code_notype: code_notype,
                name_notype: name_notype,
                name_TH: name_TH
            })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    remove(id_notype: any) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.url}/notype/del`, { id_notype: id_notype })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

}
