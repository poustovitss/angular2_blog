import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule }    from './app-routing.module';

import { AppComponent }        from './app.component';
import { DashboardComponent }  from './dashboard.component';
import { PostDetailComponent } from './post-detail.component';
import { PostsComponent }      from './posts.component';
import { PostService }         from './post.service';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    PostDetailComponent,
    PostsComponent
  ],
  providers: [ PostService ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
