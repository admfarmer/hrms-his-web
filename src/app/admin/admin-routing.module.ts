import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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

const routes: Routes = [
    { path: '', redirectTo: 'admin/home', pathMatch: 'full' }, //กำหมด Path ให้วิง ไปที่ client/Home
    {
        path: 'admin',   // กำหมด Path ในการทำงาน
        component: LayadminComponent, // ดึง layrep.component.html มาแสดง
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'person', component: PersonComponent },
            { path: 'level', component: LevelComponent },
            { path: 'side', component: SideComponent },
            { path: 'safety', component: SafetyComponent },
            { path: 'type', component: TypeComponent },
            { path: 'notype', component: NotypeComponent },
            { path: 'incident', component: IncidentComponent },
            { path: 'depart', component: DepartComponent },
        ]
    }



];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
