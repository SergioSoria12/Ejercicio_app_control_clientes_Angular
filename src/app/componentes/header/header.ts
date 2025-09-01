import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  isLoggedIn: boolean = false;
  loggedInUser: string | null = null;

  constructor(
    private loginService: LoginService,
    private router: Router
  ){}

  ngOnInit(){
    this.loginService.getAuthState().subscribe(usuario => {
      if(usuario){
        this.isLoggedIn = true;
        this.loggedInUser = usuario.email;
      }else{
        this.isLoggedIn = false;
      }
    });
  }

  logout(){
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
