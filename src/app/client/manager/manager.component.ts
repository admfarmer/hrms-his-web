import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, OnInit, Component, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { Encrypt } from '../../common-service/encrypt';
import { Router } from "@angular/router";
import { AlertService } from '../../common-service/SweetAlert.service';
import swal from 'sweetalert2';
import * as moment from 'moment';

import { IncidentService } from '../client-service/incident.service';
import { PersonService } from '../../admin/admin-service/person.service';
import { AccountService } from '../../admin/admin-service/account.service';
import { TypeService } from '../../admin/admin-service/type.service';
import { NotypeService } from '../../admin/admin-service/notype.service';
import { SafetyService } from '../../admin/admin-service/safety.service';
import { SideService } from '../../admin/admin-service/side.service';
import { LevelService } from '../../admin/admin-service/level.service';
import { LoopupGroupService } from '../client-service/loopupgroup.service';

@Component({
    selector: 'app-manager',
    templateUrl: './manager.component.html',
    styleUrls: ['./manager.component.scss'],
    providers: [
        PersonService,
        IncidentService,
        AccountService,
        Encrypt,
        AlertService,
        TypeService,
        NotypeService,
        SafetyService,
        SideService,
        LevelService,
        LoopupGroupService
    ], encapsulation: ViewEncapsulation.None
})

export class ManagerComponent implements OnInit {

    open: boolean = false;
    edit: boolean = false;
    isUpdate: boolean = false;
    isSex = false;
    isAge = false;
    ages: any = {};

    allincident: any[] = [];
    alldeparts: any[] = [];
    allAccount: any = [];
    allType: any = [];
    allNotype: any = [];
    allSafety: any = [];
    allSide: any = [];
    alllevel: any = [];
    allpersons: any[] = [];
    alllocation: any[] = [];
    allsex: any[] = [];
    alltime: any[] = [];
    allaffected: any[] = [];

    user: any[] = [];
    idcard: any;
    admin_status: any;
    chief_user: any;
    maniger_user: any;

    openState: boolean = false;
    selectAcc: any[] = [];
    select_acc_name: any;

    id_incident: any;
    hn_incident: any;
    idcard_incident: any;
    dep_rep_id: any;
    dep_res_id: any;
    id_side: any;
    id_safety: any;
    id_type: any;
    id_notype: any;
    code_account: any;
    affected_id: any;
    sex_incident: any;
    age_incident: any;
    location_incident: any;
    date_incident: any;
    date_account: any;
    time_incident: any;
    agents_involved: any;
    code_level: any;
    other_involved: any;
    noteceo: any;
    date_rep: any;
    date_res: any;
    resulting_actions: any;
    conf_output: any;
    conf_chief: any;
    conf_nrls: any;
    near_miss_status: any;

    constructor(
        private router: Router,
        private accountService: AccountService,
        private typeService: TypeService,
        private notypeService: NotypeService,
        private safetyService: SafetyService,
        private sideService: SideService,
        private levelService: LevelService,
        private loopupGroupService: LoopupGroupService,
        private personService: PersonService,
        private incidentService: IncidentService,
        private encryptProvider: Encrypt,
        private alertService: AlertService

    ) {
        this.ages = [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
            31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42,
            43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76,
            77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92,
            93, 94, 95, 96, 97, 98, 99, 100
        ];

    }

    ngOnInit() {
        this.showAllPerson();
        this.showAllIncident();
        this.showDepart();
        // this.showLevel();
        // this.showSafety();
        // this.showType();
        // this.showNotype();
        // this.showAccount();
        this.showLocation();
        this.showSex();
        this.showTime();
        this.showAllSide();
        this.showAffected();
    }

    Affected(affected_id) {
        this.affected_id = affected_id;
        console.log(this.affected_id);
        if (this.affected_id == '1') {
            this.isSex = true;
            this.isAge = true;
        } else {
            this.isSex = false;
            this.isAge = false;
            this.sex_incident = null;
            this.age_incident = null;
        }
    }

