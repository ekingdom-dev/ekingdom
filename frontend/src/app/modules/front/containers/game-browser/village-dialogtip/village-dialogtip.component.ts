import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-village-dialogtip',
  templateUrl: './village-dialogtip.component.html',
  styleUrls: ['./village-dialogtip.component.scss']
})
export class VillageDialogtipComponent implements OnInit {
  @Input()
  x: number;
  @Input()
  y: number;

  constructor() { }

  ngOnInit(): void {
  }

}
