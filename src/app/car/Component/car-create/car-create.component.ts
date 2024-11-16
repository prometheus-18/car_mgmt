import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../Service/car.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CarListComponent } from '../car-list/car-list.component';

@Component({
  selector: 'app-car-create',
  templateUrl: './car-create.component.html',
  styleUrls: ['./car-create.component.scss'],
})
export class CarCreateComponent implements OnInit {
  carForm: FormGroup;
  selectedImages: File[] = [];
  isEditMode: boolean = false;

  // Define the API base URL directly here
  private apiUrl: string = 'http://192.168.20.78:3000'; // Your backend API URL

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private router: Router,
    private dialogRef: MatDialogRef<CarListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.carForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      images: [''],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.populateForm(this.data);
      this.loadCarDetails(this.data.id);
    }
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

  public populateForm(data: any): void {
    this.carForm.patchValue({
      title: data.title,
      description: data.description,
    });
  }

  onImageSelect(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      this.selectedImages = Array.from(files);
      console.log('Selected Images:', this.selectedImages);
    }
  }

  createCar(): void {
    if (this.carForm.valid) {
      const formValues = this.carForm.value;
      const formData = new FormData();

      formData.append('product_title', formValues.title);
      formData.append('product_description', formValues.description);
      formData.append('status', 'ACTIVE');
      formData.append('user_id', '2');
      formData.append('product_tag', '2');

      this.selectedImages.forEach((file) => {
        formData.append('product_image', file, file.name);
      });

      if (this.isEditMode) {
        this.carService.updateCar(this.data.id, formData).subscribe(
          (response: any) => {
            console.log('Update Response:', response);
            this.dialogRef.close(true);
          },
          (error: any) => {
            console.error('Update Error:', error);
          }
        );
      } else {
        this.carService.createCar(formData).subscribe(
          (response: any) => {
            console.log('Create Response:', response);
            this.dialogRef.close(true);
          },
          (error: any) => {
            console.error('Create Error:', error);
          }
        );
      }
    } else {
      console.log('Form is invalid');
    }
  }

  loadCarDetails(carId: string): void {
    this.carService.getCar(carId).subscribe(
      (response: any) => {
        if (response && response.data) {
          console.log('Car Details:', response);

          this.carForm.patchValue({
            title: response.data.product_title,
            description: response.data.product_description,
          });

          // Use the defined apiUrl here
          const imageUrl = `${this.apiUrl}${response.data.product_image}`;

          this.selectedImages = [new File([], imageUrl)];
          this.carForm.patchValue({
            images: imageUrl,
          });

          console.log('Image URL:', imageUrl);
        }
      },
      (error: any) => {
        console.error('Error fetching car details:', error);
      }
    );
  }
}
