import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, OnInit, Component, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { Encrypt } from '../../common-service/encrypt';
import { Router } from "@angular/router";
import swal from 'sweetalert2';
import * as moment from 'moment';
// import * as crypto from 'crypto';
// let crypto = require('crypto');

import { AlertService } from '../../common-service/SweetAlert.service';

import { IncidentService } from '../client-service/incident.service';
import { PersonService } from '../../admin/admin-service/person.service';
import { AccountService } from '../../admin/admin-service/account.service';
import { TypeService } from '../../admin/admin-service/type.service';
import { NotypeService } from '../../admin/admin-service/notype.service';
import { SafetyService } from '../../admin/admin-service/safety.service';
import { SideService } from '../../admin/admin-service/side.service';
import { LevelService } from '../../admin/admin-service/level.service';
import { UsernameService } from '../../admin/admin-service/username.service';
import { UserService } from '../../common-service/username.service';


@Component({
    selector: 'app-setup',
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.component.scss'],
    providers: [
        PersonService,
        UsernameService,
        UserService,
        IncidentService,
        AccountService,
        Encrypt,
        AlertService,
        TypeService,
        NotypeService,
        SafetyService,
        SideService,
        LevelService,
        Encrypt
    ], encapsulation: ViewEncapsulation.None
})
export class SetupComponent implements OnInit {

    open: boolean = false;
    editpass: boolean = false;
    isUpdate: boolean = false;
    isPassword: boolean = false;
    allpersons: any[] = [];
    alldeparts: any[] = [];
    allpositions: any[] = [];
    allgenders: any[] = [];
    postUsername: any[] = [];
    Username: any[] = [];

    varidcard: any;
    varuser: any[] = [];
    varusername: any[] = [];
    varquality: any;
    varchief_user: any;
    varmaniger_user: any;

    id_person: any;
    idcard: any;
    title: any;
    first_name: any;
    last_name: any;
    title_en: any;
    fname_en: any;
    lname_en: any;
    sex: any;
    position: any;
    addr: any;
    bdate: any;
    workdate: any;
    depart: any;
    typetext: any;
    lasasom: any;
    telephone: any;
    email: any;
    quality: any;

    id_user: any;
    // idcard: any;
    username: any;
    password: any;
    hashPassword: any;
    passwordone: any;
    passwordtwo: any;
    varpassword: any;
    device_token: any;
    is_accept: any;
    id_depart: any;
    admin_status: any;
    chief_user: any;
    maniger_user: any;


    constructor(
        private router: Router,
        private personService: PersonService,
        private usernameService: UsernameService,
        private encryptProvider: Encrypt,
        private alertService: AlertService,
        private userService: UserService,
    ) { }

    ngOnInit() {
        this.showAllPerson();
        this.showDepart();
        this.showPosition();
        this.showGender();
    }

    editPass(idcard) {
        // console.log(idcard);
        this.idcard = idcard;
        this.postUsername = [];
        this.usernameService.postUsername(this.idcard)
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.postUsername = result.rows;
                        this.id_user = this.postUsername[0].id_user
                        this.username = this.postUsername[0].username
                        this.varpassword = this.postUsername[0].password
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

        this.isPassword = true;
        this.editpass = true;
    }



    Open() {
        this.open = true;
        this.idcard = null;
        this.title = null;
        this.first_name = null;
        this.last_name = null;
        this.title_en = null;
        this.fname_en = null;
        this.lname_en = null;
        this.sex = null;
        this.position = null;
        this.addr = null;
        this.bdate = null;
        this.workdate = null;
        this.depart = null;
        this.typetext = null;
        this.lasasom = null;
        this.telephone = null;
        this.email = null;
        this.quality = null;

    }

