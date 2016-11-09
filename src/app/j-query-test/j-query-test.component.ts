import { Component, ElementRef, OnInit } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-j-query-test',
  templateUrl: './j-query-test.component.html',
  styleUrls: ['./j-query-test.component.css']
})
export class JQueryTestComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    jQuery(this.elementRef.nativeElement)
      .find('button')
      .on('click', function() {
        alert('Hello, motherfuckers!');
      });
  }
}
