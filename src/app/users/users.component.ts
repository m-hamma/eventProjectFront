import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService,
  private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (data) => {
        console.log('Users reçus :', data);
        this.users = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
