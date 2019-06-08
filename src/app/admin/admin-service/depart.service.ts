import { Component, Injectable, Inject } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()

export class DepartService {
    // URL to web API

    constructor(
        @Inject('API_URL')
        private url: string,
        private http: Http) { }

    getDepart() {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/depart`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }
    getDepartID(id_depart) {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/depart/selectID/${id_depart}`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }
    DepQuality() {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/depart/quality`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    selectDepart(code_depart, varquality) {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.url}/depart/${code_depart}/${varquality}`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, () => {
                    reject('Connection failed!');
                });
        });
    }
    selectDepartOne(code_depart) {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.url}/depart/selectOne/${code_depart}`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, () => {
                    reject('Connection failed!');
                });
        });
    }

    addDepart(
        id_depart: any,
        code_depart: any,
        code_group: any,
        name_depart: any,
        status: any
    ) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.url}/depart`, {
                code_depart: code_depart,
                code_group: code_group,
                name_depart: name_depart,
                status: status
            })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    updateDepart(
        id_depart: any,
        code_depart: any,
        code_group: any,
        name_depart: any,
        status: any
    ) {
        return new Promise((resolve, reject) => {
            this.http.put(`${this.url}/depart`, {
                id_depart: id_depart,
                code_depart: code_depart,
                code_group: code_group,
                name_depart: name_depart,
                status: status
            })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    remove(id_depart: any) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.url}/depart/del`, { id_depart: id_depart })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }
}
