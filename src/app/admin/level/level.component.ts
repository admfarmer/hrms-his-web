import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, OnInit, Component, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { Encrypt } from '../../common-service/encrypt';
import { Router } from "@angular/router";
import { AlertService } from '../../common-service/SweetAlert.service';
import swal from 'sweetalert2';

import { LevelService } from '../admin-service/level.service';

@Component({
    selector: 'app-level',
    templateUrl: './level.component.html',
    styleUrls: ['./level.component.scss'],
    providers: [LevelService, Encrypt, AlertService],
    encapsulation: ViewEncapsulation.None
})

export class LevelComponent implements OnInit {
    open: boolean = false;
    isUpdate: boolean = false;
    alllevel: any = [];

    id_level: any;
    code_level: any;
    name_level: any;
    group_level: any;
    constructor(
        private levelService: LevelService,
        private router: Router,
        private encryptProvider: Encrypt,
        private alertService: AlertService
    ) { }
    ngOnInit() {
        this.showAllLevel();

    }
    Open() {
        this.open = true;
        this.id_level = null;
        this.code_level = null;
        this.name_level = null;
        this.group_level = null;

    }

    showAllLevel() {
        this.alllevel = [];
        this.levelService.getLevel()
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.alllevel = result.rows;
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
        if (this.code_level && this.name_level && this.group_level) {
            this.levelService.addLevel(
                this.id_level,
                this.code_level,
                this.name_level,
                this.group_level
            )
                .then((results: any) => {
                    if (results.ok) {
                        console.log("เพิ่มข้อมูลสำเร็จ");
                        this.showAllLevel();
                        this.open = false;
                        this.id_level = null;
                        this.code_level = null;
                        this.name_level = null;
                        this.group_level = null;
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

        this.id_level = x.id_level;
        this.code_level = x.code_level;
        this.name_level = x.name_level;
        this.group_level = x.group_level;

        this.isUpdate = true;
        this.open = true;
    }

    updateData() {
        // console.log(this.vardchtype);
        // console.log(this.vardchtypename);
        if (this.id_level && this.code_level && this.name_level && this.group_level) {
            this.levelService.updateLevel(
                this.id_level,
                this.code_level,
                this.name_level,
                this.group_level
            )
                .then((results: any) => {
                    if (results.ok) {
                        console.log("แก้ไขข้อมูลเรียบร้อย");
                        this.showAllLevel();
                        this.open = false;
                        this.id_level = null;
                        this.code_level = null;
                        this.name_level = null;
                        this.group_level = null;
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
        this.levelService.remove(x.id_level)
            .then((results: any) => {
                if (results.ok) {
                    this.showAllLevel();
                } else {
                    console.log(results.error);
                }
            }).catch(() => {
                console.log("SERVER ERROR");
            })
    }

}
