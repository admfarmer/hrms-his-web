import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private router: Router) { 
        // if(sessionStorage.getItem('token')){
        //     this.router.navigate(['/client'], { skipLocationChange: true });
        //    }else{
        //     this.router.navigate(['/login'], { skipLocationChange: true });
        //    }
    }
}
