import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class SuscribersService {
  constructor(private afs: AngularFirestore, private toster: ToastrService) {}

  addSubs(subData: any) {
    this.afs
      .collection('subscribers')
      .add(subData)
      .then(() => {
        this.toster.success('Subscribed Successfully');
      });
  }
  checkSubs(subEmail: string) {
    return this.afs
      .collection('subscribers', (ref) => ref.where('email', '==', subEmail))
      .get();
  }
}
