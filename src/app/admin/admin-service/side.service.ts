import { Component, Injectable, Inject } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()

export class SideService {
    // URL to web API
    constructor(
        @Inject('API_URL')
        private url: string,
        private http: Http) { }

    getSide() {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/side`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    addSide(
        id_side: any,
        code_side: any,
        name_side: any
    ) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.url}/side`, {
                code_side: code_side,
                name_side: name_side
            })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    updateSide(
        id_side: any,
        code_side: any,
        name_side: any
    ) {
        return new Promise((resolve, reject) => {
            this.http.put(`${this.url}/side`, {
                id_side: id_side,
                code_side: code_side,
                name_side: name_side
            })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    remove(id_side: any) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.url}/side/del`, { id_side: id_side })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

}
