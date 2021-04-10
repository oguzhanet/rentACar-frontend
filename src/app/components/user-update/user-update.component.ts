import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  userUpdateForm:FormGroup
  user:User
  users:User[] = [];
  constructor(private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private userService:UserService,
    private activatedRoute:ActivatedRoute,
    private localStorage :LocalStorageService) { }

  ngOnInit(): void {
    if(this.localStorage.getItem("id")){
      this.getUsersById(Number(this.localStorage.getItem('id')))
    }
    this.createUserUpdateForm();
    this.getUsers();
  }

  getUsers(){

    this.userService.getUsers().subscribe(response =>{
      this.users = response.data
    })
    
  }

  createUserUpdateForm(){
    this.userUpdateForm = this.formBuilder.group({ 
      userId:  ["", Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required],
    })
  }

  update(){
    this.userUpdateForm.patchValue({
      id: this.user.userId,
      
    })
    if(this.userUpdateForm.valid){
      let userModel = Object.assign({},this.userUpdateForm.value)
      this.userService.update(userModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
      })
      
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
    
  }
  getUsersById(userId:number){
    this.userService.getByUserId(userId).subscribe(response=>{
      this.user=response.data[0];
     
    })
  }
  bilgiler(){
    this.userUpdateForm.patchValue({
      id:  this.user.userId,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      password: this.user.password,
    
    });}
}
