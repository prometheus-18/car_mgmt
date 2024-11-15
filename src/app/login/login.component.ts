import { Component } from '@angular/core';
import { AuthService } from '../car/Service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: any;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router,private fb:FormBuilder) {

    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),  
      password: new FormControl('', [Validators.required]), 
    });
  }


  onSubmit() {
    debugger
    if (this.loginForm.valid) {
       let data={
        email:this.loginForm.get('username')?.value,
        password:this.loginForm.get('password')?.value
       }
       if(data){
          this.authService.login(data).subscribe((res:any)=>{
           if(res){
            this.router.navigate(['/car'])
           }
          },(err:any)=>{
               
          })
       }
      
    } else {
      this.errorMessage = 'Both username and password are required.';
    }
  }
}
