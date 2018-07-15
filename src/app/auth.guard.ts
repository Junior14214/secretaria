import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {
        console.log(localStorage);
        console.log("VALIDATE");

        console.log(localStorage.length);

        if (localStorage.length != 0) {
            return true;
        } else {
            this.router.navigate(['/login']);
        }

    }

}
