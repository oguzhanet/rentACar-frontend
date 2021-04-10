import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  users:User[]

  constructor(private localStorage:LocalStorageService,
    private authService:AuthService,
    private userService:UserService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getByUserId()
  }

  logout(){
    this.localStorage.clean()
    this.toastrService.info("çıkış yapıldı", "Başarılı")
  }

  isAuthenticated(){
    return this.authService.isAuthenticated()
  }

  getByUserId(){
    this.userService.getByUserId(Number(this.localStorage.getItem("userId"))).subscribe(response=>{
      this.users=response.data
    })
  }
}
