import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/map';

@Injectable()
export class ViewreportService {

    constructor(
        @Inject('API_URL') private url: string,
        private authHttp: Http) { }

    viewReport(sql, params) {
        return new Promise((resolve, reject) => {
            // แนบตัวแปบไปกับ service
            this.authHttp.post(`${this.url}/report`, { query_sql: sql, query_params: params })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                });
        });
    }
    selectReport(query_id) {
        return new Promise((resolve, reject) => {
            // แนบตัวแปบไปกับ service
            this.authHttp.get(`${this.url}/subitem/${query_id}`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                });
        });
    }

}
