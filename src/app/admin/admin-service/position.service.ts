import { Component, Injectable, Inject } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()

export class PosiTionService {
    // URL to web API
    constructor(
        @Inject('API_URL')
        private url: string,
        private http: Http) { }

    getPosiTion() {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/position`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    addPosiTion(
        id_pos: any,
        pos_name: any
    ) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.url}/position`, {
                pos_name: pos_name
            })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    updatePosiTion(
        id_pos: any,
        pos_name: any
    ) {
        return new Promise((resolve, reject) => {
            this.http.put(`${this.url}/position`, {
                id_pos: id_pos,
                pos_name: pos_name
            })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    remove(id_pos: any) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.url}/position/del`, { id_pos: id_pos })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

}
