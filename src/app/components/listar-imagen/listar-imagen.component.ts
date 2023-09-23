import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, retry } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css'],
})
export class ListarImagenComponent implements OnInit, OnDestroy {

  termino: string = '';
  suscription: Subscription;
  listImagenes:any[]=[];
  loading:boolean= false;
  imagenesPorPagina:number=30
  paginaActual:number=1
  calcularTotalPaginas:number=0;

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  constructor(private _imagenService: ImagenService) {
    this.suscription = this._imagenService.getTerminoBusqueda().subscribe((data) => {
      this.termino = data;
      this.paginaActual = 1
        this.loading= true
        this.obtenerImagenes();
      });
  }

  obtenerImagenes() {
    this._imagenService.getImagenes(this.termino,this.imagenesPorPagina,this.paginaActual).subscribe((data) => {   
      this.loading= false;  
     
      console.log(data);
      
      if (data.totalHits === 0) {
        console.log("Entrando");
        this._imagenService.setError('Opss... no encontramos ningun resultado');
        this.listImagenes = []
        return;
      }
      this.calcularTotalPaginas = Math.ceil(data.totalHits /20)
      console.log(this.calcularTotalPaginas);
      
      this.listImagenes = data.hits;
    },error =>{
      this._imagenService.setError('Opps.. ocurrio un error')
      this.loading= false;  
    });
  }

  paginaAnterior(){
    this.paginaActual--;
    this.loading = true;
    this.listImagenes = []
    this.obtenerImagenes()
  }

  paginaPosterior() {
    this.paginaActual++;
    this.loading = true;
    this.listImagenes = []
    this.obtenerImagenes()
  }

  paginaAnteriorClass(){
    if (this.paginaActual === 1) {
      return false;
    } else{
      return true
    }
  }
  paginaPosteriorClass(){
    if (this.paginaActual === this.calcularTotalPaginas) {
      return false;
    } else{
      return true
    }
  }
}
