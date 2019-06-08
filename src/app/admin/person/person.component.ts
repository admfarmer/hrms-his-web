import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, OnInit, Component, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { Encrypt } from '../../common-service/encrypt';
import { Router } from "@angular/router";
import { PersonService } from '../admin-service/person.service';
import { AlertService } from '../../common-service/SweetAlert.service';
import swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
    selector: 'app-person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.scss'],
    providers: [PersonService, Encrypt, AlertService],
    styles: ['.error {color:red;}'],

    encapsulation: ViewEncapsulation.None
})

export class PersonComponent implements OnInit {

    open: boolean = false;
    isUpdate: boolean = false;
    allpersons: any[] = [];
    alldeparts: any[] = [];
    allpositions: any[] = [];
    allgenders: any[] = [];

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

    constructor(
        private router: Router,
        private personService: PersonService,
        private encryptProvider: Encrypt,
        private alertService: AlertService

    ) { }

    ngOnInit() {
        this.showAllPerson();
        this.showDepart();
        this.showPosition();
        this.showGender();
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
        this.allpersons = [];
        this.personService.getPerson()
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

    save() {
        if (this.isUpdate) {
            this.updateData();

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
