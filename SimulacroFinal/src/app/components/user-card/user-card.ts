import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Userservice } from '../../services/userservice';
import { IUser } from '../../interfaces/iuser';
import Swal from 'sweetalert2';
import { Iusuario } from '../../interfaces/iusuario';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {

  userService = inject(Userservice);
  @Input() user!: Iusuario;
  @Output() userDeleted = new EventEmitter<string>();

  async deleteUser(user: Iusuario) {
    const response = await Swal.fire({
      title: 'Are you sure?',
      text: `You are going to delete user ${user.first_name} ${user.last_name}. This action cannot be undo.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
    });
    if(response.isConfirmed){
      try{
        await this.userService.deleteUserById(user._id);
        Swal.fire({
          icon: 'success',
          title: 'Deleted',
          text: `User ${user.first_name} ${user.last_name} deleted.`,
        });

        this.userDeleted.emit(user._id);
      } catch (error) {
        console.error('Error deleting user:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `An error has ocurred while deleting user: ${user.first_name} ${user.last_name}. Try again later.`,
        });
      }
    }
  }

  isAdmin() { //con esto puedo hacer que no salgan las opciones de eliminar ver mas y editar si no fuera admin, en este caso female
    const role = localStorage.getItem('role');
    if(role === 'female'){
      return true;
    }
    return false;
  }
}
