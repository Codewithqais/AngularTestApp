import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/Users'; // Adjust the import path as necessary

@Component({
  selector: 'app-useradmin',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './useradmin.component.html',
  styleUrl: './useradmin.component.css'
})
export class UserAdminComponent implements OnInit {
addNewUser() {
throw new Error('Method not implemented.');
}
  users = signal<User[]>([]);
  filteredUsers = signal<User[]>([]);
  selectedUser = signal<User | null>(null);
  searchTerm = signal('');

  // Mock data - in a real app, you'd get this from a service
  ngOnInit(): void {
    const mockUsers: User[] = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'admin',
        status: 'active',
        createdAt: new Date('2023-01-15'),
        lastLogin: new Date('2024-06-10')
      },
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        role: 'editor',
        status: 'active',
        createdAt: new Date('2023-03-22')
      },
      {
        id: '3',
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob@example.com',
        role: 'viewer',
        status: 'pending',
        createdAt: new Date('2024-01-05')
      }
    ];

    this.users.set(mockUsers);
    this.filteredUsers.set(mockUsers);
  }

  filterUsers(): void {
    const term = this.searchTerm().toLowerCase();
    this.filteredUsers.set(
      this.users().filter(user =>
        user.firstName.toLowerCase().includes(term) ||
        user.lastName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
      )
    );
  }

  selectUser(user: User): void {
    this.selectedUser.set({...user});
  }

  saveUser(): void {
    if (!this.selectedUser()) return;

    const updatedUser = this.selectedUser() as User;
    this.users.update(users =>
      users.map(u => u.id === updatedUser.id ? updatedUser : u)
    );
    this.filterUsers();
    this.selectedUser.set(null);
  }

  deleteUser(userId: string): void {
    this.users.update(users => users.filter(u => u.id !== userId));
    this.filterUsers();
    if (this.selectedUser()?.id === userId) {
      this.selectedUser.set(null);
    }
  }
}
