import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import {FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms'
import { FakeCard } from 'src/app/models/fakeCard';
import { Rental } from 'src/app/models/rental';
import { FakeCardService } from 'src/app/services/fake-card.service';
import { RentalService } from 'src/app/services/rental.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { DialogExampleComponent } from 'src/app/dialog-example/dialog-example/dialog-example.component';


@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

  isSaved:boolean=false
  id:string
  paymentAddForm:FormGroup;
  creditCardId: number;
  fakecards:FakeCard[]=[];
  
  constructor(private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private fakeCardService:FakeCardService,
    private dialog:MatDialog,
    private localStorage:LocalStorageService,
    private userService:UserService,
    private rentalService:RentalService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(params=>{
    //   if(params["rental"]){
    //     this.rental = JSON.parse(params['rental']);
    //   }
    // })

    this.getCardNumberFromDatabase()
    this.getCards()
    this.createPaymentAddForm()
  }

  createPaymentAddForm(){
    this.paymentAddForm=this.formBuilder.group({
      cardName:["",Validators.required],
      cardNumber:["",Validators.required],
      expirationDate:["",Validators.required],
      cardCvv:["",Validators.required],

    })
  }

  add(){
    if(this.paymentAddForm.valid){
      let paymentModel = Object.assign({},this.paymentAddForm.value)
      
      this.fakeCardService.add(paymentModel).subscribe(response=>{
        if(!this.isSaved){
          this.openDialog().afterClosed().subscribe(response => {
            if(response) {
              this.addCardNumber(paymentModel)
            }
          })
        }
        this.toastrService.success("Ödeme İşlemi Tamamlandı","Başarılı")
      },responseError=>{
        if(responseError.errors.Errors.length>0){
          for (let i = 0; i < responseError.errors.Errors.length; i++) {
            this.toastrService.error(responseError.errors.Errors[i].ErrorMessage,"Doğrulama Hatası")
            
          }
        }
      })
      
    }
    else{
      this.toastrService.error("Formunuz Eksik","Dikkat")
    }
  }
  openDialog() {
    let dialogConfig = new MatDialogConfig()
    return this.dialog.open(DialogExampleComponent,dialogConfig)
  }
  addCardNumber(payment : FakeCard){  
    this.fakeCardService.add(payment).subscribe(response => {
      this.toastrService.success(response.message)
    })
}

getCardNumberFromDatabase() {
  this.fakeCardService.getCardByNumber(this.id).subscribe(response => {
    if(response.data != null) {
      this.paymentAddForm.controls["cardNumber"].setValue(response.data)
      this.isSaved = true
    }
  })
}

getCards() {
  this.fakeCardService.getCardByNumber(this.id).subscribe((response) => {
    if (response) {
      this.fakecards = response.data;
    }
  });
}

cardChange(event: any) {
  let selectedCard = this.fakecards.find((c) => c.id == this.creditCardId);
  this.paymentAddForm.get('cardNumber')?.setValue(selectedCard?.cardNumber);
  this.paymentAddForm
    .get('expiryDate')
    ?.setValue(selectedCard?.expirationDate);
  this.paymentAddForm
    .get('securityCode')
    ?.setValue(selectedCard?.cardCvv);

}



  // ngAfterViewInit(){
  //   document.getElementById("openModal").click()
  // }

  // async rentACar(){
  //   let fakeCard:FakeCard = {cardName:this.cardName,cardNumber:this.cardNumber,expirationDate:this.expirationDate,cardCvv:this.cardCvv}
  //   this.cardExist = await this.isCardExist(fakeCard)
  //   if(this.cardExist){
  //     this.fakeCard = await((this.getFakeCardByCardNumber(this.cardNumber))) 
  //     if(this.fakeCard.moneyInTheCard>=this.rental.totalRentPrice){
  //       this.fakeCard.moneyInTheCard = this.fakeCard.moneyInTheCard - this.rental.totalRentPrice
  //       this.updateCard(fakeCard)
  //       this.rentalService.addRental(this.rental)
  //       this.toastrService.success("Arabayı kiraladınız","Işlem başarılı")
  //     }else {
  //       this.toastrService.error("Kartınızda yeterli para bulunmamaktadır","Hata")
  //     }
  //   }else{
  //     this.toastrService.error("Bankanız bilgilerinizi onaylamadı","Hata")
  //   }
  // }

  // async isCardExist(fakeCard:FakeCard){
  //   return (await this.fakeCardService.isCardExist(fakeCard).toPromise()).success
  // }

  // async getFakeCardByCardNumber(cardNumber:string){
  //   return (await (this.fakeCardService.getCardByNumber(cardNumber)).toPromise()).data[0]
  // }

  // updateCard(fakeCard:FakeCard){
  //   this.fakeCardService.updateCard(fakeCard);
  // }


}
