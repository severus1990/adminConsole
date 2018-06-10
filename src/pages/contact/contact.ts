import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  selectedOrder: any;
  carrierData: any;
  bidStatus: Observable<any[]>;
  status:any;
  dummy:AngularFireList<any>;
  bidding:AngularFireList<any>;
  orders: AngularFireList<any>;
  carriers: Observable<any[]>;
  driverList: any;
  bidButtonText: string;
  timer: boolean;

  constructor(public navCtrl: NavController, private navParams: NavParams,private db: AngularFireDatabase) {
    this.bidButtonText = "Initiate Bid";
    this.timer = true;
    this.selectedOrder = navParams.get('order');
    //this.carrierData = navParams.get('carrierData');
    this.dummy = this.db.list('/itracks/bids');
    this.bidding = this.db.list('/itracks/bidding');
    this.carriers = this.getData('/itracks/carriers');
    this.orders = this.db.list('/itracks/orders');
    this.db.list('/itracks/carriers').valueChanges().subscribe((res) => {
      this.carrierData = res;
      // this.carrierData = this.carrierData.filter(function (el) {
      //   return el.available
      // });
     });
    console.log(this.carrierData)
  }

  ngOnInit() {
    this.bidStatus = this.getData('/itracks/bids');
    this.db.list('/itracks/bids').valueChanges().subscribe((res) => {
      this.status = res;
      console.log(this.status)
    });
    
  }

  getData(listPath): Observable<any[]> {
    return this.db.list(listPath).valueChanges();
  }

  bidNow(id){
    this.bidButtonText = "Bid In Progress";
    let that = this;
    setTimeout( () => {
      this.timer = false;
    },60000);
    this.dummy.update("0",{"status": true, "orderid":id});
  }

  acceptBid(key){
    this.bidding.update("0",{"status": true, "orderId":this.selectedOrder.id});
    this.orders.update("0",{"status": "T"});
    this.navCtrl.pop()
  }

}
