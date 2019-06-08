import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, OnInit, Component, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { Encrypt } from '../../common-service/encrypt';
import { Router } from "@angular/router";
import { AlertService } from '../../common-service/SweetAlert.service';
import swal from 'sweetalert2';

import { NotypeService } from '../admin-service/notype.service';
import { TypeService } from '../admin-service/type.service';

@Component({
    selector: 'app-notype',
    templateUrl: './notype.component.html',
    styleUrls: ['./notype.component.scss'],
    providers: [NotypeService, TypeService, Encrypt, AlertService],
    encapsulation: ViewEncapsulation.None
})
export class NotypeComponent implements OnInit {
    open: boolean = false;
    isUpdate: boolean = false;
    allNotype: any = [];
    allType: any = [];

    id_notype: any;
    id_type: any;
    code_notype: any;
    name_notype: any;
    name_TH: any;


    constructor(
        private notypeService: NotypeService,
        private typeService: TypeService,
        private router: Router,
        private encryptProvider: Encrypt,
        private alertService: AlertService

    ) { }

    ngOnInit() {
        this.showAllNotype();
        this.showAllType();
    }
    Open() {
        this.open = true;
        this.id_notype = null;
        this.id_type = null;
        this.code_notype = null;
        this.name_notype = null;
        this.name_TH = null;

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
                    console.log("ไม่มีข้อมูล");
                }
            })
            .catch(() => {
                console.log("Server Error");
            })

    }


    showAllNotype() {
        this.allNotype = [];
        this.notypeService.getNotype()
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.allNotype = result.rows;
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
        if (this.id_type && this.code_notype && this.name_notype) {
            this.notypeService.addNotype(
                this.id_notype,
                this.id_type,
                this.code_notype,
                this.name_notype,
                this.name_TH
            )
                .then((results: any) => {
                    if (results.ok) {
                        console.log("เพิ่มข้อมูลสำเร็จ");
                        this.open = false;
                        this.id_notype = null;
                        this.id_type = null;
                        this.code_notype = null;
                        this.name_notype = null;
                        this.name_TH = null;
                        this.showAllNotype();
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

        this.id_notype = x.id_notype;
        this.id_type = x.id_type;
        this.code_notype = x.code_notype;
        this.name_notype = x.name_notype;
        this.name_TH = x.name_TH;

        this.isUpdate = true;
        this.open = true;
    }

    updateData() {
        // console.log(this.vardchtype);
        // console.log(this.vardchtypename);
        if (this.id_notype && this.id_type && this.code_notype && this.name_notype) {
            this.notypeService.updateNotype(
                this.id_notype,
                this.id_type,
                this.code_notype,
                this.name_notype,
                this.name_TH
            )
                .then((results: any) => {
                    if (results.ok) {
                        console.log("แก้ไขข้อมูลเรียบร้อย");
                        this.open = false;
                        this.id_notype = null;
                        this.id_type = null;
                        this.code_notype = null;
                        this.name_notype = null;
                        this.name_TH = null;
                        this.showAllNotype();
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
        this.notypeService.remove(x.id_notype)
            .then((results: any) => {
                if (results.ok) {
                    this.showAllNotype();
                } else {
                    console.log(results.error);
                }
            }).catch(() => {
                console.log("SERVER ERROR");
            })
    }

}
