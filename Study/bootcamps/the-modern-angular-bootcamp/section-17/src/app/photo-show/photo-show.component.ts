import { Component } from '@angular/core';
import { PhotosService } from '../photos.service';

@Component({
  selector: 'app-photo-show',
  templateUrl: './photo-show.component.html',
  styleUrl: './photo-show.component.css',
})
export class PhotoShowComponent {
  photoUrl: string = '';

  constructor(private photoSvc: PhotosService) {
    this.fetchPhoto();
  }

  reFetch() {
    this.fetchPhoto();
  }

  fetchPhoto() {
    this.photoSvc.getPhoto().subscribe((response) => {
      this.photoUrl = response.urls.regular;
    });
  }
}
