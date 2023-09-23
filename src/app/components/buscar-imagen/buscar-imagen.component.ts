import { Component, OnInit } from '@angular/core';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-buscar-imagen',
  templateUrl: './buscar-imagen.component.html',
  styleUrls: ['./buscar-imagen.component.css'],
})
export class BuscarImagenComponent implements OnInit {
  nombreImagen: string = '';

  ngOnInit(): void {}
  constructor(private _imagenService: ImagenService) {}
  buscarImagenes() {
    if (this.nombreImagen === '') {
      this._imagenService.setError('Agrega un texto de busqueda');
      return;
    }

    this._imagenService.enviarTerminoBusqueda(this.nombreImagen);
  }
}
