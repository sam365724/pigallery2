///<reference path="../browser.d.ts"/>

import { Component } from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouterLink} from 'angular2/router';
import {LoginComponent} from "./login/login.component";
import {AuthenticationService} from "./model/network/authentication.service.ts";
import {GalleryComponent} from "./gallery/gallery.component";
import {OnInit} from "angular2/core";
import {User} from "../../common/entities/User";
import {Router} from "angular2/router";
import {HTTP_PROVIDERS} from "angular2/http";
import {UserService} from "./model/network/user.service.ts";
import {GalleryService} from "./gallery/gallery.service";
import {MATERIAL_BROWSER_PROVIDERS} from "ng2-material/all";
import {ViewportHelper} from "ng2-material/core/util/viewport";
import {AdminComponent} from "./admin/admin.component"; 

        
@Component({
    selector: 'pi-gallery2-app',
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES, RouterLink], 
    providers: [
        HTTP_PROVIDERS,
        ROUTER_PROVIDERS,
        UserService,
        GalleryService,
        AuthenticationService,MATERIAL_BROWSER_PROVIDERS,ViewportHelper

    ]
})
@RouteConfig([
    {
        path: '/',
        redirectTo: ["Login"]
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginComponent,
        useAsDefault: true
    },
    {
        path: '/admin',
        name: 'Admin',
        component: AdminComponent
    },
    {
        path: '/gallery',
        redirectTo: ["Gallery",{directory:""}]
    }, 
   {
        path: '/gallery/:directory',
        name: 'Gallery',
        component: GalleryComponent
    },
])
export class AppComponent  implements OnInit{

    constructor(private _router: Router, private _authenticationService: AuthenticationService){
    }

    ngOnInit() {
        this._authenticationService.OnAuthenticated.on((user:User) => {
            if (this._router.isRouteActive(this._router.generate(['Login']))) {
                console.log("routing");
                this._router.navigate(["Gallery",{directory:""}]);
            }
        });
        

    }
}