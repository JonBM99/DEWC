import { Component, inject } from '@angular/core';
import { IUsers } from '../../interfaces/iusers';
import { Userservices } from '../../services/userservices';
import Swal from 'sweetalert2';
import { UserCard } from "../../components/user-card/user-card";

@Component({
  selector: 'app-home',
  imports: [UserCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  arrayUsers: IUsers[];
  userServices = inject(Userservices);

  constructor() {
    this.arrayUsers = [];
  }

  pageActual: number = 1;
  totalPages: number = 1;
  totalUsers: number = 0;
  usersPerPage: number = 0;
  loading: boolean = false;

  async loadUsers(page: number): Promise<void> {
    this.loading = true;
    try{
      const response = await this.userServices.getAllUsers(page);
      this.arrayUsers = response.results;
      this.pageActual = response.page;
      this.totalPages = response.total_pages;
      this.totalUsers = response.total;
      this.usersPerPage = response.per_page;
    }catch(error){  //Manejo de error para la carga de usuarios desde la API
      console.error('Error loading users:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error al cargar los usuarios. Por favor, inténtelo de nuevo más tarde.',
      });
    } finally{
      this.loading = false;
    }
  }

  async ngOnInit(): Promise<void> {
    await this.loadUsers(this.pageActual);
  }

  async onUserDeleted(userId: string): Promise<void> {
    try{
      await this.userServices.deleteUserById(userId);
      this.arrayUsers = this.arrayUsers.filter(user => user._id !== userId);
      if(this.arrayUsers.length === 0 && this.pageActual > 1){
        await this.loadUsers(this.pageActual - 1);
      }
      if(this.arrayUsers.length === 0 && this.pageActual === 1){
        await this.loadUsers(this.pageActual);
      }
      Swal.fire({
        icon: 'success',
        title: 'Eliminado',
        text: 'El usuario ha sido eliminado correctamente.',
      });
    }catch(error){
      console.error('Error deleting user:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error al eliminar el usuario. Por favor, inténtelo de nuevo más tarde.',
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

