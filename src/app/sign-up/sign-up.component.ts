import { Component } from '@angular/core';
import { AuthService } from '../car/Service/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
 register!:FormGroup


  constructor(
    private authService: AuthService,
    private router:Router
  ) {
    this.register = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
    
  }

  onSubmit(){
    if(this.register.valid){
      let data={
        email:this.register.get('email')?.value,
        username:this.register.get('username')?.value,
        password:this.register.get('password')?.value
      }
      if(data){
       this.authService.signup(data).subscribe((res:any)=>{
        this.router.navigate(['/login'])
       },(err:any)=>{

       })
      }
    }
  }
}
