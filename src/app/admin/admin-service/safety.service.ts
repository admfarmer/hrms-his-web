import { Component, Injectable, Inject } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()

export class SafetyService {
    // URL to web API
    constructor(
        @Inject('API_URL')
        private url: string,
        private http: Http) { }

    getSafety() {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/safety`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }
    getSide(id_side) {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/safety/${id_side}`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    addSafety(
        id_safety: any,
        id_side: any,
        code_safety: any,
        name_safety: any
    ) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.url}/safety`, {
                id_side: id_side,
                code_safety: code_safety,
                name_safety: name_safety
            })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    updateSafety(
        id_safety: any,
        id_side: any,
        code_safety: any,
        name_safety: any
    ) {
        return new Promise((resolve, reject) => {
            this.http.put(`${this.url}/safety`, {
                id_safety: id_safety,
                id_side: id_side,
                code_safety: code_safety,
                name_safety: name_safety
            })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    remove(id_safety: any) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.url}/safety/del`, { id_safety: id_safety })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

}
