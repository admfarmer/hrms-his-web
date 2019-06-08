import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LayoutComponent } from "./layout/layout.component";
import { LoginComponent } from './login/login.component';

import { ClarityModule } from "clarity-angular";
import { ROUTING } from "./app.routing";
import { APP_BASE_HREF } from "@angular/common";

describe('AppComponent', () => {

    let fixture: ComponentFixture<any>;
    let compiled: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                LayoutComponent,
                LoginComponent
            ],
            imports: [
                ClarityModule.forRoot(),
                ROUTING
            ],
            providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
        });

        fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        compiled = fixture.nativeElement;


    });

    afterEach(() => {
        fixture.destroy();
    });

    it('should create the app', async(() => {
        expect(compiled).toBeTruthy();
    }));


});
