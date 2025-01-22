import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonService } from '../common.service';

declare var $:any
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  userForm: any;
  users: any;

  constructor(public fb: FormBuilder, private service: CommonService) {
    this.userForm = this.fb.group({
      name: [''],
      mobile: [''],
      email: [''],
      age: [''],
    });
  }

  ngOnInit(): void {
    this.GetAllUsers();
  }

  submitform() {
    var type = this.userForm.value.id == null?'Add': 'Update';
    this.service.AddUpdateUser(this.userForm.value, type).subscribe((Users) => {
      if(type == 'Add'){
        alert("Added")
      }else{
        alert("Update")
      }
      this.userForm.reset();
      this.GetAllUsers();
      console.log(Users)
    // this.service.AddUpdateUser(this.userForm.value).subscribe((data) => {
    //   console.log(data);
    });
  }

  GetAllUsers() {
    this.service.GetAllUsers().subscribe((Users) => {
      // alert("added");
      // this.userForm.reset();
      console.log('users', Users);
      this.users = Users;
    });
  }

  DeleteUserByID(id: any) {
    debugger;
    this.service.DeleteUserByID(id).subscribe((Users) => {
      alert('Delete');
      this.GetAllUsers();
    });
  }

  GetUserByID(id: any) {
    debugger;
    this.service.DeleteUserByID(id).subscribe((Users) => {
      alert('user id successfully');
      console.log('userdetails', Users);
        $("#home").addClass('show');
        $("#home").addClass('active');

        $("#menu1").removeClass('show');
        $("#menu1").removeClass('active');
      
      this.userForm.patchValue({
        name: Users.name,
        mobile: Users.mobile,
        email: Users.email,
        age: Users.age,
      });
    });
  }
}
