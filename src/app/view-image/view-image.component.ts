import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.css']
})
export class ViewImageComponent {
  zoomLevel = 1;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { imageUrl: string }) { }

  zoomImage(event: WheelEvent): void {
    const zoomSpeed = 0.05;
    const minZoom = 1;
    const maxZoom = 3;

    if (event.deltaY > 0) {
      this.zoomLevel = Math.max(minZoom, this.zoomLevel - zoomSpeed);
    } else {
      this.zoomLevel = Math.min(maxZoom, this.zoomLevel + zoomSpeed);
    }
    event.preventDefault();
  }
}
