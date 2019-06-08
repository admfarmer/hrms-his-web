import { Component, Injectable, Inject } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()

export class LevelService {
    // URL to web API
    constructor(
        @Inject('API_URL')
        private url: string,
        private http: Http) { }

    getLevel() {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/level`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }
    getSelect(id_side) {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/level/${id_side}`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    addLevel(
        id_level: any,
        code_level: any,
        name_level: any,
        group_level: any
    ) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.url}/level`, {
                code_level: code_level,
                name_level: name_level,
                group_level: group_level
            })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    updateLevel(
        id_level: any,
        code_level: any,
        name_level: any,
        group_level: any
    ) {
        return new Promise((resolve, reject) => {
            this.http.put(`${this.url}/level`, {
                id_level: id_level,
                code_level: code_level,
                name_level: name_level,
                group_level: group_level
            })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    remove(id_level: any) {
        console.log(id_level);
        return new Promise((resolve, reject) => {
            this.http.post(`${this.url}/level/del`, { id_level: id_level })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

}
