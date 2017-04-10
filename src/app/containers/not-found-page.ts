import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'not-found-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>Not Found Page</div>
  `
})
export class NotFoundPageComponent { }
