import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private afs: AngularFirestore) {}

  loadFeatured() {
    return this.afs
      .collection('posts', (ref) =>
        ref.where('isFeatured', '==', true).limit(4)
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  loadLatest() {
    return this.afs
      .collection('posts', (ref) => ref.orderBy('createdAt'))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  loadCategoryPost(id: string) {
    return this.afs
      .collection('posts', (ref) => ref.where('category.categoryId', '==', id))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  loadOnePost(id: string) {
    return this.afs.collection('posts').doc(id).valueChanges();
  }
  loadSimilar(cat: string) {
    return this.afs
      .collection('posts', (ref) => ref.where('category.category', '==', cat))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }
  countViews(postId: string) {
    const viewCount = {
      views: firebase.firestore.FieldValue.increment(1),
    };
    this.afs
      .collection('posts')
      .doc(postId)
      .update(viewCount)
      .then(() => console.log('view count updated'));
  }
}
