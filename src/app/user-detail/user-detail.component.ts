import { Component, OnInit } from '@angular/core';
import { User } from '../shared/User.Model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../shared/User-Service.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  user: User;
  isLoading = false;
  userId: number;
  error: string = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params:Params) => {
      this.userId = +params['id'];
    });
    this.getUser();
  }

  getUser() {
    this.isLoading = true;
    this.userService.fetchUser(this.userId).subscribe({
      next: (responseData) => {
        this.isLoading = false;
        this.user = responseData.data;
        this.userService.setUser(this.user);
        console.log(responseData.data);
      },
      error: (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
      },
    });
  }

  

  goBack() {
    this.router.navigate(['/users']);
  }
}
