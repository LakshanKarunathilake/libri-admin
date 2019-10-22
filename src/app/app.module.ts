import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {MatInputModule, MatCardModule, MatButton, MatButtonModule} from '@angular/material';
import {AgmCoreModule} from '@agm/core';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireFunctionsModule} from '@angular/fire/functions';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {SwalService} from './services/swal/swal.service';
import {MatTabsModule} from '@angular/material/tabs';
import {AdminService} from './services/admin/admin.service';
import { AuthGuard } from './guards/auth-guard.service';

const firebase = {
  apiKey: 'AIzaSyDuPVBd60jVbPw1BRefZsTkWb2AXZsfzNk',
  authDomain: 'libri-238805.firebaseapp.com',
  databaseURL: 'https://libri-238805.firebaseio.com',
  projectId: 'libri-238805',
  storageBucket: 'libri-238805.appspot.com',
  messagingSenderId: '696789073783',
  appId: '1:696789073783:web:3579e974bc60674c'
};

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireFunctionsModule,
    AngularFirestoreModule,
    MatTabsModule
  ],
  declarations: [AppComponent, AdminLayoutComponent, LoginComponent],
  providers: [SwalService, AdminService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
