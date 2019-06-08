import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, OnInit, Component, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { Encrypt } from '../../common-service/encrypt';
import { Router } from "@angular/router";
import { AlertService } from '../../common-service/SweetAlert.service';
import swal from 'sweetalert2';

import { SafetyService } from '../admin-service/safety.service';
import { SideService } from '../admin-service/side.service';


@Component({
    selector: 'app-safety',
    templateUrl: './safety.component.html',
    styleUrls: ['./safety.component.scss'],
    providers: [SafetyService, SideService, Encrypt, AlertService],
    encapsulation: ViewEncapsulation.None
})
export class SafetyComponent implements OnInit {
    open: boolean = false;
    isUpdate: boolean = false;
    allSafety: any = [];
    allSide: any = [];

    id_safety: any;
    id_side: any;
    code_safety: any;
    name_safety: any;

    constructor(
        private safetyService: SafetyService,
        private sideService: SideService,
        private router: Router,
        private encryptProvider: Encrypt,
        private alertService: AlertService

    ) { }

    ngOnInit() {
        this.showAllSafety();
        this.showAllSide();
    }
    Open() {
        this.open = true;
        this.id_safety = null;
        this.id_side = null;
        this.code_safety = null;
        this.name_safety = null;

    }
    showAllSide() {
        this.allSide = [];
        this.sideService.getSide()
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.allSide = result.rows;
                        // console.log(this.allpersons);
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
                    console.log("ไม่มีข้อมูล");
                }
            })
            .catch(() => {
                console.log("Server Error");
            })

    }

    addData() {
        this.open = false;

        if (this.id_side && this.code_safety && this.name_safety) {
            this.safetyService.addSafety(
                this.id_safety,
                this.id_side,
                this.code_safety,
                this.name_safety
            )
                .then((results: any) => {
                    if (results.ok) {
                        console.log("เพิ่มข้อมูลสำเร็จ");
                        this.showAllSafety();
                        this.id_safety = null;
                        this.id_side = null;
                        this.code_safety = null;
                        this.name_safety = null;
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

        this.id_safety = x.id_safety;
        this.id_side = x.id_side;
        this.code_safety = x.code_safety;
        this.name_safety = x.name_safety;

        this.isUpdate = true;
        this.open = true;
    }

    updateData() {
        this.open = false;
        if (this.id_safety && this.id_side && this.code_safety && this.name_safety) {
            this.safetyService.updateSafety(
                this.id_safety,
                this.id_side,
                this.code_safety,
                this.name_safety
            )
                .then((results: any) => {
                    if (results.ok) {
                        console.log("แก้ไขข้อมูลเรียบร้อย");
                        this.showAllSafety();
                        this.id_safety = null;
                        this.id_side = null;
                        this.code_safety = null;
                        this.name_safety = null;
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
        this.safetyService.remove(x.id_safety)
            .then((results: any) => {
                if (results.ok) {
                    this.showAllSafety();
                } else {
                    console.log(results.error);
                }
            }).catch(() => {
                console.log("SERVER ERROR");
            })
    }
}
