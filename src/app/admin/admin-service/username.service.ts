import { Component, Injectable, Inject } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()

export class UsernameService {
    // URL to web API
    constructor(
        @Inject('API_URL')
        private url: string,
        private http: Http) { }

    getUsername() {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/user`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    postUsername(idcard) {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.post(`${this.url}/user/password`, { idcard: idcard })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    addUsername(
        id_user: any,
        idcard: any,
        username: any,
        password: any,
        device_token: any,
        is_accept: any,
        id_depart: any,
        admin_status: any,
        chief_user: any,
        maniger_user: any
    ) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.url}/user`, {
                idcard: idcard,
                username: username,
                password: password,
                device_token: device_token,
                is_accept: is_accept,
                id_depart: id_depart,
                admin_status: admin_status,
                chief_user: chief_user,
                maniger_user: maniger_user
            })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    updateUsername(
        id_user: any,
        idcard: any,
        username: any,
        password: any,
        device_token: any,
        is_accept: any,
        id_depart: any,
        admin_status: any,
        chief_user: any,
        maniger_user: any
    ) {
        return new Promise((resolve, reject) => {
            this.http.put(`${this.url}/user`, {
                id_user: id_user,
                idcard: idcard,
                username: username,
                password: password,
                device_token: device_token,
                is_accept: is_accept,
                id_depart: id_depart,
                admin_status: admin_status,
                chief_user: chief_user,
                maniger_user: maniger_user
            })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    updatePasword(
        id_user: any,
        idcard: any,
        username: any,
        password: any,
        device_token: any,
        is_accept: any,
        id_depart: any,
        admin_status: any,
        chief_user: any,
        maniger_user: any
    ) {
        return new Promise((resolve, reject) => {
            this.http.put(`${this.url}/user/newpass`, {
                id_user: id_user,
                idcard: idcard,
                username: username,
                password: password,
                device_token: device_token,
                is_accept: is_accept,
                id_depart: id_depart,
                admin_status: admin_status,
                chief_user: chief_user,
                maniger_user: maniger_user
            })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }


    remove(id_user: any) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.url}/user/del`, { id_user: id_user })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

}
