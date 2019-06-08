import { Component, Injectable, Inject } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()

export class IncidentService {
    // URL to web API
    constructor(
        @Inject('API_URL')
        private url: string,
        private http: Http) { }

    getIncident() {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/incident`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    getShowIncident() {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/incident/selectShow`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    getIncidentRisk() {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/incident/selectShowRisk`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    Quality(quality) {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/incident/quality/${quality}`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    QualityIN(quality) {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/incident/qualityIn/${quality}`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }
    QualityOUT(quality) {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/incident/qualityOut/${quality}`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    getSelectIn(dep_res_one, dep_res_group) {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/incident/selectIn/${dep_res_one}/${dep_res_group}`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }
    getSelectShowIn(dep_res_one, dep_res_group) {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/incident/selectShowIn/${dep_res_one}/${dep_res_group}`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    getSelectOut(dep_rep_one, dep_res_group) {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/incident/selectOut/${dep_rep_one}/${dep_res_group}`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    getSelectShowOut(dep_rep_one, dep_res_group) {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/incident/selectShowOut/${dep_rep_one}/${dep_res_group}`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    getSelectInraw(dep_res_one, dep_res_two, dep_res_group) {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/incident/qualityIn/${dep_res_one}/${dep_res_two}/${dep_res_group}`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }
    getSelectShowInraw(dep_res_one, dep_res_two, dep_res_group) {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/incident/qualityShowIn/${dep_res_one}/${dep_res_two}/${dep_res_group}`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    getSelectOutraw(dep_rep_one, dep_rep_two, dep_res_group) {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/incident/qualityOut/${dep_rep_one}/${dep_rep_two}/${dep_res_group}`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    getSelectShowOutraw(dep_rep_one, dep_rep_two, dep_res_group) {
        return new Promise((resolve, reject) => {
            // route ดูที่ API
            this.http.get(`${this.url}/incident/qualityShowOut/${dep_rep_one}/${dep_rep_two}/${dep_res_group}`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    addIncident(
        id_incident: any,
        hn_incident: any,
        idcard_incident: any,
        dep_rep_id: any,
        dep_res_id: any,
        id_side: any,
        id_safety: any,
        id_type: any,
        id_notype: any,
        code_account: any,
        affected_id: any,
        sex_incident: any,
        age_incident: any,
        location_incident: any,
        date_incident: any,
        date_account: any,
        time_incident: any,
        agents_involved: any,
        code_level: any,
        other_involved: any,
        noteceo: any,
        date_rep: any,
        date_res: any,
        resulting_actions: any,
        conf_output: any,
        conf_chief: any,
        conf_nrls: any,
        near_miss_status: any
    ) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.url}/incident`, {
                hn_incident: hn_incident,
                idcard_incident: idcard_incident,
                dep_rep_id: dep_rep_id,
                dep_res_id: dep_res_id,
                id_side: id_side,
                id_safety: id_safety,
                id_type: id_type,
                id_notype: id_notype,
                code_account: code_account,
                affected_id: affected_id,
                sex_incident: sex_incident,
                age_incident: age_incident,
                location_incident: location_incident,
                date_incident: date_incident,
                date_account: date_account,
                time_incident: time_incident,
                agents_involved: agents_involved,
                code_level: code_level,
                other_involved: other_involved,
                noteceo: noteceo,
                date_rep: date_rep,
                date_res: date_res,
                resulting_actions: resulting_actions,
                conf_output: conf_output,
                conf_chief: conf_chief,
                conf_nrls: conf_nrls,
                near_miss_status: near_miss_status
            })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    updateIncident(
        id_incident: any,
        hn_incident: any,
        idcard_incident: any,
        dep_rep_id: any,
        dep_res_id: any,
        id_side: any,
        id_safety: any,
        id_type: any,
        id_notype: any,
        code_account: any,
        affected_id: any,
        sex_incident: any,
        age_incident: any,
        location_incident: any,
        date_incident: any,
        date_account: any,
        time_incident: any,
        agents_involved: any,
        code_level: any,
        other_involved: any,
        noteceo: any,
        date_rep: any,
        date_res: any,
        resulting_actions: any,
        conf_output: any,
        conf_chief: any,
        conf_nrls: any,
        near_miss_status: any
    ) {
        return new Promise((resolve, reject) => {
            this.http.put(`${this.url}/incident`, {
                id_incident: id_incident,
                hn_incident: hn_incident,
                idcard_incident: idcard_incident,
                dep_rep_id: dep_rep_id,
                dep_res_id: dep_res_id,
                id_side: id_side,
                id_safety: id_safety,
                id_type: id_type,
                id_notype: id_notype,
                code_account: code_account,
                affected_id: affected_id,
                sex_incident: sex_incident,
                age_incident: age_incident,
                location_incident: location_incident,
                date_incident: date_incident,
                date_account: date_account,
                time_incident: time_incident,
                agents_involved: agents_involved,
                code_level: code_level,
                other_involved: other_involved,
                noteceo: noteceo,
                date_rep: date_rep,
                date_res: date_res,
                resulting_actions: resulting_actions,
                conf_output: conf_output,
                conf_chief: conf_chief,
                conf_nrls: conf_nrls,
                near_miss_status: near_miss_status
            })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }

    remove(id_incident: any) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.url}/incident/del`, { id_incident: id_incident })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
        })
    }
    sendBotLine(message) {
        return new Promise((resolve, reject) => {
            // แนบตัวแปบไปกับ service
            // tslint:disable-next-line:max-line-length -- token กลุ่ม Line โรงพยาบาล
            this.http.post(`${this.url}/incident/botline`, { token: 'TPQG4mGOTMb2xbZJVqBBlzVmEBrkWgHhRF1d2E3Ono8', message: message })
                // tslint:disable-next-line:max-line-length
                // this.http.post(`${this.url}/incident/botline`, { token: 'B10ZaXJb5EIu07jBSPGYbUvVL7hyASPFQpyOba1Apmo', message: message })
                // this.http.post(`${this.url}/incident/botline`, { token: 'MbIXGoEiskyA3niKQwFhLeNMvSvgMZAw4Q4MgnSVwlb', message: message })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                });
        });
    }

}
