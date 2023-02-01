import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './DashBoard/admin/admin.component';
import { HomePageComponent } from './DashBoard/home-page/home-page.component';
import { PageNotFoundComponent } from './DashBoard/page-not-found/page-not-found.component';
import { UserComponent } from './DashBoard/user/user.component';
import { WelcomePageComponent } from './DashBoard/welcome-page/welcome-page.component';
import { LoginComponent } from './Forms/login/login.component';
import { SignupComponent } from './Forms/signup/signup.component';
import { RouteguardService } from './routeguard.service';

const routes: Routes = [
  {path:'',component:WelcomePageComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'add-user', component:SignupComponent,canActivate:[RouteguardService]},
  {path:'admin',component:AdminComponent, canActivate:[RouteguardService]},
  {path:'user',component:UserComponent,canActivate:[RouteguardService]},
  {path:'logout',component:WelcomePageComponent,canActivate:[RouteguardService]},
  {path:'homepage',component:HomePageComponent,canActivate:[RouteguardService]},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
