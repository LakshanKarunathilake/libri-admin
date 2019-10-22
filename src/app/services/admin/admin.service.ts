import {Injectable} from '@angular/core';
import {Admin} from 'app/models/AdminUser';
import * as bcrypt from 'bcryptjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {SwalService} from '../swal/swal.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private afs: AngularFirestore, private swal: SwalService) {}

  /**
   * Register User for inital use
   * This will keep a record in the firebase if the local storage doesn't have credentials saved in
   */
  registerAdmin = (username, password, adminPassword) => {
    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(password, salt);

    this.afs
      .collection('admin-credentials')
      .doc('admin')
      .valueChanges()
      .subscribe((user: Admin) => {
        if (bcrypt.compareSync(adminPassword, user.password)) {
          this.afs
            .collection('admin-credentials')
            .doc(username)
            .set({username, password: encryptedPassword})
            .then(() => {
              this.swal.viewSuccessMessage('Success', 'Admin account created successfully');
            });
        } else {
          this.swal.viewErrorMessage('Error', 'Error in administrator password');
        }
      });
  };

  /**
   * Authenticate administrative
   * This will check admins default password at the inital login
   */
  authenticate = (username, password) => {
    return new Promise((resolve, reject) => {
      this.afs
        .collection('admin-credentials')
        .doc<Admin>(username)
        .valueChanges()
        .subscribe(
          user => {
            if (user === undefined) {
              reject(false);
            }
            const hash = user.password;
            if (bcrypt.compareSync(password, hash)) {
              const loginToken: Admin = {username, password};
              window.localStorage.setItem('userToken', JSON.stringify(loginToken));
              resolve(true);
            } else {
              reject(false);
            }
          },
          error => {
            console.log('error', error);
            reject(error);
          }
        );
    });
  };

  /**
   * Remove authentication token from localStorage
   */
  logout = () => {
    window.localStorage.clear();
    this.swal.viewSuccessMessage('Success', 'Successfully logout from the dashboard');
  };
}