    showAllPerson() {
        let decryptedText = this.encryptProvider.decrypt(sessionStorage.getItem('token'));
        let rows = JSON.parse(decryptedText);
        this.varuser = rows.rows; // ตอนรับ ก็ต้องมารับค่า rows แบบนี้
        this.varidcard = this.varuser[0].idcard;
        this.varchief_user = this.varuser[0].chief_user;
        this.varmaniger_user = this.varuser[0].maniger_user;

        this.allpersons = [];
        this.personService.getSelectcard(this.varidcard)
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
        this.personService.Depart()
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

    showPosition() {
        this.allpositions = [];
        this.personService.Position()
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.allpositions = result.rows;
                        // console.log(this.allpositions);
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

    showGender() {
        this.allgenders = [];
        this.personService.Gender()
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.allgenders = result.rows;
                        // console.log(this.allgenders);
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
        if (this.first_name && this.last_name) {
            this.personService.addPerson(
                this.id_person,
                this.idcard,
                this.title,
                this.first_name,
                this.last_name,
                this.title_en,
                this.fname_en,
                this.lname_en,
                this.sex,
                this.position,
                this.addr,
                this.bdate,
                this.workdate,
                this.depart,
                this.typetext,
                this.lasasom,
                this.telephone,
                this.email,
                this.quality)
                .then((results: any) => {
                    if (results.ok) {
                        console.log("เพิ่มข้อมูลสำเร็จ");
                        this.showAllPerson();
                        this.open = false;
                        this.idcard = null;
                        this.title = null;
                        this.first_name = null;
                        this.last_name = null;
                        this.title_en = null;
                        this.fname_en = null;
                        this.lname_en = null;
                        this.sex = null;
                        this.position = null;
                        this.addr = null;
                        this.bdate = null;
                        this.workdate = null;
                        this.depart = null;
                        this.typetext = null;
                        this.lasasom = null;
                        this.telephone = null;
                        this.email = null;
                        this.quality = null;
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
        this.id_person = x.id_person;
        this.idcard = x.idcard;
        this.title = x.title;
        this.first_name = x.first_name;
        this.last_name = x.last_name;
        this.title_en = x.title_en;
        this.fname_en = x.fname_en;
        this.lname_en = x.lname_en;
        this.sex = x.sex;
        this.position = x.position;
        this.addr = x.addr;
        // this.bdate = x.bdate;
        this.bdate = moment(x.bdate).format('YYYY-MM-DD');
        // this.workdate = x.workdate;
        this.workdate = moment(x.workdate).format('YYYY-MM-DD');
        this.depart = x.depart;
        this.typetext = x.typetext;
        this.lasasom = x.lasasom;
        this.telephone = x.telephone;
        this.email = x.email;
        this.quality = x.quality;

        this.isUpdate = true;
        this.open = true;
    }

    updateData() {
        // console.log(this.vardchtype);
        // console.log(this.vardchtypename);
        if (this.id_person && this.idcard && this.title && this.first_name && this.last_name) {
            this.personService.updatePerson(
                this.id_person,
                this.idcard,
                this.title,
                this.first_name,
                this.last_name,
                this.title_en,
                this.fname_en,
                this.lname_en,
                this.sex,
                this.position,
                this.addr,
                this.bdate,
                this.workdate,
                this.depart,
                this.typetext,
                this.lasasom,
                this.telephone,
                this.email,
                this.quality)
                .then((results: any) => {
                    if (results.ok) {
                        console.log("แก้ไขข้อมูลเรียบร้อย");
                        this.showAllPerson();
                        this.open = false;
                        this.idcard = null;
                        this.title = null;
                        this.first_name = null;
                        this.last_name = null;
                        this.title_en = null;
                        this.fname_en = null;
                        this.lname_en = null;
                        this.sex = null;
                        this.position = null;
                        this.addr = null;
                        this.bdate = null;
                        this.workdate = null;
                        this.depart = null;
                        this.typetext = null;
                        this.lasasom = null;
                        this.telephone = null;
                        this.email = null;
                        this.quality = null;
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

    updatePassword() {
        this.editpass = false;

        if (this.idcard && this.username && this.passwordone === this.passwordtwo) {
            this.usernameService.updatePasword(
                this.id_user,
                this.idcard,
                this.username,
                this.password = this.passwordone,
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
                        this.id_user = null;
                        this.idcard = null;
                        this.username = null;
                        this.password = null;
                        this.passwordone = null;
                        this.passwordtwo = null;
                        // this.device_token = null;
                        // this.is_accept = null;
                        // this.id_depart = null;
                        // this.admin_status = null;
                        // this.chief_user = null;
                        // this.maniger_user = null;
                        this.Logout();
                    } else {
                        console.log("แก้ไขข้อมูลไม่สำเร็จ");
                    }
                }).catch(() => {
                    console.log("SERVER ERROR");
                })

        } else {
            console.log("Password ไม่ตรงกัน หรือ ข้อมูลไม่ครบ");
        }
    }

    Logout() {
        localStorage.removeItem('token');
        this.router.navigate(['./login']); // ส่ง Routes ไป client/home

    }

    save() {
        if (this.isUpdate) {
            this.updateData();

        } else if (this.isPassword) {
            // console.log(this.password);
            // console.log(this.username);

            let user: any = {
                username: this.username,
                password: this.password
            };
            let encryptText = this.encryptProvider.encrypt(JSON.stringify(user));
            this.userService.doLogin(encryptText)

            this.userService.doLogin(encryptText)
                .then((result: any) => {
                    if (result.ok) {
                        let token = result.token; // รับค่ามา
                        // this.Username = result.rows; // ตอนรับ ก็ต้องมารับค่า rows แบบนี้
                        // console.log(token);
                        let decryptedText = this.encryptProvider.decrypt(token);
                        let rows = JSON.parse(decryptedText);
                        // console.log(rows.rows[0].password);

                        this.Username = rows.rows; // ตอนรับ ก็ต้องมารับค่า rows แบบนี้
                        // console.log(this.Username[0].password, ':', this.varpassword);

                        // this.Username[0].
                        if (this.varpassword === this.Username[0].password) {

                            this.updatePassword();

                        } else {
                            console.log("Password ไม่ตรงกับรหัสเดิม");

                        }
                    }
                }).catch(error => {
                    // console.log("Password ไม่ตรงกับรหัสเดิม");
                    console.log(error);
                })


        } else {
            this.addData();
        }
    }

    delete(x) {

        console.log(x);
        this.personService.remove(x.id_person)
            .then((results: any) => {
                if (results.ok) {
                    this.showAllPerson();
                } else {
                    console.log(results.error);
                }
            }).catch(() => {
                console.log("SERVER ERROR");
            })
    }

}
