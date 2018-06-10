import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SpeechModule } from 'ngx-speech';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { StatusPage } from '../pages/status/status';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FIREBASE_CONFIG } from './firebase.credentials';
import { NoteListService } from '../service/note-list.service';
import * as firebase from 'firebase';

firebase.initializeApp(FIREBASE_CONFIG);
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    StatusPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    SpeechModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    StatusPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NoteListService,
    { provide: 'SPEECH_LANG', useValue: 'en-US' },
  ]
})
export class AppModule {}
