import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [BrowserModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  users: any[] = [];
  newUser = { name: '', email: '', cpf: '' };
  editUser = { id: 0, name: '', email: '', cpf: '' };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  addUser() {
    if (this.newUser.name && this.newUser.email) {
      this.userService.addUser(this.newUser).subscribe(() => {
        this.loadUsers();
        this.newUser = { name: '', email: '', cpf: '' }; //clear
      });
    }
  }

  edit(id: number) {
    this.userService.getUser(id).subscribe((user) => {
      this.editUser = { ...user };
    });
  }

  updateUser() {
    if (this.editUser.name && this.editUser.email) {
      this.userService
        .updateUser(this.editUser.id, this.editUser)
        .subscribe(() => {
          this.loadUsers();
          this.editUser = { id: 0, name: '', email: '', cpf: '' };
        });
    }
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }
}
