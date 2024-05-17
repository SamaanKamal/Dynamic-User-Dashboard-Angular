import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  searchQuery: string = '';
  error: string = null;
  constructor(private router: Router) {}


  search() {
    const userId = parseInt(this.searchQuery);
    if (!isNaN(userId)) {
      this.router.navigate(['/user', userId]);
      this.error = null;
    }
    else {
      this.error = "please enter a valid user ID";
    }
  }
}
