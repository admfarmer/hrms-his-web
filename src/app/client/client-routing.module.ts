import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayclientComponent } from './layclient/layclient.component';
import { IncidentComponent } from './incident/incident.component';
import { SetupComponent } from './setup/setup.component';
import { ReportComponent } from './report/report.component';
import { ManagerComponent } from './manager/manager.component';
import { ViewComponent } from './view/view.component';
import { QualityComponent } from './quality/quality.component';

const routes: Routes = [
    { path: '', redirectTo: 'client/home', pathMatch: 'full' }, //กำหมด Path ให้วิง ไปที่ client/Home
    {
        path: 'client',   // กำหมด Path ในการทำงาน
        component: LayclientComponent, // ดึง layrep.component.html มาแสดง
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'incident', component: IncidentComponent },
            { path: 'setup', component: SetupComponent },
            { path: 'quality', component: QualityComponent },
            { path: 'manager', component: ManagerComponent },
            { path: 'report/:query_id', component: ReportComponent },
            { path: 'view/:query_id', component: ViewComponent },
        ]
    }


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule { }
