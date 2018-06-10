import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Note } from '../../model/note.model';
import { NoteListService } from '../../service/note-list.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { ContactPage } from '../contact/contact';
import { StatusPage } from '../status/status';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  status: object = {
    R: [
      "assets/imgs/ready2Ship.jpg"
    ],
    S: [
      "assets/imgs/shipped.jpg"
    ],
    T: [
      "assets/imgs/inTransit.jpg"
    ]
  }

  statusPin: object = {
    R: [
      "secondary"
    ],
    S: [
      "secondary"
    ],
    T: [
      "primary"
    ]
  }

  orders: Observable<any[]>;
  carriers: Observable<any[]>;
  driverList: any;
  carrierData: any;
  availableDrivers: number;
  constructor(private db: AngularFireDatabase, public navCtrl: NavController) { }
  ngOnInit() {
    this.orders = this.getData('/itracks/orders');
    this.carriers = this.getData('/itracks/carriers');
    this.db.list('/itracks/carriers').valueChanges().subscribe((res) => {
      this.driverList = res;
      this.driverList = this.driverList.filter(function (el) {
        return el.available
      });
      this.carrierData = this.driverList;
      this.availableDrivers = this.driverList.length;
    });
    
  }

  getData(listPath): Observable<any[]> {
    return this.db.list(listPath).valueChanges();
  }

  pushPage(order,carrierData,mode) {
    if(mode==='R'){
      this.navCtrl.push(ContactPage, {
        order: order,
        carrierData: carrierData
      });
    }
    else if(mode==='T' || mode==='S'){
      this.navCtrl.push(StatusPage, {
        order: order,
        carrierData: carrierData
      });
    }
  }

}

