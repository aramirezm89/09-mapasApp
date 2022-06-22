import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
     var map = new mapboxgl.Map({
       container: 'mapa',
       style: 'mapbox://styles/mapbox/streets-v11',
       center: [-70.703678, -33.52577],
       zoom: 7.5,
     });
  }

}
