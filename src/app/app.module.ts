import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MyDatePickerModule } from 'mydatepicker';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { AppComponent } from './app.component';
import { ROUTING } from "./app.routing";

import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';

import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import { environment } from "environments/environment.prod";
import { AuthModule } from './auth/auth.module';
import { ExcelService } from './common-service/excel.service';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        LayoutComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        AdminModule,
        ClientModule,
        ClarityModule,
        MyDatePickerModule,
        ROUTING,
        AuthModule,
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        { provide: 'API_URL', useValue: environment.apiUrl },
        ExcelService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
