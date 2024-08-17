import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { environment } from '../../../core/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HandleImagePickerService {
  constructor(private _toastr: ToastrService) {}

  getImagePath(imagePath: string): string {
    return environment.imageUrl + imagePath;
  }

  loadImage(imagePath: string, files: any[]): void {
    // Construct the full URL to the image
    const imageUrl = this.getImagePath(imagePath);

    // Fetch the image
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a File object from the Blob
        const file = new File([blob], 'image.jpg', { type: blob.type });

        // Set the file in the dropzone
        files.push(file);
      })
      .catch((error) => {
        this._toastr.error('Failed to load image');
      });
  }
}
