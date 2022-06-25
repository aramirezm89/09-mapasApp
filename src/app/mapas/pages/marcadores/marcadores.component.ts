import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorPersonalizado{
  color : string,
  marker? : mapboxgl.Marker,
  centro? : [number,number]
}
@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css'],
})
export class MarcadoresComponent implements AfterViewInit {
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-70.703678, -33.52577];

  //arreglo de marcadores
  marcadores:MarcadorPersonalizado []= [];
  constructor() {}
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
    });

    this.leerMarcadoresLocalSotrage()
    //elemento html con el fin de poder personalizar el marcador

    /*  const markerHTML : HTMLElement = document.createElement('div')
     markerHTML.innerHTML = 'hola mundo' */

    // marcador harcodiado
    /*     const marker = new mapboxgl.Marker()
      .setLngLat(this.center)
      .addTo(this.mapa); */


  }

  agregarMarcador(){
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
      const nuevoMarcador = new mapboxgl.Marker({draggable:true,color})
      .setLngLat(this.center)
      .addTo(this.mapa);

      this.marcadores.push({ marker: nuevoMarcador, color });

      this.guardarMarcadorLocalStorage();
  }

  irMarcador(marcador : MarcadorPersonalizado) {

    this.mapa.flyTo({
      center:marcador.marker!.getLngLat(),
      zoom:15
    })

  }

  guardarMarcadorLocalStorage(){
    const lngLatArr : MarcadorPersonalizado[] = []
    this.marcadores.forEach(m =>{
      const color = m.color;
      const {lng, lat} = m.marker!.getLngLat();

      lngLatArr.push({
        color:color,
        centro:[lng,lat],
      });
    })

    localStorage.setItem('marcadores',JSON.stringify(lngLatArr))
  }

  leerMarcadoresLocalSotrage(){
    if(!localStorage.getItem('marcadores')){
      return
    }
    const lngLatArr : MarcadorPersonalizado[]  = JSON.parse(localStorage.getItem('marcadores')!)
    lngLatArr.forEach(x =>{
      const nuevoMarcador  =  new mapboxgl.Marker({draggable:true,color:x.color})
      .setLngLat(x.centro!)
      .addTo(this.mapa)

       this.marcadores.push({
        marker : nuevoMarcador,
        color:x.color
       });

    })


  }
}
