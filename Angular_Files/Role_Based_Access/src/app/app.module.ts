import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Forms/login/login.component';
import { SignupComponent } from './Forms/signup/signup.component';
import { AdminComponent } from './DashBoard/admin/admin.component';
import { UserComponent } from './DashBoard/user/user.component';
import { MenuComponent } from './DashBoard/menu/menu.component';
import { WelcomePageComponent } from './DashBoard/welcome-page/welcome-page.component';
import { PageNotFoundComponent } from './DashBoard/page-not-found/page-not-found.component';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { RouteguardService } from './routeguard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from './user';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TokenInterceptorService } from './token-interceptor.service';
import { SpinnerComponent } from './Forms/spinner/spinner.component';
import { HomePageComponent } from './DashBoard/home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    UserComponent,
    MenuComponent,
    WelcomePageComponent,
    PageNotFoundComponent,
    SpinnerComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true},RouteguardService,AuthService,UserService,User],
  bootstrap: [AppComponent]
})
export class AppModule { }
