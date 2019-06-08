import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/map';

@Injectable()
export class MenuGrpService {

    constructor(
        @Inject('API_URL') private url: string,
        private http: Http) { }

    getSubItem() {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.url}/subitem/other`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    getSubItemMG() {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.url}/subitem/manager`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    getSubItemDpart() {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.url}/subitem/depart`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

}
