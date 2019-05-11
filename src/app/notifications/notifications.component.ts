import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {firestore} from 'firebase';
import {map} from 'rxjs/operators';
import swal from 'sweetalert';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  newTopic = '';
  topics;
  createNoticeForm: FormGroup;
  constructor(private afs: AngularFirestore, private fb: FormBuilder) {}
  ngOnInit() {
    this.topics = this.afs
      .collection('admin')
      .doc('notices')
      .collection('topics')
      .valueChanges();
    this.createNoticeForm = this.fb.group({
      topic: ['', [Validators.required]],
      title: ['', [Validators.required]],
      message: ['', [Validators.required]],
      expiration: ['', [Validators.required]]
    });
  }

  createTopic = () => {
    this.afs
      .collection('admin')
      .doc('notices')
      .collection('topics')
      .add({name: this.newTopic})
      // .update({topics: firestore.FieldValue.arrayUnion(this.newTopic)})
      .then(() => {
        console.log(`Created new topic ${this.newTopic}`);
      })
      .catch(error => {
        console.log('Error occured while creating dashboard');
        console.error(error);
      });
  };

  createNotice = () => {
    if (this.createNoticeForm.valid) {
      this.afs
        .collection('notices')
        .add({
          message: this.createNoticeForm.controls['message'].value,
          title: this.createNoticeForm.controls['title'].value,
          expiration: this.createNoticeForm.controls['expiration'].value,
          topic: this.createNoticeForm.controls['topic'].value
        })
        .then(() => {
          swal('Success', 'Notice created successfully');
        });
    } else {
      swal('Error', 'Please fill the required fields..', 'error');
    }
  };
}
