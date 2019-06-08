import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, OnInit, Component, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { Encrypt } from '../../common-service/encrypt';
import { Router } from "@angular/router";
import { AlertService } from '../../common-service/SweetAlert.service';
import swal from 'sweetalert2';

import { AccountService } from '../admin-service/account.service';
import { TypeService } from '../admin-service/type.service';
import { NotypeService } from '../admin-service/notype.service';
import { SafetyService } from '../admin-service/safety.service';
import { SideService } from '../admin-service/side.service';

@Component({
    selector: 'app-incident',
    templateUrl: './incident.component.html',
    styleUrls: ['./incident.component.scss'],
    providers: [
        AccountService,
        Encrypt,
        AlertService,
        TypeService,
        NotypeService,
        SafetyService,
        SideService
    ],
    encapsulation: ViewEncapsulation.None
})
export class IncidentComponent implements OnInit {
    open: boolean = false;
    isUpdate: boolean = false;
    allAccount: any = [];
    allType: any = [];
    allNotype: any = [];
    allSafety: any = [];
    allSide: any = [];

    id_account: any;
    code_account: any;
    id_side: any;
    id_safety: any;
    id_type: any;
    id_notype: any;
    name_account: any;
    simple: any;
    status_acc: any;

    constructor(
        private accountService: AccountService,
        private typeService: TypeService,
        private notypeService: NotypeService,
        private safetyService: SafetyService,
        private sideService: SideService,
        private router: Router,
        private encryptProvider: Encrypt,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.showAllAccount();
        this.showAllSide();
        this.showSafety();
        this.showType();
        this.showNotype();
    }

    Open() {
        this.open = true;
        this.id_account = null;
        this.code_account = null;
        this.id_side = null;
        this.id_safety = null;
        this.id_type = null;
        this.id_notype = null;
        this.name_account = null;
        this.simple = null;
    }

    showAllSide() {
        this.allSide = [];
        this.sideService.getSide()
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.allSide = result.rows;
                        this.showAllSafety(this.allSide.id_side);
                        // console.log(this.allSide);
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

    showAllSafety(id_side) {
        // console.log(id_side);
        this.allSafety = [];
        this.safetyService.getSide(id_side)
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.allSafety = result.rows;
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
    showSafety() {
        // console.log(id_side);
        this.allSafety = [];
        this.safetyService.getSafety()
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.allSafety = result.rows;
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

    showAllType(id_safety) {
        this.allType = [];
        this.typeService.getSafety(id_safety)
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.allType = result.rows;
                        // console.log(this.allType);
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
    showType() {
        this.allType = [];
        this.typeService.getType()
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.allType = result.rows;
                        // console.log(this.allType);
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

    showAllNotype(id_type) {
        this.allNotype = [];
        this.notypeService.getType(id_type)
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.allNotype = result.rows;
                        // console.log(this.allNotype);
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
    showNotype() {
        this.allNotype = [];
        this.notypeService.getNotype()
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.allNotype = result.rows;
                        // console.log(this.allNotype);
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

    showAllAccount() {
        this.allAccount = [];
        this.accountService.getAccount()
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.allAccount = result.rows;
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

        if (this.code_account && this.id_side && this.id_safety && this.id_type && this.id_notype && this.name_account && this.simple) {
            this.accountService.addAccount(
                this.id_account,
                this.code_account,
                this.id_side,
                this.id_safety,
                this.id_type,
                this.id_notype,
                this.name_account,
                this.simple,
                this.status_acc
            )
                .then((results: any) => {
                    if (results.ok) {
                        console.log("เพิ่มข้อมูลสำเร็จ");
                        this.showAllAccount();
                        this.id_account = null;
                        this.code_account = null;
                        this.id_side = null;
                        this.id_safety = null;
                        this.id_type = null;
                        this.id_notype = null;
                        this.name_account = null;
                        this.simple = null;
                        this.status_acc = null;
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

        this.id_account = x.id_account;
        this.code_account = x.code_account;
        this.id_side = x.id_side;
        this.id_safety = x.id_safety;
        this.id_type = x.id_type;
        this.id_notype = x.id_notype;
        this.name_account = x.name_account;
        this.simple = x.simple;
        this.status_acc = x.status_acc;

        this.isUpdate = true;
        this.open = true;
    }

    updateData() {
        this.open = false;
        if (this.code_account && this.id_side && this.id_safety && this.id_type && this.id_notype && this.name_account && this.simple) {
            this.accountService.updateAccount(
                this.id_account,
                this.code_account,
                this.id_side,
                this.id_safety,
                this.id_type,
                this.id_notype,
                this.name_account,
                this.simple,
                this.status_acc
            )
                .then((results: any) => {
                    if (results.ok) {
                        console.log("แก้ไขข้อมูลเรียบร้อย");
                        this.showAllAccount();
                        this.id_account = null;
                        this.code_account = null;
                        this.id_side = null;
                        this.id_safety = null;
                        this.id_type = null;
                        this.id_notype = null;
                        this.name_account = null;
                        this.simple = null;
                        this.status_acc = null;
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
        this.accountService.remove(x.id_account)
            .then((results: any) => {
                if (results.ok) {
                    this.showAllAccount();
                } else {
                    console.log(results.error);
                }
            }).catch(() => {
                console.log("SERVER ERROR");
            })
    }
}
