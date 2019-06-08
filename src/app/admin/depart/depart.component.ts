import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, OnInit, Component, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { Encrypt } from '../../common-service/encrypt';
import { Router } from "@angular/router";
import { AlertService } from '../../common-service/SweetAlert.service';
import swal from 'sweetalert2';

import { DepartService } from '../admin-service/depart.service';

@Component({
    selector: 'app-depart',
    templateUrl: './depart.component.html',
    styleUrls: ['./depart.component.scss'],
    providers: [
        Encrypt,
        AlertService,
        DepartService
    ],
    encapsulation: ViewEncapsulation.None
})
export class DepartComponent implements OnInit {
    open: boolean = false;
    edit: boolean = false;
    isUpdate: boolean = false;
    alldeparts: any[] = [];

    id_depart: any;
    code_depart: any;
    code_group: any;
    name_depart: any;
    status: any;

    constructor(
        private departService: DepartService,
        private router: Router,
        private encryptProvider: Encrypt,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.showDepart();
    }

    Open() {
        this.open = true;
        this.id_depart = null;
        this.code_depart = null;
        this.code_group = null;
        this.name_depart = null;
        this.status = null;
    }
    showDepart() {
        this.alldeparts = [];
        this.departService.getDepart()
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.alldeparts = result.rows;
                        // console.log(this.alldeparts);
                    } else {
                        console.log(JSON.stringify(result.error));
                    }
                } else {
                    console.log("ไม่มีข้อมูล");
                }
            })
            .catch(() => {
                console.log("Server Error");
            })

    }

    addData() {
        this.open = false;
        if (this.code_depart && this.name_depart && this.status) {
            this.departService.addDepart(
                this.id_depart,
                this.code_depart,
                this.code_group,
                this.name_depart,
                this.status,
            )
                .then((results: any) => {
                    if (results.ok) {
                        console.log("เพิ่มข้อมูลสำเร็จ");
                        this.id_depart = null;
                        this.code_depart = null;
                        this.code_group = null;
                        this.name_depart = null;
                        this.status = null;
                        this.showDepart();
                    } else {
                        console.log("เพิ่มข้อมูลไม่สำเร็จ");
                    }
                }).catch(() => {
                    console.log("SERVER ERROR");
                })

        } else {
            console.log("การกรอกข้อมูล");
        }
    }

    editData(x) {
        // console.log(x);
        this.id_depart = x.id_depart;
        this.code_depart = x.code_depart;
        this.code_group = x.code_group;
        this.name_depart = x.name_depart;
        this.status = x.status;

        this.isUpdate = true;
        this.open = true;
    }

    updateData() {
        this.open = false;
        if (this.code_depart && this.name_depart && this.status) {
            this.departService.updateDepart(
                this.id_depart,
                this.code_depart,
                this.code_group,
                this.name_depart,
                this.status,
            )
                .then((results: any) => {
                    if (results.ok) {
                        console.log("แก้ไขข้อมูลเรียบร้อย");
                        this.id_depart = null;
                        this.code_depart = null;
                        this.code_group = null;
                        this.name_depart = null;
                        this.status = null;
                        this.showDepart();
                    } else {
                        console.log("แก้ไขข้อมูลไม่สำเร็จ");
                    }
                }).catch(() => {
                    console.log("SERVER ERROR");
                })

        } else {
            console.log("ข้อมูลไม่ครบ");
        }
    }

    save() {
        if (this.isUpdate) {
            this.updateData();

        } else {
            this.addData();
        }
    }

    delete(x) {
        // console.log(x);
        this.departService.remove(x.id_depart)
            .then((results: any) => {
                if (results.ok) {
                    this.showDepart();
                } else {
                    console.log(results.error);
                }
            }).catch(() => {
                console.log("SERVER ERROR");
            })
    }

}
