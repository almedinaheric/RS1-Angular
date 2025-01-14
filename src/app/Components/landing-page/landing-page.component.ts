import { Component } from '@angular/core';
import {AutentifikacijaHelper} from "../../Helpers/autentifikacija";
import {Router} from "@angular/router";
import {MojConfig} from "../../MojConfig";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  constructor(private httpklijent:HttpClient, private router:Router) {
  }
  token:any;
  workingUser:any;

  ngOnInit(){
    this.token=AutentifikacijaHelper.getLoginInfo();
    this.ProvjeriUlogu();
    localStorage.setItem('Working-user', JSON.stringify(this.workingUser));
  }
  ProvjeriUlogu(){
    if(this.token.autentifikacijaToken.gost!=null) //niz provjera uloga korisnika
      this.workingUser=this.token.autentifikacijaToken.gost;
    else if(this.token.autentifikacijaToken.vlasnik!=null)
      this.workingUser=this.token.autentifikacijaToken.vlasnik;
    else
      this.workingUser=this.token.autentifikacijaToken.admin;
  }
  NaProfil()
  {
    this.router.navigate(['dashboard']);
  }
  Logout()
  {
    this.httpklijent.post(MojConfig.adresa_servera+'/api/Korisnik/Logout', MojConfig.http_opcije()).subscribe(x=>{
      this.router.navigate(['/']);
      // @ts-ignore
      AutentifikacijaHelper.setLoginInfo(null);
    });
  }
}
