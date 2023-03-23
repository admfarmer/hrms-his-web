import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {

    constructor(
        private router: Router,
        ) { }

    ngOnInit() {
       if(sessionStorage.getItem('token')){
        this.router.navigate(['/client'], { skipLocationChange: true });
       } 
    }

}
