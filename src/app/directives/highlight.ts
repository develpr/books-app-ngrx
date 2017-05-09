import { Directive, ElementRef, Input } from '@angular/core';
@Directive({ selector: '[myHighlight]' })
export class HighlightDirective {
    constructor(el: ElementRef) {
        console.log("HI");
       el.nativeElement.style.backgroundColor = 'yellow';
    }
}