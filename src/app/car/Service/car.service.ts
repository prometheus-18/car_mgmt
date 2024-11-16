import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = 'http://localhost:3000/api/cars';
  private createproducts = 'http://192.168.20.78:3000/api/v1/createproducts';
  private getAllProducts = 'http://192.168.20.78:3000/api/v1/getAllProducts';
  private deleteProducts = 'http://192.168.20.78:3000/api/v1/deleteProducts';
  private getProductsbyId = 'http://192.168.20.78:3000/api/v1/getProductsbyId';
  private updateProducts = 'http://192.168.20.78:3000/api/v1/updateProducts';

  constructor(private http: HttpClient) {}

  getCars(data:any) {
    return this.http.get(`${this.getAllProducts}`,data);
  }

  getCar(id: string) {
    return this.http.get(`${this.getProductsbyId}/${id}`);
  }

  createCar(data: FormData) {
    return this.http.post(`${this.createproducts}`, data);
  }

  updateCar(id: string,data:any) {
    return this.http.put(`${this.updateProducts}/${id}`,data);
  }

  deleteCar(id: string) {
    return this.http.delete(`${this.deleteProducts}/${id}`);
  }
 
}
