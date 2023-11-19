import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'aiq-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {

  @Input() display: 'horizontal' | 'vertical' = 'horizontal';

  constructor() {}

  ngOnInit(): void {}
}
