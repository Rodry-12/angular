import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, AfterViewInit, OnDestroy } from '@angular/core';
@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() img : string = 'valor inicializado';
  @Output() loaded = new EventEmitter<string>();
  default : string = './assets/default.png';
  // counter: number = 0;
  // counterFn: number | undefined;

  constructor() {
    // console.log("solo se corre cuando crea una instancia del componente, solo ocurre una vez");
    // No hacer peticiones asyncronas ni suscripciones
  }

  ngOnChanges(changes: SimpleChanges): void {
    // antes del render
    // console.log("ngOnChanges", changes);
    // Estar actualizando los cambios en los inputs y correo cada vez que actualicemos los inputs del component
  }

  ngOnInit(): void {
    // antes del render
    // Correr cosas asyncronas
    // Solo se va a correr una vez
    // console.log("ngOnInit");

    // this.counterFn = window.setInterval(() => {
    //   this.counter += 1;
    // console.log("ngOnInit");
    // }, 1000)
  }

  ngAfterViewInit(): void {
    // Despues de que todo se este renderizando
    // Normalmente se manejan los hijos
    // console.log("ngAfterViewInit");
  }

  ngOnDestroy(): void {
    // Solo cuando se va a eliminar el componente
    // console.log("ngOnDestroy");
    // window.clearInterval(this.counterFn);
  }

  errorImege() {
    this.img = this.default;
  }

  loadImage() {
    // console.log('Loading image');
    this.loaded.emit(this.img);
  }
}
