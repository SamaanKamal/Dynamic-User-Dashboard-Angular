import { Component, OnInit } from '@angular/core';
import { User } from '../shared/User.Model';
import { UserService } from '../shared/User-Service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  error: string = null;
  isLoading = false;
  currentPage = 1;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.isLoading = true;
    this.userService.fetchUsers(this.currentPage).subscribe({
      next: (responseData) => {
        this.isLoading = false;
        this.users = responseData.data;
        console.log(responseData.data);
      },
      error: (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
      },
    });
  }
  onPageChange(page: number): void {
    this.currentPage = page;
    this.getUsers();
  }

  viewDetails(id: number) {
    this.router.navigate(['/user',id])
  }
}
