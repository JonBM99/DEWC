import { Component, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { INinja} from '../../interfaces/ininja';
import { NinjaService } from '../../services/ninja-service';

@Component({
  selector: 'app-ninja-view',
  imports: [RouterLink],
  templateUrl: './ninja-view.html',
  styleUrl: './ninja-view.css',
})
export class NinjaView {

  ninja!: INinja;
  ninjaService = inject(NinjaService);
  activatedRoute = inject(ActivatedRoute);
  constructor(){}

  ngOnInit(): void{
    this.activatedRoute.params.subscribe(async (params:any) => {
      let id: number = params.id;
      if(id != undefined) {
        let response = await this.ninjaService.getNinjaById(id);
        if(response != undefined){
          this.ninja = response;
        }
      }
    })
  }
}
