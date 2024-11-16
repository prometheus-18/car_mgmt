import { Component, OnInit } from '@angular/core';
import { CarService } from '../../Service/car.service';
import { CarCreateComponent } from '../car-create/car-create.component';
import { MatDialog } from '@angular/material/dialog';
import { CarDetailsComponent } from '../car-details/car-details.component';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {
  cars: any[] = [];  // Array to hold the cars fetched from the API
  searchQuery: string = '';  // For holding the search query

  constructor(private carService: CarService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchCars();  // Fetch the list of cars when the component is initialized
  }

  // Fetch cars from the API
  fetchCars(): void {
    this.carService.getCars(this.searchQuery).subscribe((data: any) => {
      this.cars = data.data;  // Assuming the response is an array of cars
    });
  }

  // Search cars based on query
  searchCars(): void {
    this.fetchCars();  // Re-fetch the cars with the search query applied
  }

  // View car details (you can later implement a details page or modal)
  viewCar(carId: any,val:any): void {
    // console.log(val,'val');
 
      // Open a dialog to display the car details
      // const dialogRef = this.dialog.open(CarCreateComponent, {
      //   width: '500px', // Adjust width as needed
      //   data: carId,  // Pass the car details to the dialog
      //   checkVal:val
      // });

      // dialogRef.afterClosed().subscribe(() => {
      //   // Optionally, do something when the dialog is closed, e.g., refresh the list
      // });
   

      const dialogRef = this.dialog.open(CarCreateComponent, {
        data: { id: carId,checkVal:val },
  
        width: '500px',
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        
      });
  }

  // Open dialog to create a new car
  openDialog(): void {
    const dialogRef = this.dialog.open(CarCreateComponent, {
      width: '500px',  // Adjust size as needed
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchCars();  // Re-fetch cars after the dialog closes to get the latest list
    });
  }

  // Delete a car from the list
  deleted(carId: string): void {
    if (confirm('Are you sure you want to delete this car?')) {
      this.carService.deleteCar(carId).subscribe(
        (response: any) => {
          console.log('Car deleted successfully:', response);
          // Remove the deleted car from the cars list
          this.cars = this.cars.filter(car => car.id !== carId);
        },
        (error: any) => {
          console.error('Error deleting car:', error);
        }
      );
    }
  }

  }

