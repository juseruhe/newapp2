import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  code: any

  constructor(private barcodeScanner: BarcodeScanner, public platform: Platform) { 
    if (this.platform.is('cordova')) {
      
      console.log('I am on a web browser')
    } else {
     console.log('im not on a web browser')
    }
  }

  ngOnInit() {
    
  }

  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.code = barcodeData.text
      console.log('Barcode data', this.code);
     }).catch(err => {
         console.log('Error', err);
     });
  }

}
