import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Encrypt } from '../common-service/encrypt';
import { Router } from "@angular/router";
import { UserService } from '../common-service/username.service';
import { AlertService } from '../common-service/SweetAlert.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [UserService, Encrypt, AlertService],
    styles: ['.error {color:red;}'],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
    //  member: any[] = [];
    errorMessage: string;
    status: any[] = [];
    users: any[] = [];
    date: Date = new Date();
    mode = 'Promise';
    username: any;
    password: any;
    adm_status: any = 0;

    constructor(
        private router: Router,
        private userService: UserService,
        private encryptProvider: Encrypt,
        private alertService: AlertService
    ) { }

    ngOnInit() {
    }
    Login() {
        this.users = [];
        this.userService.Login(this.username, this.password)
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.users = result.rows; // ตอนรับ ก็ต้องมารับค่า rows แบบนี้
                        // console.log(this.users);
                        this.router.navigate(['client']); // ส่ง Routes ไป client/home
                    }
                } else {
                    console.log("No Login");
                    this.router.navigate(['/tsmrisk/login'], { skipLocationChange: true });
                }
            }).catch(error => {
                console.log(error);
            })
    }

    doLogin() {
        let user: any = {
            username: this.username,
            password: this.password
        };
        let encryptText = this.encryptProvider.encrypt(JSON.stringify(user));
        this.userService.doLogin(encryptText)
            .then((res: any) => {
                if (res.ok) {
                    let token = res.token; // รับค่ามา
                    sessionStorage.setItem('token', token); // เก็บค่า Token ไว้ที่เครื่อง Client ไว้
                    this.userService.saveDeviceToken(token, this.username) // ส่งค่าไป บันทึกลง ฐานข้อมูล
                        .then((result: any) => {
                            // console.log('Register device token success!');
                        }, (error) => {
                            console.log(error);
                        }); //  ส่งค่าไป บันทึกลง ฐานข้อมูล เอาออกก่อน เดี่ยวค่อยว่ากันทีหลัง มันจะยาว

                    // console.log('Token Success!');
                    let decryptedText = this.encryptProvider.decrypt(sessionStorage.getItem('token'));
                    if (decryptedText !== '') {
                        // console.log(decryptedText);
                        let rows = JSON.parse(decryptedText);
                        this.status = rows.rows; // ตอนรับ ก็ต้องมารับค่า rows แบบนี้
                        if (this.status.length === 0) {
                            this.router.navigate(['tsmrisk']); // ส่ง Routes ไป client/home
                        } else {
                            // console.log(this.status);
                            if (this.status[0].admin_status === "1" && this.adm_status === "1") {
                                this.goAdmin();
                            } else {
                                this.goClient();
                            }
                        }

                    } else {
                        this.alertService.error("ชื่อผู้ใช้งาน หรือ รหัสผ่านไม่ถูกต้อง");

                    }
                } else {
                    alert(JSON.stringify(res.error));
                }
            }, (error) => {
                this.username = null;
                this.password = null;
                alert(error);
            });
    }
    goAdmin() {
        console.log("0");
        this.router.navigate(['/admin'], { skipLocationChange: true }); // ส่ง Routes ไป admin/home
        // location.pathname = '/admin';
    }
    goClient() {
        console.log("1");
        this.router.navigate(['/client'], { skipLocationChange: true });
        // location.pathname = '/client';
    }
}
