import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarService } from '../../Service/car.service';  // Ensure correct path
import { Router } from '@angular/router'; 
import { MatDialogRef } from '@angular/material/dialog';
import { CarListComponent } from '../car-list/car-list.component';

@Component({
  selector: 'app-car-create',
  templateUrl: './car-create.component.html',
  styleUrls: ['./car-create.component.scss']
})
export class CarCreateComponent {
  carForm: FormGroup;
  selectedImages: File[] = []; // Array to hold selected files

  constructor(private fb: FormBuilder, private carService: CarService,private router: Router,private dialogRef: MatDialogRef<CarListComponent>) {
    this.carForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      images: [''] // You can leave the images as an empty string
    });
  }

  get titleControl() {
    return this.carForm.get('title');
  }

  get descriptionControl() {
    return this.carForm.get('description');
  }

  get imagesControl() {
    return this.carForm.get('images');
  }

  // Handle file selection
  onImageSelect(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      this.selectedImages = Array.from(files);
      console.log('Selected Images:', this.selectedImages);
    }
  }

  // Handle form submission
  createCar(): void {
    if (this.carForm.valid) {
      const formValues = this.carForm.value;
      const formData = new FormData();

      // Append form values to FormData object
      formData.append('product_title', formValues.title);
      formData.append('product_description', formValues.description);
      formData.append('status', 'ACTIVE');
      formData.append('user_id', '2'); // Hardcoded user ID, adjust as needed
      formData.append('product_tag', '2'); // Hardcoded product tag, adjust as needed

      // Append selected image files to FormData
      this.selectedImages.forEach((file) => {
        formData.append('product_image', file, file.name); // Append files as 'product_image[]' to indicate multiple images
      });

      // Call the service to create the car
      this.carService.createCar(formData).subscribe(
        (response: any) => {
          console.log('API Response:', response);
          // After successful creation, navigate back to the list page
          this.router.navigate(['car/car-list']);  // Adjust the URL path as needed for your list page

          // Close the dialog after successful creation
          this.dialogRef.close();  // Close the dialog
        },
        (error: any) => {
          console.error('API Error:', error);
          // Handle error (e.g., show an error message)
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}