import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'exchange-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>Exhange Page</div>
    <configuration-text></configuration-text>
  `
})
export class ExchangePageComponent { }
