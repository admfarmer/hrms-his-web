import { Component, Injectable, Inject } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()

export class PersonService {
    // URL to web API

    constructor(
        @Inject('API_URL')
        private url: string,
        private http: Http) { }

    getPerson() {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/person`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    getSelect() {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/person/select`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    getSelectjoin() {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/person/join`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    getSelectcard(idcard) {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/person/${idcard}`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    addPerson(
        id_person: any,
        idcard: any,
        title: any,
        first_name: any,
        last_name: any,
        title_en: any,
        fname_en: any,
        lname_en: any,
        sex: any,
        position: any,
        addr: any,
        bdate: any,
        workdate: any,
        depart: any,
        typetext: any,
        lasasom: any,
        telephone: any,
        email: any,
        quality: any) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.url}/person`, {
                idcard: idcard,
                title: title,
                first_name: first_name,
                last_name: last_name,
                title_en: title_en,
                fname_en: fname_en,
                lname_en: lname_en,
                sex: sex,
                position: position,
                addr: addr,
                bdate: bdate,
                workdate: workdate,
                depart: depart,
                typetext: typetext,
                lasasom: lasasom,
                telephone: telephone,
                email: email,
                quality: quality
            })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    updatePerson(
        id_person: any,
        idcard: any,
        title: any,
        first_name: any,
        last_name: any,
        title_en: any,
        fname_en: any,
        lname_en: any,
        sex: any,
        position: any,
        addr: any,
        bdate: any,
        workdate: any,
        depart: any,
        typetext: any,
        lasasom: any,
        telephone: any,
        email: any,
        quality: any) {
        return new Promise((resolve, reject) => {
            this.http.put(`${this.url}/person`, {
                id_person: id_person,
                idcard: idcard,
                title: title,
                first_name: first_name,
                last_name: last_name,
                title_en: title_en,
                fname_en: fname_en,
                lname_en: lname_en,
                sex: sex,
                position: position,
                addr: addr,
                bdate: bdate,
                workdate: workdate,
                depart: depart,
                typetext: typetext,
                lasasom: lasasom,
                telephone: telephone,
                email: email,
                quality: quality
            })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    remove(id_person: any) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.url}/person/del`, { id_person: id_person })
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
    DepartID(id_depart) {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.url}/depart/selectID/${id_depart}`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, () => {
                    reject('Connection failed!');
                });
        });
    }

    Depart() {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.url}/depart`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, () => {
                    reject('Connection failed!');
                });
        });
    }

    Position() {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.url}/position`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, () => {
                    reject('Connection failed!');
                });
        });
    }

    Gender() {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.url}/gender`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, () => {
                    reject('Connection failed!');
                });
        });
    }

}
