import { Component, inject } from '@angular/core';
import { Iusuario } from '../../interfaces/iusuario';
import { Userservice } from '../../services/userservice';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { UserCard } from "../../components/user-card/user-card";

@Component({
  selector: 'app-user-list',
  imports: [RouterLink, UserCard],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {


  arrayUsuarios: Iusuario[];
  userServices = inject(Userservice);

  constructor() {
    this.arrayUsuarios = [];
  }

  pageActual: number = 1;
  totalPages: number = 1;
  totalUsers: number = 0;
  usersPerPage: number = 0;
  loading: boolean = false;

  async loadUsers(page: number): Promise<void> {
    this.loading = true;
    try {
      const response = await this.userServices.getAllUsers(page);
      this.arrayUsuarios = response.results;
      this.pageActual = response.page;
      this.totalPages = response.total_pages;
      this.totalUsers = response.total;
      this.usersPerPage = response.per_page;
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      this.loading = false;
    }
  }

  async ngOnInit(): Promise<void> {
    await this.loadUsers(this.pageActual);
  }

  async onDeleteUser(userId: string): Promise<void> {
    try{
      await this.userServices.deleteUserById(userId);
      this.arrayUsuarios = this.arrayUsuarios.filter(user => user._id !== userId);
      if(this.arrayUsuarios.length === 0 && this.pageActual > 1){
        await this.loadUsers(this.pageActual - 1);
      }
      if(this.arrayUsuarios.length === 0 && this.pageActual === 1){
        await this.loadUsers(this.pageActual);
      }
      Swal.fire({
        icon: 'success',
        title: 'Deleted',
        text: 'User successfully deleted.',
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete user.',
      });
    }
  }

  //Métodos de navegación de páginas
  goToPage(page: number): void { // Ir a una página específica
    if (page >= 1 && page <= this.totalPages) { // Verificamos que la página esté dentro de los límites
      this.loadUsers(page);
    }
  }

  goOneBack(): void{ // Ir una página atrás
    if(this.pageActual > 1){
      this.loadUsers(this.pageActual - 1);
    }
  }

  goOneForward(): void{ // Ir una página adelante
    if(this.pageActual < this.totalPages){
      this.loadUsers(this.pageActual + 1);
    }
  }
}
