import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { AppRoutingModule } from './app-routing.module';
import { ManageItemsModule } from './manage-items/manage-items.module';
import { FooterModule } from './footer/footer.module';
import { TopBarModule } from './top-bar/top-bar.module';
import { BrlPipe } from './pipes/brl.pipe';


registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [AppComponent, BrlPipe],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ManageItemsModule,
    ReactiveFormsModule,
    TopBarModule,
    FooterModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
