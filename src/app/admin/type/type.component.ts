import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, OnInit, Component, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { Encrypt } from '../../common-service/encrypt';
import { Router } from "@angular/router";
import { AlertService } from '../../common-service/SweetAlert.service';
import swal from 'sweetalert2';

import { TypeService } from '../admin-service/type.service';
import { SafetyService } from '../admin-service/safety.service';
import { DepartService } from '../admin-service/depart.service';


@Component({
    selector: 'app-type',
    templateUrl: './type.component.html',
    styleUrls: ['./type.component.scss'],
    providers: [TypeService, SafetyService, Encrypt, AlertService, DepartService],
    encapsulation: ViewEncapsulation.None
})
export class TypeComponent implements OnInit {
    open: boolean = false;
    isUpdate: boolean = false;
    allType: any = [];
    allSafety: any = [];
    alldeparts: any[] = [];

    id_type: any;
    id_safety: any;
    code_type: any;
    name_type: any;
    name_TH: any;
    id_depart: any;

    constructor(
        private typeService: TypeService,
        private safetyService: SafetyService,
        private router: Router,
        private encryptProvider: Encrypt,
        private alertService: AlertService,
        private departService: DepartService,
    ) { }

    ngOnInit() {
        this.showAllType();
        this.showAllSafety();
        this.showDepart();
    }
    Open() {
        this.open = true;
        this.id_type = null;
        this.id_safety = null;
        this.code_type = null;
        this.name_type = null;
        this.name_TH = null;
        this.id_depart = null;

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

    showAllSafety() {
        this.allSafety = [];
        this.safetyService.getSafety()
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.allSafety = result.rows;
                        // console.log(this.allpersons);
                    } else {
                        console.log(JSON.stringify(result.error));
                    }
                } else {
                    console.log(JSON.stringify(result.error));
                }
            })
            .catch(() => {
                console.log("Server Error");
            })

    }

    showAllType() {
        this.allType = [];
        this.typeService.getType()
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.allType = result.rows;
                        // console.log(this.allpersons);
                    } else {
                        console.log(JSON.stringify(result.error));
                    }
                } else {
                    console.log(JSON.stringify(result.error));
                }
            })
            .catch(() => {
                console.log("Server Error");
            })

    }

    addData() {
        this.open = false;

        if (this.id_safety && this.code_type && this.name_type) {
            this.typeService.addType(
                this.id_type,
                this.id_safety,
                this.code_type,
                this.name_type,
                this.name_TH,
                this.id_depart
            )
                .then((results: any) => {
                    if (results.ok) {
                        console.log("เพิ่มข้อมูลสำเร็จ");
                        this.showAllType();
                        this.id_type = null;
                        this.id_safety = null;
                        this.code_type = null;
                        this.name_type = null;
                        this.name_TH = null;
                        this.id_depart = null;
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
        console.log(x);

        this.id_type = x.id_type;
        this.id_safety = x.id_safety;
        this.code_type = x.code_type;
        this.name_type = x.name_type;
        this.name_TH = x.name_TH;
        this.id_depart = x.id_depart;

        this.isUpdate = true;
        this.open = true;
    }

    updateData() {
        this.open = false;
        if (this.id_type && this.id_safety && this.code_type && this.name_type) {
            this.typeService.updateType(
                this.id_type,
                this.id_safety,
                this.code_type,
                this.name_type,
                this.name_TH,
                this.id_depart
            )
                .then((results: any) => {
                    if (results.ok) {
                        console.log("แก้ไขข้อมูลเรียบร้อย");
                        this.showAllType();
                        this.id_type = null;
                        this.id_safety = null;
                        this.code_type = null;
                        this.name_type = null;
                        this.name_TH = null;
                        this.id_depart = null;
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

        console.log(x);
        this.typeService.remove(x.id_type)
            .then((results: any) => {
                if (results.ok) {
                    this.showAllType();
                } else {
                    console.log(results.error);
                }
            }).catch(() => {
                console.log("SERVER ERROR");
            })
    }
}
