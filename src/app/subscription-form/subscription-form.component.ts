import { Component } from '@angular/core';
import { Sub } from '../models/sub';
import { SuscribersService } from '../services/suscribers.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css'],
})
export class SubscriptionFormComponent {
  constructor(
    private subService: SuscribersService,
    private toastr: ToastrService
  ) {}

  onSubmit(val: any, form: any) {
    const subData: Sub = {
      name: val.name,
      email: val.email,
    };

    this.subService.checkSubs(subData.email).subscribe((val) => {
      if (val.empty == true) {
        this.subService.addSubs(subData);
      } else {
        this.toastr.warning('User is already suscribed');
      }
    });
    form.reset();
  }
}
