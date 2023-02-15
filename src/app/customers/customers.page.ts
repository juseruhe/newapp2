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
  searchedUser: any

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

searchCustomer(event: any){
const text = event.target.value
this.searchedUser = this.users

if(text && text.trim() != ''){
this.searchedUser = this.searchedUser.filter((user: any) => {
  return (user.name.toLowerCase().indexOf(text.toLowerCase()) > -1)
})
}

}

}