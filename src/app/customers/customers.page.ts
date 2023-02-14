import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
  users: any = [];
  permission: boolean = true

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.permission = true
    this.getUsers().subscribe(response => {
      console.log(response)
      this.users = response
    }, err => {
      console.log(err)
    })
  }

  goToHome(){
  this.router.navigate(['/home']);
  }

  getUsers(){
    return this.http.get('assets/files/customers.json')
   .pipe(
    map((response: any) => {
     return response.data
    })
   )
}

}