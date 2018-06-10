
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Note } from '../../model/note.model';
import { NoteListService } from '../../service/note-list.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ContactPage } from '../contact/contact';
import { SpeechService } from 'ngx-speech';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {
  msg = 'nothing';
  comment = '';
  context = '';
  subscription: Subscription;
  good: any;
  pizzas: any[] = [
      'Sicilienne',
  ];
  started = false;
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
  driverMsg: string;
  indivMsgs: Array<any> = []
  ordersInfo: any;
  constructor(private db: AngularFireDatabase, public navCtrl: NavController, public speech: SpeechService) { 
    this.orders1 = this.db.list('/itracks/orders');
    this.db.list('/itracks/orders').valueChanges().subscribe((res) => {
      this.ordersInfo = res;
    });
    this.db.list('/itracks/messages').valueChanges().subscribe((res) => {
      this.messages = res;
      console.log(this.messages.length)
      if(this.messages.length == 4){
        this.orders1.update("0",{"status": "S"});
      }
    });
    this.messages1 = this.db.list('/itracks/messages');
    
  }

  ngOnInit() {
    // this.speech.start();
    this.speech.message.subscribe(msg => {
        this.msg = msg.message;
        console.log(this.msg)
        this.driverMsg = this.msg;
    });
    this.speech.context.subscribe(context => {
        this.context = context;
    });
    this.good = {message: 'Try me!'};
    this.speech.started.subscribe(started => this.started = started);
  }

  toggleVoiceRecognition() {
      if (this.started) {
          this.speech.stop();
          let mess = {
            "alert" : "",
            "carrierMess" : this.driverMsg.toString(),
            "delay" : 0,
            "message" : this.driverMsg.toString(),
            "time" : "17:00",
            "toDriver" : true
          } 
          console.log(this.driverMsg.toString())
          this.messages1.update(this.messages.length.toString(),mess);
      } else {
          this.speech.start();
      }
  }

  recordStart() {
    this.subscription = this.speech.message.subscribe(msg => {
        this.comment += msg.message + '\n';
    });
  }

  recordStop() {
      this.subscription.unsubscribe();
  }

  hello() {
      console.log('hello');
  }
 

  checkAndAdd(time, message) {
    var id = this.messages.length + 1;
    var found = this.messages.some(function (el) {
      return el.time === time;
    });
    if (!found) { this.messages1.update((this.messages.length-1).toString(),message); }
  }

  getMyStyles(data){
    if(data.delay == '0' && data.alert.length <= 2){
      return {
        'background-color': 'green',
        'color': 'white'
      }
    }else if(data.delay != '0' && data.alert.length <= 2){
      return {
        'background-color': 'red',
        'color': 'white'
      }
    }else{
      return {
        'background-color': '#dc6a08',
        'color': 'white'
      }
    }
  }

}

