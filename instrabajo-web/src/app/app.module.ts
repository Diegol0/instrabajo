import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './app/components/notfound/notfound.component';
import { ProductService } from './app/service/product.service';
import { CountryService } from './app/service/country.service';
import { CustomerService } from './app/service/customer.service';
import { EventService } from './app/service/event.service';
import { IconService } from './app/service/icon.service';
import { NodeService } from './app/service/node.service';
import { PhotoService } from './app/service/photo.service';

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
