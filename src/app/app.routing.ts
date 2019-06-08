import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // กำหมด Path ให้วิง ไปที่ Hirep/Home
    {
        path: '', // กำหมด Path ในการทำงาน
        component: LayoutComponent, // ดึง layrep.component.html มาแสดง
        children: [
            { path: 'login', component: LoginComponent }

        ]
    }
    // อธิบาย เราจะส่งไปกี่ตัว เราก็ใส่ /:variable1/:variable2 แบบนี้ไปเรื่อยๆ  อันนี้ ตอนแนบไปให้ route แนบตัวแปรไปด้วย
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
