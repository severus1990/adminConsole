
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Note } from '../../model/note.model';
import { NoteListService } from '../../service/note-list.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ContactPage } from '../contact/contact';

@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {

  orders: Observable<any[]>;
  carriers: Observable<any[]>;
  status: any;
  messages: any;
  orderList: any;
  carrierData: any;
  availableDrivers: number;
  messages1:AngularFireList<any>;
  orders1: AngularFireList<any>;
  message = {
    "alert" : "",
    "delay" : 0,
    "message" : "",
    "time" : ""
  }
  indivMsgs: Array<any> = []
  constructor(private db: AngularFireDatabase, public navCtrl: NavController) { 
    this.orders1 = this.db.list('/itracks/orders');
    this.db.list('/itracks/messages').valueChanges().subscribe((res) => {
      this.messages = res;
      console.log(this.messages.length)
      if(this.messages.length == 5){
        this.orders1.update("0",{"status": "S"});
      }
    });
    this.messages1 = this.db.list('/itracks/messages');
    
  }
 

  checkAndAdd(time, message) {
    var id = this.messages.length + 1;
    var found = this.messages.some(function (el) {
      return el.time === time;
    });
    if (!found) { this.messages1.update(this.messages.length.toString(),message); }
  }

}