    Open() {
        this.open = true;
        this.id_incident = null;
        this.hn_incident = null;
        this.idcard_incident = null;
        this.dep_rep_id = null;
        this.dep_res_id = null;
        this.id_side = null;
        this.id_safety = null;
        this.id_type = null;
        this.id_notype = null;
        this.code_account = null;
        this.affected_id = null;
        this.sex_incident = null;
        this.age_incident = null;
        this.location_incident = null;
        this.date_incident = null;
        // this.date_account = null;
        this.date_account = moment(Date()).format('YYYY-MM-DD');
        this.time_incident = null;
        this.agents_involved = null;
        this.code_level = null;
        this.other_involved = null;
        this.noteceo = null;
        this.date_rep = null;
        this.date_res = null;
        this.resulting_actions = null;
        this.conf_output = null;
        this.conf_chief = null;
        this.conf_nrls = null;
        this.near_miss_status = null;
    }

    showAllPerson() {
        this.allpersons = [];
        this.personService.getSelect()
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.allpersons = result.rows;
                        // console.log(this.allpersons);
                    } else {
                        console.log(JSON.stringify(result.error));
                    }
                } else {
                    console.log("ไม่มีข้อมูล");
                }
            })
            .catch(() => {
                console.log("Server Error");
            })

    }

    showLocation() {
        this.alllocation = [];
        this.loopupGroupService.getLocation()
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.alllocation = result.rows;
                        // console.log(this.alllocation);
                    } else {
                        console.log(JSON.stringify(result.error));
                    }
                } else {
                    console.log("ไม่มีข้อมูล");
                }
            })
            .catch(() => {
                console.log("Server Error");
            })
    }

    showSex() {
        this.allsex = [];
        this.loopupGroupService.getSex()
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.allsex = result.rows;
                        // console.log(this.allsex);
                    } else {
                        console.log(JSON.stringify(result.error));
                    }
                } else {
                    console.log("ไม่มีข้อมูล");
                }
            })
            .catch(() => {
                console.log("Server Error");
            })
    }

    showTime() {
        this.alltime = [];
        this.loopupGroupService.getTime()
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.alltime = result.rows;
                        // console.log(this.alltime);
                    } else {
                        console.log(JSON.stringify(result.error));
                    }
                } else {
                    console.log("ไม่มีข้อมูล");
                }
            })
            .catch(() => {
                console.log("Server Error");
            })
    }

    showAffected() {
        this.allaffected = [];
        this.loopupGroupService.getAffected()
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.allaffected = result.rows;
                        // console.log(this.allaffected);
                    } else {
                        console.log(JSON.stringify(result.error));
                    }
                } else {
                    console.log("ไม่มีข้อมูล");
                }
            })
            .catch(() => {
                console.log("Server Error");
            })
    }

    showAllLevel(id_side) {
        this.alllevel = [];
        this.levelService.getSelect(id_side)
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.alllevel = result.rows;
                    } else {
                        console.log(JSON.stringify(result.error));
                    }
                } else {
                    console.log("ไม่มีข้อมูล");
                }
            })
            .catch(() => {
                console.log("Server Error");
            })

    }

    showLevel() {
        this.alllevel = [];
        this.levelService.getLevel()
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.alllevel = result.rows;
                    } else {
                        console.log(JSON.stringify(result.error));
                    }
                } else {
                    console.log("ไม่มีข้อมูล");
                }
            })
            .catch(() => {
                console.log("Server Error");
            })

    }

    showAllSide() {
        this.allSide = [];
        this.sideService.getSide()
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.allSide = result.rows;
                        // console.log(this.allSide);
                    } else {
                        console.log(JSON.stringify(result.error));
                    }
                } else {
                    console.log("ไม่มีข้อมูล");
                }
            })
            .catch(() => {
                console.log("Server Error");
            })
    }

    showAllSafety(id_side) {
        // console.log(id_side);
        this.allSafety = [];
        this.safetyService.getSide(id_side)
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.allSafety = result.rows;
                        // console.log(this.allSafety);
                    } else {
                        console.log(JSON.stringify(result.error));
                    }
                } else {
                    console.log("ไม่มีข้อมูล");
                }
            })
            .catch(() => {
                console.log("Server Error");
            })
    }
    showSafety() {
        // console.log(id_side);
        this.allSafety = [];
        this.safetyService.getSafety()
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.allSafety = result.rows;
                        // console.log(this.allSafety);
                    } else {
                        console.log(JSON.stringify(result.error));
                    }
                } else {
                    console.log("ไม่มีข้อมูล");
                }
            })
            .catch(() => {
                console.log("Server Error");
            })
    }

    showAllType(id_safety) {
        this.allType = [];
        this.typeService.getSafety(id_safety)
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.allType = result.rows;
                        // console.log(this.allType);
                    } else {
                        console.log(JSON.stringify(result.error));
                    }
                } else {
                    console.log("ไม่มีข้อมูล");
                }
            })
            .catch(() => {
                console.log("Server Error");
            })
    }
    showType() {
        this.allType = [];
        this.typeService.getType()
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.allType = result.rows;
                        // console.log(this.allType);
                    } else {
                        console.log(JSON.stringify(result.error));
                    }
                } else {
                    console.log("ไม่มีข้อมูล");
                }
            })
            .catch(() => {
                console.log("Server Error");
            })
    }

    showAllNotype(id_type) {
        this.allNotype = [];
        this.notypeService.getType(id_type)
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.allNotype = result.rows;
                        // console.log(this.allNotype);
                    } else {
                        console.log(JSON.stringify(result.error));
                    }
                } else {
                    console.log("ไม่มีข้อมูล");
                }
            })
            .catch(() => {
                console.log("Server Error");
            })
    }
    showNotype() {
        this.allNotype = [];
        this.notypeService.getNotype()
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.allNotype = result.rows;
                        // console.log(this.allNotype);
                    } else {
                        console.log(JSON.stringify(result.error));
                    }
                } else {
                    console.log("ไม่มีข้อมูล");
                }
            })
            .catch(() => {
                console.log("Server Error");
            })
    }

    showAllAccount(id_side, id_safety, id_type, id_notype) {
        this.allAccount = [];
        this.accountService.getSelect(id_side, id_safety, id_type, id_notype)
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.allAccount = result.rows;
                        // console.log(this.allpersons);
                    } else {
                        console.log(JSON.stringify(result.error));
                    }
                } else {
                    console.log("ไม่มีข้อมูล");
                }
            })
            .catch(() => {
                console.log("Server Error");
            })
    }

    showAccount() {
        this.allAccount = [];
        this.accountService.getAccount()
            .then((result: any) => {
                if (result.rows.length > 0) {
                    if (result.ok) {
                        this.allAccount = result.rows;
                        // console.log(this.allpersons);
                    } else {
                        console.log(JSON.stringify(result.error));
                    }
                } else {
                    console.log("ไม่มีข้อมูล");
                }
            })
            .catch(() => {
                console.log("Server Error");
            })
    }

    showSelectacc(code_account) {
        this.selectAcc = [];
        this.accountService.getSelectacc(code_account)
            .then((res: any) => {
                if (res.rows.length > 0) {
                    if (res.ok) {
                        this.selectAcc = res.rows;
                        this.select_acc_name = this.selectAcc[0].name_account;
                        // console.log(this.selectAcc);
                        // this.openState = false;
                    } else {
                        console.log(JSON.stringify(res.error));
                    }
                } else {
                    console.log("ไม่มีข้อมูล");
                }
            })
            .catch(() => {
                console.log("Server Error");
            })
    }



    showAllIncident() {
        this.allincident = [];

        let decryptedText = this.encryptProvider.decrypt(sessionStorage.getItem('token'));
        let rows = JSON.parse(decryptedText);
        this.user = rows.rows; // ตอนรับ ก็ต้องมารับค่า rows แบบนี้
        this.idcard = this.user[0].idcard;
        this.admin_status = this.user[0].admin_status;
        this.chief_user = this.user[0].chief_user;
        this.maniger_user = this.user[0].maniger_user;


        this.incidentService.getIncident()
            .then((resultO: any) => {
                if (resultO.rows.length > 0) {
                    if (resultO.ok) {
                        this.allincident = resultO.rows;
                    } else {
                        console.log(JSON.stringify(resultO.error));
                    }
                } else {
                    console.log("ไม่มีข้อมูล");
                }
            })
            .catch(() => {
                console.log("Server Error");
            })

    }
    showIncident() {
        this.allincident = [];

        let decryptedText = this.encryptProvider.decrypt(sessionStorage.getItem('token'));
        let rows = JSON.parse(decryptedText);
        this.user = rows.rows; // ตอนรับ ก็ต้องมารับค่า rows แบบนี้
        this.idcard = this.user[0].idcard;
        this.admin_status = this.user[0].admin_status;
        this.chief_user = this.user[0].chief_user;
        this.maniger_user = this.user[0].maniger_user;


        this.incidentService.getShowIncident()
            .then((resultO: any) => {
                if (resultO.rows.length > 0) {
                    if (resultO.ok) {
                        this.allincident = resultO.rows;
                    } else {
                        console.log(JSON.stringify(resultO.error));
                    }
                } else {
                    console.log("ไม่มีข้อมูล");
                }
            })
            .catch(() => {
                console.log("Server Error");
            })

    }
    showIncidentRisk() {
        this.allincident = [];

        let decryptedText = this.encryptProvider.decrypt(sessionStorage.getItem('token'));
        let rows = JSON.parse(decryptedText);
        this.user = rows.rows; // ตอนรับ ก็ต้องมารับค่า rows แบบนี้
        this.idcard = this.user[0].idcard;
        this.admin_status = this.user[0].admin_status;
        this.chief_user = this.user[0].chief_user;
        this.maniger_user = this.user[0].maniger_user;


        this.incidentService.getIncidentRisk()
            .then((resultO: any) => {
                if (resultO.rows.length > 0) {
                    if (resultO.ok) {
                        this.allincident = resultO.rows;
                    } else {
                        console.log(JSON.stringify(resultO.error));
                    }
                } else {
                    console.log("ไม่มีข้อมูล");
                }
            })
            .catch(() => {
                console.log("Server Error");
            })

    }

    showDepart() {
        this.alldeparts = [];
        this.personService.Depart()
            .then((result: any) => {
                if (result.ok) {
                    this.alldeparts = result.rows;
                    // console.log(this.alldeparts);
                } else {
                    console.log(JSON.stringify(result.error));
                }
            })
            .catch(() => {
                console.log("Server Error");
            })

    }

    addData() {
        this.open = false;
        if (this.idcard_incident
            && this.dep_rep_id
            && this.dep_res_id
            && this.id_side
            && this.id_safety
            && this.id_notype
            && this.code_account
            && this.agents_involved
            && this.location_incident
            && this.date_incident
            && this.date_account
            && this.time_incident
            && this.code_level
        ) {
            this.incidentService.addIncident(
                this.id_incident,
                this.hn_incident,
                this.idcard_incident,
                this.dep_rep_id,
                this.dep_res_id,
                this.id_side,
                this.id_safety,
                this.id_type,
                this.id_notype,
                this.code_account,
                this.affected_id,
                this.sex_incident,
                this.age_incident,
                this.location_incident,
                this.date_incident,
                this.date_account,
                this.time_incident,
                this.agents_involved,
                this.code_level,
                this.other_involved,
                this.noteceo,
                this.date_rep,
                this.date_res,
                this.resulting_actions,
                this.conf_output,
                this.conf_chief,
                this.conf_nrls,
                this.near_miss_status
            )
                .then((results: any) => {
                    if (results.ok) {
                        console.log("เพิ่มข้อมูลสำเร็จ");
                        this.showAllIncident();
                        this.id_incident = null;
                        this.hn_incident = null;
                        this.idcard_incident = null;
                        this.dep_rep_id = null;
                        this.dep_res_id = null;
                        this.id_side = null;
                        this.id_safety = null;
                        this.id_type = null;
                        this.id_notype = null;
                        this.code_account = null;
                        this.affected_id = null;
                        this.sex_incident = null;
                        this.age_incident = null;
                        this.location_incident = null;
                        this.date_incident = null;
                        this.date_account = null;
                        this.time_incident = null;
                        this.agents_involved = null;
                        this.code_level = null;
                        this.other_involved = null;
                        this.noteceo = null;
                        this.date_rep = null;
                        this.date_res = null;
                        this.resulting_actions = null;
                        this.conf_output = null;
                        this.conf_chief = null;
                        this.conf_nrls = null;
                        this.near_miss_status = null;
                    } else {
                        console.log("เพิ่มข้อมูลไม่สำเร็จ");
                    }
                }).catch(() => {
                    console.log("SERVER ERROR");
                })

        } else {
            swal("การกรอกข้อมูลไม่ครบ! ตรวจสอบ ข้อที่มีเครื่องหมาย * ");
            console.log("ข้อมูลไม่ครบ");
            this.open = true;
        }
    }

    editData(x) {
        console.log(x);
        this.id_incident = x.id_incident;
        this.hn_incident = x.hn_incident;
        this.idcard_incident = x.idcard_incident;
        this.dep_rep_id = x.dep_rep_id;
        this.dep_res_id = x.dep_res_id;
        this.id_side = x.id_side;
        this.id_safety = x.id_safety;
        this.id_type = x.id_type;
        this.id_notype = x.id_notype;
        this.code_account = x.code_account;
        this.affected_id = x.affected_id;
        this.sex_incident = x.sex_incident;
        this.age_incident = x.age_incident;
        this.location_incident = x.location_incident;
        // this.date_incident = x.date_incident;
        // this.date_account = x.date_account;
        if (x.date_incident === null) {
            this.date_incident = x.date_incident;
        } else {
            this.date_incident = moment(x.date_incident).format('YYYY-MM-DD');
            // console.log(this.date_incident);

        }

        if (x.date_account === null) {
            this.date_account = x.date_account;
        } else {
            this.date_account = moment(x.date_account).format('YYYY-MM-DD');
            // console.log(this.date_account);

        }

        this.time_incident = x.time_incident;
        this.agents_involved = x.agents_involved;
        this.code_level = x.code_level;
        this.other_involved = x.other_involved;
        this.noteceo = x.noteceo;
        // this.date_rep = x.date_rep;
        // this.date_res = x.date_res;
        if (x.date_rep === null) {
            this.date_rep = x.date_rep;
        } else {
            this.date_rep = moment(x.date_rep).format('YYYY-MM-DD');
            // console.log(this.date_rep);
        }

        if (x.date_res === null) {
            this.date_res = moment(Date()).format('YYYY-MM-DD');
        } else {
            this.date_res = moment(x.date_res).format('YYYY-MM-DD');
            // console.log(this.date_res);
        }

        this.resulting_actions = x.resulting_actions;
        this.conf_output = x.conf_output;
        this.conf_chief = x.conf_chief;
        this.conf_nrls = x.conf_nrls;
        this.near_miss_status = x.near_miss_status;

        this.showAllLevel(this.id_side);
        this.showAllSafety(this.id_side);
        this.showAllType(this.id_safety);
        this.showAllNotype(this.id_type);
        this.showAllAccount(this.id_side, this.id_safety, this.id_type, this.id_notype);
        this.Affected(this.affected_id);

        this.isUpdate = true;
        this.open = true;
    }

    editChief(x) {
        console.log(x);
        this.id_incident = x.id_incident;
        this.hn_incident = x.hn_incident;
        this.idcard_incident = x.idcard_incident;
        this.dep_rep_id = x.dep_rep_id;
        this.dep_res_id = x.dep_res_id;
        this.id_side = x.id_side;
        this.id_safety = x.id_safety;
        this.id_type = x.id_type;
        this.id_notype = x.id_notype;
        this.code_account = x.code_account;
        this.affected_id = x.affected_id;
        this.sex_incident = x.sex__incident;
        this.age_incident = x.age_incident;
        this.location_incident = x.location_incident;
        // this.date_incident = x.date_incident;
        // this.date_account = x.date_account;
        if (x.date_incident === null) {
            this.date_incident = x.date_incident;
        } else {
            this.date_incident = moment(x.date_incident).format('YYYY-MM-DD');
            // console.log(this.date_incident);

        }

        if (x.date_account === null) {
            this.date_account = x.date_account;
        } else {
            this.date_account = moment(x.date_account).format('YYYY-MM-DD');
            // console.log(this.date_account);

        }

        this.time_incident = x.time_incident;
        this.agents_involved = x.agents_involved;
        this.code_level = x.code_level;
        this.other_involved = x.other_involved;
        this.noteceo = x.noteceo;
        // this.date_rep = x.date_rep;
        // this.date_res = x.date_res;
        if (x.date_rep === null) {
            this.date_rep = x.date_rep;
        } else {
            this.date_rep = moment(x.date_rep).format('YYYY-MM-DD');
            // console.log(this.date_rep);
        }

        if (x.date_res === null) {
            this.date_res = moment(Date()).format('YYYY-MM-DD');
        } else {
            this.date_res = moment(x.date_res).format('YYYY-MM-DD');
            // console.log(this.date_res);
        }

        this.resulting_actions = x.resulting_actions;
        this.conf_output = x.conf_output;
        this.conf_chief = x.conf_chief;
        this.conf_nrls = x.conf_nrls;
        this.near_miss_status = x.near_miss_status;

        this.showAllLevel(this.id_side);
        this.showAllSafety(this.id_side);
        this.showAllType(this.id_safety);
        this.showAllNotype(this.id_type);
        this.showAllAccount(this.id_side, this.id_safety, this.id_type, this.id_notype);
        this.Affected(this.affected_id);

        this.isUpdate = true;
        this.edit = true;
    }

    updateData() {
        this.open = false;
        this.edit = false;
        if (this.id_incident
            && this.idcard_incident
            && this.dep_rep_id
            && this.dep_res_id
            && this.id_side
            && this.id_safety
            && this.id_notype
            && this.code_account
            && this.agents_involved
            && this.location_incident
            && this.date_incident
            && this.date_account
            && this.time_incident
            && this.code_level
        ) {
            this.incidentService.updateIncident(
                this.id_incident,
                this.hn_incident,
                this.idcard_incident,
                this.dep_rep_id,
                this.dep_res_id,
                this.id_side,
                this.id_safety,
                this.id_type,
                this.id_notype,
                this.code_account,
                this.affected_id,
                this.sex_incident,
                this.age_incident,
                this.location_incident,
                this.date_incident,
                this.date_account,
                this.time_incident,
                this.agents_involved,
                this.code_level,
                this.other_involved,
                this.noteceo,
                this.date_rep,
                this.date_res,
                this.resulting_actions,
                this.conf_output,
                this.conf_chief,
                this.conf_nrls,
                this.near_miss_status
            )
                .then((results: any) => {
                    if (results.ok) {
                        console.log("แก้ไขข้อมูลเรียบร้อย");
                        this.showAllIncident();
                        this.id_incident = null;
                        this.hn_incident = null;
                        this.idcard_incident = null;
                        this.dep_rep_id = null;
                        this.dep_res_id = null;
                        this.id_side = null;
                        this.id_safety = null;
                        this.id_type = null;
                        this.id_notype = null;
                        this.code_account = null;
                        this.affected_id = null;
                        this.sex_incident = null;
                        this.age_incident = null;
                        this.location_incident = null;
                        this.date_incident = null;
                        this.date_account = null;
                        this.time_incident = null;
                        this.agents_involved = null;
                        this.code_level = null;
                        this.other_involved = null;
                        this.noteceo = null;
                        this.date_rep = null;
                        this.date_res = null;
                        this.resulting_actions = null;
                        this.conf_output = null;
                        this.conf_chief = null;
                        this.conf_nrls = null;
                        this.near_miss_status = null;
                    } else {
                        console.log("แก้ไขข้อมูลไม่สำเร็จ");
                    }
                }).catch(() => {
                    console.log("SERVER ERROR");
                })

        } else {
            swal("การกรอกข้อมูลไม่ครบ! ตรวจสอบ ข้อที่มีเครื่องหมาย * ");
            console.log("ข้อมูลไม่ครบ");
            this.open = true;
        }
    }

    save() {
        if (this.isUpdate) {
            this.updateData();

        } else {
            this.addData();
        }
    }

    delete(x) {

        console.log(x);
        this.incidentService.remove(x.id_incident)
            .then((results: any) => {
                if (results.ok) {
                    this.showAllIncident();
                } else {
                    console.log(results.error);
                }
            }).catch(() => {
                console.log("SERVER ERROR");
            })
    }

}
