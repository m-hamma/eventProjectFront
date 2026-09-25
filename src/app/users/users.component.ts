import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

import { CommonModule } from '@angular/common';
import { PageResponse } from '../models/page-response';

import { PaginationComponent } from '../common/pagination-component/pagination-component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  currentPage = 0;
  pageSize = 5;
  totalPages = 0;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAll(this.currentPage, this.pageSize).subscribe({
      next: (data: PageResponse<User>) => {
        console.log('Users reçus :', data);

        this.users = data.content;
        this.totalPages = data.totalPages;

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onPageChanged(page: number): void {
    this.currentPage = page;
    this.loadUsers();
  }

  onPageSizeChanged(size: number): void {
    this.pageSize = size;
    this.currentPage = 0;
    this.loadUsers();
  }
}
