import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Role } from '../models/role';
import { RoleService } from '../services/role.service';
import { PageResponse } from '../models/page-response';
import { PaginationComponent } from '../common/pagination-component/pagination-component';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
})
export class RolesComponent implements OnInit {
  roles: Role[] = [];
  currentPage = 0;
  pageSize = 5;
  totalPages = 0;

  constructor(
    private roleService: RoleService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    console.log('RolesComponent chargé');

    this.loadRoles();
  }

  loadRoles(): void {
    this.roleService.getAll(this.currentPage, this.pageSize).subscribe({
      next: (data: PageResponse<Role>) => {
        console.log('Users reçus :', data);

        this.roles = data.content;
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
    this.loadRoles();
  }

  onPageSizeChanged(size: number): void {
    this.pageSize = size;
    this.currentPage = 0;
    this.loadRoles();
  }
}
