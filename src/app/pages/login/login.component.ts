import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SwalService} from 'app/services/swal/swal.service';
import {AdminService} from 'app/services/admin/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private swal: SwalService,
    private admin: AdminService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      userPassword: ['', Validators.required],
      adminPassword: ['', Validators.required]
    });
  }

  login = () => {
    const username = this.loginForm.controls['userName'].value;
    const password = this.loginForm.controls['userPassword'].value;
    this.admin
      .authenticate(username, password)
      .then(reply => {
        console.log('reply', reply);
        this.router.navigateByUrl('dashboard');
      })
      .catch(error => {
        console.log('error', error);
        this.swal.viewErrorMessage(
          'Invalid',
          'Sorry you authorization details are invalid, please check agai'
        );
      });
  };

  /**
   * Register admin
   */
  register = () => {
    const username = this.loginForm.controls['userName'].value;
    const password = this.loginForm.controls['userPassword'].value;
    const adminPassword = this.loginForm.controls['adminPassword'].value;
    this.admin.registerAdmin(username, password, adminPassword);
  };
}
