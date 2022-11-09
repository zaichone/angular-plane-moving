import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaneComponent } from './plane/plane.component';
import { MarkAnimationComponent } from './mark-animation/mark-animation.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaneComponent,
    MarkAnimationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
