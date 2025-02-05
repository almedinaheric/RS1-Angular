import { Component } from '@angular/core';
import {LoginInformacije} from "../../Helpers/loginInformacije";
import {AutentifikacijaHelper} from "../../Helpers/autentifikacija";
import {Router} from "@angular/router";
import {Korisnik} from "../../Helpers/korisnik";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../../MojConfig";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  token:LoginInformacije;
  ovajKorisnik:any;
  uloga:any;
  constructor(private httpklijent:HttpClient, private router: Router) {
  }
  ngOnInit(){
    this.token=AutentifikacijaHelper.getLoginInfo();
    this.ProvjeriUlogu();
    console.log(this.ovajKorisnik);
  }
  ProvjeriUlogu(){
    if(this.token.autentifikacijaToken.gost!=null) //niz provjera uloga korisnika
      this.ovajKorisnik=this.token.autentifikacijaToken.gost;
    else if(this.token.autentifikacijaToken.vlasnik!=null)
      this.ovajKorisnik=this.token.autentifikacijaToken.vlasnik;
    else
      this.ovajKorisnik=this.token.autentifikacijaToken.admin;
  }
  NaLandingPage()
  {
    this.router.navigate(['landingPage']);
  }
  Logout()
  {
    this.httpklijent.post(MojConfig.adresa_servera+'/api/Korisnik/Logout', MojConfig.http_opcije()).subscribe(x=>{
      this.router.navigate(['/']);
    })
  }
}
