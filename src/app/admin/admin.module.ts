import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { LayadminComponent } from './layadmin/layadmin.component';
import { LevelComponent } from './level/level.component';
import { PersonComponent } from './person/person.component';
import { SideComponent } from './side/side.component';
import { SafetyComponent } from './safety/safety.component';
import { TypeComponent } from './type/type.component';
import { NotypeComponent } from './notype/notype.component';
import { IncidentComponent } from './incident/incident.component';
import { DepartComponent } from './depart/depart.component';


@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        CommonModule,
        ClarityModule,
        AdminRoutingModule
    ],
    declarations: [
        HomeComponent,
        LayadminComponent,
        LevelComponent,
        PersonComponent,
        SideComponent,
        SafetyComponent,
        TypeComponent,
        NotypeComponent,
        IncidentComponent,
        DepartComponent
    ]   

})
export class AdminModule { }
