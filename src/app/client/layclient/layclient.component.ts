import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params, RoutesRecognized } from '@angular/router';
import { Encrypt } from '../../common-service/encrypt';
import { PersonService } from '../../admin/admin-service/person.service';
import { MenuGrpService } from '../client-service/menugrp.service';

@Component({
    selector: 'app-layclient',
    templateUrl: './layclient.component.html',
    styleUrls: ['./layclient.component.scss'],
    providers: [
        Encrypt,
        PersonService,
        MenuGrpService,
    ], encapsulation: ViewEncapsulation.None
})
export class LayclientComponent implements OnInit {
    user: any[] = [];
    username: any[] = [];
    idcard: any;
    chief_user: any;
    maniger_user: any;
    persons: any[] = [];
    title: any;
    first_name: any;
    last_name: any;
    quality: any;

    getSubItem: any = [];
    getSubItemMG: any = [];
    getSubItemDpart: any = [];
    getRout: any = [];
    sub_id: any;


    constructor(
        private router: Router,
        private encryptProvider: Encrypt,
        private menuGrpService: MenuGrpService,
        private personService: PersonService
    ) { }

    ngOnInit() {
        this.Login();
        this.ShowSubMenu();
        this.ShowSubMenuMG();
        this.ShowSubMenuDpart();
    }
    Logout() {
        sessionStorage.removeItem('token');
        // this.router.navigate(['/tsmrisk/home']); // ส่ง Routes ไป client/home
        location.pathname = './login';

    }
    Login() {
        // let status:any;
        if (sessionStorage.getItem('token') != null) {
            let decryptedText = this.encryptProvider.decrypt(sessionStorage.getItem('token'));
            let rows = JSON.parse(decryptedText);
            this.user = rows.rows; // ตอนรับ ก็ต้องมารับค่า rows แบบนี้
            // console.log(this.user);
            this.username = this.user[0].username;
            this.idcard = this.user[0].idcard;
            this.chief_user = this.user[0].chief_user;
            this.maniger_user = this.user[0].maniger_user;
            this.quality = this.user[0].id_depart;

            // console.log(this.idcard);

            this.personService.getSelectcard(this.idcard)
                .then((res: any) => {
                    if (res.ok) {
                        this.persons = res.rows;
                        // console.log(this.persons);
                        this.title = this.persons[0].title;
                        this.first_name = this.persons[0].first_name;
                        this.last_name = this.persons[0].last_name;
                        sessionStorage.setItem('depart', this.persons[0].depart); // เก็บค่า Token ไว้ที่เครื่อง Client ไว้

                        this.router.navigate(['/client']); // ส่ง Routes ไป client/home

                        // console.log(this.title);
                        // console.log(this.first_name);
                        // console.log(this.last_name);
                    } else {
                        console.log(JSON.stringify(res.error));
                    }
                })
                .catch(() => {
                    console.log("Server Error");
                })
        } else {
            this.router.navigate(['./login']); // ส่ง Routes ไป client/home
            // console.log('No Token Success!');
        }

    }

    ShowSubMenu() {
        this.getSubItem = [];
        this.menuGrpService.getSubItem()
            .then((res: any) => {
                if (res.rows.length > 0) {
                    if (res.ok) {
                        this.getSubItem = res.rows;
                        // console.log(this.getSubItem);
                    } else {
                        console.log(JSON.stringify(res.error));
                    }
                } else {
                    console.log("ไม่มีข้อมูล");
                }
            })
            .catch(() => {
                console.log("Server Error")
            })
    }

    ShowSubMenuMG() {
        this.getSubItemMG = [];
        this.menuGrpService.getSubItemMG()
            .then((res: any) => {
                if (res.rows.length > 0) {
                    if (res.ok) {
                        this.getSubItemMG = res.rows;
                        // console.log(this.getSubItemMG);
                    } else {
                        console.log(JSON.stringify(res.error));
                    }
                } else {
                    console.log("ไม่มีข้อมูล");
                }
            })
            .catch(() => {
                console.log("Server Error")
            })
    }
    ShowSubMenuDpart() {
        this.getSubItemDpart = [];
        this.menuGrpService.getSubItemDpart()
            .then((res: any) => {
                if (res.rows.length > 0) {
                    if (res.ok) {
                        this.getSubItemDpart = res.rows;
                        // console.log(this.getSubItemDpart);
                    } else {
                        console.log(JSON.stringify(res.error));
                    }
                } else {
                    console.log("ไม่มีข้อมูล");
                }
            })
            .catch(() => {
                console.log("Server Error")
            })
    }

}
