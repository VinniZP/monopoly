import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class Unsubscribe implements OnDestroy {
  private _destroy = new Subject();

  public ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  public destroy() {
    return takeUntil(this._destroy);
  }
}
