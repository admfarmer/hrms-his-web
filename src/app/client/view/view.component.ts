import { Component, OnInit, Input, Inject } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, Headers, RequestOptions } from "@angular/http";
import { FormsModule } from '@angular/forms';

import { ViewreportService } from '../client-service/viewreport-service';
import { DepartService } from '../../admin/admin-service/depart.service'
import * as CryptoJS from 'crypto-js';
import { ActivatedRoute, Router } from '@angular/router';

import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { ExcelService } from '../../common-service/excel.service';

import * as jsPDF from 'jspdf';
import * as jsPDFauto from 'jspdf-autotable';
import * as html2canvas from 'html2canvas';
// declare let jsPDF: any;
import * as _ from 'lodash';
import * as moment from 'moment';


// import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    providers: [ViewreportService, ExcelService, DepartService],
    styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
    errorMessage: string;
    @Input() kpiIdSend: string;
    loading: boolean = false;
    Dataviews: any[] = [];
    AllMenu: any[] = [];
    subitems: any[] = [];
    getSubItem: any = [];
    title_name: any;
    comment: any;
    sub_id: any;
    sql: any;
    params: any;
    param_x: any = [];
    param_xx: any = [];
    param: any = [];
    // menu_id: any;
    // item_id: any;

    query_id: any;
    tableName: any;
    rowLength: any;
    date: Date = new Date();
    mode = 'Promise';

    tableDatas: any = [];
    fieldDatas: any = [];
    // excelDatas: any = [];
    i: any;

    alldeparts: any[] = [];


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private viewreportService: ViewreportService,
        private departService: DepartService,
        @Inject("API_URL") private url: string,
        private http: Http,
        private excelService: ExcelService,

    ) {
        this.route.params.subscribe(params => {
            this.query_id = params['query_id'];
            this.fieldDatas = [null];
            this.tableDatas = [null];
            this.showDatas(this.query_id);
        })
    }

    ngOnInit() {
        this.showDepart();
    }

    exportToExcel() {
        var options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalseparator: '.',
            showLabels: true,
            showTitle: true,
            useBom: true,
            headers: [this.fieldDatas]
        };
        new Angular5Csv(this.Dataviews, this.tableName, options);

    }

    exportToPdf() {
        var columns = this.fieldDatas;
        var rows = this.tableDatas;

        // console.log(this.tableName);
        //-----------
        var doc = new jsPDF();
        doc.text(20, 20, 'test');
        doc.table(20, 30, rows, columns, 14)
        doc.addPage();
        html2canvas(document.getElementById('graph')).then(function (canvas) {
            var img = canvas.toDataURL("image/png");
            doc.addImage(img, 'JPEG', 100, 100);
            doc.save('test.pdf');
        });
        doc.save('Test.pdf');

    }

    showDepart() {
        this.alldeparts = [];
        this.departService.getDepart()
            .then((result: any) => {
                if (result.ok) {
                    this.alldeparts = result.rows;
                    // console.log(this.alldeparts);
                } else {
                    console.log(JSON.stringify(result.error));
                }
            })
            .catch(() => {
                console.log("Server Error");
            })

    }

    showDatas(query_id) {
        // this.nav.get(query_id)
        this.subitems = [];
        this.param_xx = [];
        this.param_x = [null];
        this.param = [null];

        // this.sub_id = '1';   // ส่งค่ามาจาก เมนู
        this.subitems = [];
        this.viewreportService.selectReport(this.query_id)
            .then((result: any) => {
                if (result.ok) {
                    this.subitems = result.rows;   // ตอนรับ ก็ต้องมารับค่า rows แบบนี้
                    this.sql = this.subitems[0].query_sql
                    this.params = this.subitems[0].query_params
                    this.comment = this.subitems[0].comment
                    this.tableName = this.subitems[0].comment
                    if (this.params) {
                        this.param_xx = this.params.split(",");
                    } else {
                        // this.open = false;
                    }

                    this.Dataviews = [];
                    this.viewreportService.viewReport(this.sql, this.params)
                        .then((res: any) => {
                            const datas = [];
                            if (res.ok) {
                                const _datafield = [];
                                this.Dataviews = res.rows[0]; // ตอนรับ ก็ต้องมารับค่า rows แบบนี้
                                this.AllMenu = res.rows[1]; // ตอนรับ ก็ต้องมารับค่า rows แบบนี้
                                _.forEach(this.AllMenu, (v, k) => {  // ดึงข้อมูล colums ไปเก็บไว้ที่ _datafield
                                    _datafield.push(v.name);
                                })
                                this.Dataviews.forEach(v => {   // ดึงข้อมูล roows ไปเก็บไว้ที่ _data
                                    let _data = [];
                                    _.forEach(v, x => {
                                        _data.push(x);
                                    });
                                    this.tableDatas.push(_data);  // ส่งค่า _data ไปเก็บใน this.tableDatas เพื่อไปแสดงหน้า thml
                                });
                                this.fieldDatas = _datafield;  // ส่งค่า _datafield ไปเก็บใน this.fieldDatas เพื่อไปแสดงหน้า thml
                            }
                        }).catch(error => {
                            console.log(error);
                        })

                }
            }).catch(error => {
                console.log(error);
            })
    }

    KeyParam(xx, input, idx) {
        let param: any;
        let name: any = xx;
        let data: any = input.value;
        this.param[idx] = { name, data };
    }

    showParams() {

        this.fieldDatas = [null];
        this.tableDatas = [null];
        let i: any;
        let x: any;
        let xx: any;
        // this.open = false;

        for (i = 0; i < this.param.length; i++) {
            x = this.param[i].name;
            xx = this.param[i].data;
            this.param_x[i] = xx;
        }

        console.log(this.param_x);
        this.params = this.param_x;
        this.Dataviews = [];
        this.viewreportService.viewReport(this.sql, this.params)
            .then((res: any) => {

                const datas = [];
                if (res.ok) {
                    const _datafield = [];
                    this.Dataviews = res.rows[0]; // ตอนรับ ก็ต้องมารับค่า rows แบบนี้
                    this.AllMenu = res.rows[1]; // ตอนรับ ก็ต้องมารับค่า rows แบบนี้
                    _.forEach(this.AllMenu, (v, k) => {  // ดึงข้อมูล colums ไปเก็บไว้ที่ _datafield
                        _datafield.push(v.name);
                    })

                    this.Dataviews.forEach(v => {   // ดึงข้อมูล roows ไปเก็บไว้ที่ _data
                        let _data = [];
                        _.forEach(v, x => {
                            _data.push(x);
                        });
                        this.tableDatas.push(_data);  // ส่งค่า _data ไปเก็บใน this.tableDatas เพื่อไปแสดงหน้า thml
                    });
                    this.fieldDatas = _datafield;  // ส่งค่า _datafield ไปเก็บใน this.fieldDatas เพื่อไปแสดงหน้า thml
                }
            }).catch(error => {
                console.log(error);
            })
    }
}
