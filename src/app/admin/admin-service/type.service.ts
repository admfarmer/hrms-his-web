import { Component, Injectable, Inject } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()

export class TypeService {
    // URL to web API
    constructor(
        @Inject('API_URL')
        private url: string,
        private http: Http) { }

    getType() {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/type`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }
    getSafety(id_safety) {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/type/${id_safety}`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    addType(
        id_type: any,
        id_safety: any,
        code_type: any,
        name_type: any,
        name_TH: any,
        id_depart: any

    ) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.url}/type`, {
                id_safety: id_safety,
                code_type: code_type,
                name_type: name_type,
                name_TH: name_TH,
                id_depart: id_depart
            })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    updateType(
        id_type: any,
        id_safety: any,
        code_type: any,
        name_type: any,
        name_TH: any,
        id_depart: any
    ) {
        return new Promise((resolve, reject) => {
            this.http.put(`${this.url}/type`, {
                id_type: id_type,
                id_safety: id_safety,
                code_type: code_type,
                name_type: name_type,
                name_TH: name_TH,
                id_depart: id_depart
            })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    remove(id_type: any) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.url}/type/del`, { id_type: id_type })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

}
