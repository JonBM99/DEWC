import { Component } from '@angular/core';
import { NewInterface } from '../../interfaces/new-interface';  //Importamos la interfaz creada
import { FormsModule } from '@angular/forms'; //Para usar el Two way data binding neceistamos importar FormsModule en el app.module.ts y usar [(ngModel)] en el html

@Component({
  selector: 'app-blog-component',
  imports: [FormsModule],
  templateUrl: './blog-component.html',
  styleUrl: './blog-component.css',
})
export class BlogComponent {

  blogPosts: NewInterface[] = [   //Inicializamos una array de objetos basado en la interfaz de News y agregamos dos noticias de ejemplo
    {
      title: 'Noticia 1',
      image: 'https://placehold.co/400',
      content: 'Contenido de la noticia 1 para probar la interfaz y la funcionalidad del componente.',
      date: '2025-11-10'
  },
    {
      title: 'Noticia 2',
      image: 'https://placehold.co/400',
      content: 'Contenido de la noticia 2 para probar la interfaz y la funcionalidad del componente.',
      date: '2025-11-10'
    }
  ];

  newPost: NewInterface = {  //Creamos un objeto vacio para enlazar con el formulario del html
    title: '',
    image: '',
    content: '',
    date: ''
  };
  
  addPost() {  //Metodo para agregar una nueva noticia al array de noticias
    if(this.newPost.title === '' || this.newPost.image === '' || this.newPost.content === '' || this.newPost.date === '') { //Comprobamos que se rellenan todos los campos y mostramos una alerta si no es asi
      alert('Todos los campos son obligatorios');                                                                           //Podria mejorarse mostrando un mensaje de error en el html en lugar de una alerta 
                                                                                                                            //y deshabilitar el boton hasta que se rellenen todos los campos
    }else {
      this.blogPosts.push(this.newPost); //Añadimos la nueva noticia al array de noticias
      this.newPost = {  //Limpiamos el formulario y crea un nuevo objeto vacio
        title: '',
        image: '',
        content: '',
        date: ''
      };
    }
    console.log(this.blogPosts); //Lo muestro por consola solamente para verificar que funciona, esto lo puedo borrar luego
  }
}

