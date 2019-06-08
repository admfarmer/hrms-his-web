import { Component, Injectable, Inject } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()

export class AccountService {
    // URL to web API
    constructor(
        @Inject('API_URL')
        private url: string,
        private http: Http) { }

    getAccount() {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/account`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }
    getSelectacc(code_account) {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/account/selectacc/${code_account}`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }


    getSelect(id_side, id_safety, id_type, id_notype) {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/account/${id_side}/${id_safety}/${id_type}/${id_notype}`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    addAccount(
        id_account: any,
        code_account: any,
        id_side: any,
        id_safety: any,
        id_type: any,
        id_notype: any,
        name_account: any,
        simple: any,
        status_acc: any
    ) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.url}/account`, {
                code_account: code_account,
                id_side: id_side,
                id_safety: id_safety,
                id_type: id_type,
                id_notype: id_notype,
                name_account: name_account,
                simple: simple,
                status_acc: status_acc
            })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    updateAccount(
        id_account: any,
        code_account: any,
        id_side: any,
        id_safety: any,
        id_type: any,
        id_notype: any,
        name_account: any,
        simple: any,
        status_acc: any
    ) {
        return new Promise((resolve, reject) => {
            this.http.put(`${this.url}/account`, {
                id_account: id_account,
                code_account: code_account,
                id_side: id_side,
                id_safety: id_safety,
                id_type: id_type,
                id_notype: id_notype,
                name_account: name_account,
                simple: simple,
                status_acc: status_acc

            })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    remove(id_account: any) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.url}/account/del`, { id_account: id_account })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

}
