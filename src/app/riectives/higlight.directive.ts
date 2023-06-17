import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHiglight]'
})
export class HiglightDirective {

  @HostListener('mouseenter') onMouseEnter() {
    this._elementRef.nativeElement.style.backgroundColor = 'red';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this._elementRef.nativeElement.style.backgroundColor = '';
  }

  constructor(
    private _elementRef: ElementRef
  ) {
    // this._elementRef.nativeElement.style.backgroundColor = 'red';
  }

}
