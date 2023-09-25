import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Encrypt } from '../../common-service/encrypt';
import { Router } from '@angular/router';
import { PersonService } from '../../admin/admin-service/person.service';

@Component({
    selector: 'app-layadmin',
    templateUrl: './layadmin.component.html',
    styleUrls: ['./layadmin.component.scss'],
    providers: [
        Encrypt,
        PersonService,
    ],
    encapsulation: ViewEncapsulation.None
})
export class LayadminComponent implements OnInit {

    user: any[] = [];
    status: any[] = [];
    username: any[] = [];
    idcard: any;
    chief_user: any;
    maniger_user: any;
    persons: any[] = [];
    title: any;
    first_name: any;
    last_name: any;

    constructor(
        private router: Router,
        private encryptProvider: Encrypt,
        private personService: PersonService

    ) { }

    ngOnInit() {
        this.Login();
    }
    Logout() {

        sessionStorage.removeItem('token');
        this.router.navigate(['./login']); // ส่ง Routes ไป client/home
    }
    Login() {
        if (sessionStorage.getItem('token') != null) {
            // console.log('Token Success!');
            let decryptedText = this.encryptProvider.decrypt(sessionStorage.getItem('token'));
            // console.log(decryptedText);
            let rows = JSON.parse(decryptedText);
            this.user = rows.rows; // ตอนรับ ก็ต้องมารับค่า rows แบบนี้
            this.username = this.user[0].username;
            this.idcard = this.user[0].idcard;
            this.chief_user = this.user[0].chief_user;
            this.maniger_user = this.user[0].maniger_user;
            // console.log(this.username);

            this.personService.getSelectcard(this.idcard)
                .then((res: any) => {
                    if (res.ok) {
                        this.persons = res.rows;
                        // console.log(this.persons);
                        this.title = this.persons[0].title;
                        this.first_name = this.persons[0].first_name;
                        this.last_name = this.persons[0].last_name;
                        if(this.maniger_user == 'A'){
                            this.router.navigate(['/admin']); // ส่ง Routes ไป client/home
                        }else{
                            this.router.navigate(['/client']);
                        }

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
}
