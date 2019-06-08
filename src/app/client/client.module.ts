import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { HomeComponent } from './home/home.component';
import { LayclientComponent } from './layclient/layclient.component';
import { IncidentComponent } from './incident/incident.component';
import { SetupComponent } from './setup/setup.component';
import { ReportComponent } from './report/report.component';
import { MyDatePickerModule } from 'mydatepicker';
import { ManagerComponent } from './manager/manager.component';
import { ViewComponent } from './view/view.component';
import { QualityComponent } from './quality/quality.component';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        CommonModule,
        ClarityModule,
        MyDatePickerModule,
        ClientRoutingModule
    ],
    declarations: [
        HomeComponent,
        LayclientComponent,
        IncidentComponent,
        SetupComponent,
        ReportComponent,
        ManagerComponent,
        ViewComponent,
        QualityComponent
    ]
})
export class ClientModule { }
