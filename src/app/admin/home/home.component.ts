import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, OnInit, Component, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { Encrypt } from '../../common-service/encrypt';
import { Router } from "@angular/router";
import { AlertService } from '../../common-service/SweetAlert.service';
import swal from 'sweetalert2';

import { UsernameService } from '../admin-service/username.service';
import { PersonService } from '../admin-service/person.service';
import { DepartService } from '../admin-service/depart.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [
        Encrypt,
        AlertService,
        UsernameService,
        PersonService,
        DepartService
    ],
    encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {
    open: boolean = false;
    edit: boolean = false;
    isUpdate: boolean = false;
    allUsername: any[] = [];
    allpersons: any[] = [];
    alldeparts: any[] = [];

    id_user: any;
    idcard: any;
    username: any;
    password: any;
    device_token: any;
    is_accept: any;
    id_depart: any;
    admin_status: any;
    chief_user: any;
    maniger_user: any;

    constructor(
        private usernameService: UsernameService,
        private personService: PersonService,
        private departService: DepartService,
        private router: Router,
        private encryptProvider: Encrypt,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.showAllUsername();
        this.showDepart();
    }
    Open() {
        this.open = true;
        this.id_user = null;
        this.idcard = null;
        this.username = null;
        this.password = "e10adc3949ba59abbe56e057f20f883e";
        this.device_token = null;
        this.is_accept = null;
        this.id_depart = null;
        this.admin_status = null;
        this.chief_user = null;
        this.maniger_user = null;
        this.showPerson();
    }

    showPerson() {
        this.allpersons = [];
        this.personService.getSelectjoin()
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.allpersons = result.rows;
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
    showDepart() {
        this.alldeparts = [];
        this.departService.DepQuality()
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


    showAllUsername() {
        this.allUsername = [];
        this.usernameService.getUsername()
            .then((result: any) => {
                if (result.token.length > 0) {
                    if (result.ok) {
                        // this.allUsername = result.rows;
                        let token = result.token; // รับค่ามา
                        let decryptedText = this.encryptProvider.decrypt(token);
                        // console.log(decryptedText);
                        let rows = JSON.parse(decryptedText);
                        this.allUsername = rows.rows; // ตอนรับ ก็ต้องมารับค่า rows แบบนี้
                        // console.log(this.allUsername);
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

        if (this.idcard && this.username && this.password && this.is_accept) {
            this.usernameService.addUsername(
                this.id_user,
                this.idcard,
                this.username,
                this.password,
                this.device_token,
                this.is_accept,
                this.id_depart,
                this.admin_status,
                this.chief_user,
                this.maniger_user
            )
                .then((results: any) => {
                    if (results.ok) {
                        console.log("เพิ่มข้อมูลสำเร็จ");
                        this.showAllUsername();
                        this.idcard = null;
                        this.username = null;
                        this.password = null;
                        this.device_token = null;
                        this.is_accept = null;
                        this.id_depart = null;
                        this.admin_status = null;
                        this.chief_user = null;
                        this.maniger_user = null;
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

        this.id_user = x.id_user;
        this.idcard = x.idcard;
        this.username = x.username;
        this.password = x.password;
        this.device_token = x.device_token;
        this.is_accept = x.is_accept;
        this.id_depart = x.id_depart;
        this.admin_status = x.admin_status;
        this.chief_user = x.chief_user;
        this.maniger_user = x.maniger_user;

        this.isUpdate = true;
        this.edit = true;
        // this.open = true;
    }

    updateData() {
        this.edit = false;
        if (this.idcard && this.username && this.password) {
            this.usernameService.updateUsername(
                this.id_user,
                this.idcard,
                this.username,
                this.password,
                this.device_token,
                this.is_accept,
                this.id_depart,
                this.admin_status,
                this.chief_user,
                this.maniger_user
            )
                .then((results: any) => {
                    if (results.ok) {
                        console.log("แก้ไขข้อมูลเรียบร้อย");
                        this.showAllUsername();
                        this.id_user = null;
                        this.idcard = null;
                        this.username = null;
                        this.password = null;
                        this.device_token = null;
                        this.id_depart = null;
                        this.is_accept = null;
                        this.admin_status = null;
                        this.chief_user = null;
                        this.maniger_user = null;

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
        this.usernameService.remove(x.id_user)
            .then((results: any) => {
                if (results.ok) {
                    this.showAllUsername();
                } else {
                    console.log(results.error);
                }
            }).catch(() => {
                console.log("SERVER ERROR");
            })
    }
}
