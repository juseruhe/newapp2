import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
})
export class CitiesPage implements OnInit {
  cities: any = []

  constructor(private http: HttpClient,
    public toastController: ToastController, 
    public alertController: AlertController) { }

  ngOnInit() {
    this.getCities().subscribe(response => {
      console.log(response)
      this.cities = response
    }, err => {
      console.log(err)
    })
  }

  getCities(){
  return this.http.get('assets/files/cities.json')
   .pipe(
    map((response: any) => {
      return response.data
    })
   )
  }

  async presentToast1(){
    const toast = await this.toastController.create({
      message: "Ciudad Seleccionada",
      duration: 2000,
      position: "bottom"
    })

    toast.present()
  }

  async presentAlert1(){
    const alert = await this.alertController.create({
      header: "Borrar ciudad",
      message: "¿Desea borrar la ciudad?",
      buttons: ["OK"],
    })

    await alert.present()

    let result = await alert.onDidDismiss()
    console.log(result)
  }

  async presentAlert2(){
    const alert = await this.alertController.create({
      header: "Borrar ciudad",
      message: "¿Desea borrar la ciudad?",
      buttons: [{
        text: "No",
        handler: () => {
           console.log("No cancel")
        }
      }, {
        text: "Si",
        handler: () => {
         console.log("Eliminada")
        }
      }],
    })

    await alert.present()

    let result = await alert.onDidDismiss()
    console.log(result)
  }

}
