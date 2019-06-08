import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, OnInit, Component, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { Encrypt } from '../../common-service/encrypt';
import { Router } from "@angular/router";
import { AlertService } from '../../common-service/SweetAlert.service';
import swal from 'sweetalert2';

import { SideService } from '../admin-service/side.service';

@Component({
    selector: 'app-side',
    templateUrl: './side.component.html',
    styleUrls: ['./side.component.scss'],
    providers: [SideService, Encrypt, AlertService],
    encapsulation: ViewEncapsulation.None
})
export class SideComponent implements OnInit {
    open: boolean = false;
    isUpdate: boolean = false;
    allSide: any = [];

    id_side: any;
    code_side: any;
    name_side: any;

    constructor(
        private sideService: SideService,
        private router: Router,
        private encryptProvider: Encrypt,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.showAllSide();
    }
    Open() {
        this.open = true;
        this.id_side = null;
        this.code_side = null;
        this.name_side = null;

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

    addData() {
        this.open = false;

        if (this.code_side && this.name_side) {
            this.sideService.addSide(
                this.id_side,
                this.code_side,
                this.name_side
            )
                .then((results: any) => {
                    if (results.ok) {
                        console.log("เพิ่มข้อมูลสำเร็จ");
                        this.showAllSide();
                        this.id_side = null;
                        this.code_side = null;
                        this.name_side = null;
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

        this.id_side = x.id_side;
        this.code_side = x.code_side;
        this.name_side = x.name_side;

        this.isUpdate = true;
        this.open = true;
    }

    updateData() {
        this.open = false;
        if (this.id_side && this.code_side && this.name_side) {
            this.sideService.updateSide(
                this.id_side,
                this.code_side,
                this.name_side
            )
                .then((results: any) => {
                    if (results.ok) {
                        console.log("แก้ไขข้อมูลเรียบร้อย");
                        this.showAllSide();
                        this.id_side = null;
                        this.code_side = null;
                        this.name_side = null;
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
        this.sideService.remove(x.id_side)
            .then((results: any) => {
                if (results.ok) {
                    this.showAllSide();
                } else {
                    console.log(results.error);
                }
            }).catch(() => {
                console.log("SERVER ERROR");
            })
    }
}
