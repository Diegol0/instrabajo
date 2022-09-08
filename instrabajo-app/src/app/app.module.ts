import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from 'src/app/home/home.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { JobComponent } from './job/job.component';
import { EmployeeComponent } from './employee/employee.component';
import { ProfileComponent } from './profile/profile.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { SplashScreenService } from './services/splash-screen.service';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { Welcome2Component } from './welcome2/welcome2.component';
import { Welcome3Component } from './welcome3/welcome3.component';
import { StartComponent } from './start/start.component';
import { EmployerJobsComponent } from './employer-jobs/employer-jobs.component';
import { JobDetailComponent } from './job-detail/job-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    JobComponent,
    EmployeeComponent,
    ProfileComponent,
    WelcomeComponent,
    Welcome2Component,
    Welcome3Component,
    StartComponent,
    EmployerJobsComponent,
    JobDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
  ],
  providers: [SplashScreenService],
  bootstrap: [AppComponent],
})
export class AppModule {}
