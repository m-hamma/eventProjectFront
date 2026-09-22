import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Role } from '../models/role';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
})
export class RolesComponent implements OnInit {
  roles: Role[] = [];

  constructor(
    private roleService: RoleService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    console.log('RolesComponent chargé');

    this.roleService.getAll().subscribe({
      next: (data) => {
        console.log('Roles reçus :', data);
        this.roles = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur roles', err);
      },
    });
  }
}
