import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { FakeCard } from 'src/app/models/fakeCard';
import { Rental } from 'src/app/models/rental';
import { FakeCardService } from 'src/app/services/fake-card.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

  rental:Rental;
  cardName:string;
  cardNumber:string;
  cardCvv:string;
  expirationDate:string;
  fakeCard:FakeCard;
  cardExist:Boolean = false;
  constructor(private activatedRoute:ActivatedRoute,
    private fakeCardService:FakeCardService,
    private rentalService:RentalService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["rental"]){
        this.rental = JSON.parse(params['rental']);
      }
    })
  }

  ngAfterViewInit(){
    document.getElementById("openModal").click()
  }

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

  async isCardExist(fakeCard:FakeCard){
    return (await this.fakeCardService.isCardExist(fakeCard).toPromise()).success
  }

  async getFakeCardByCardNumber(cardNumber:string){
    return (await (this.fakeCardService.getCardByNumber(cardNumber)).toPromise()).data[0]
  }

  updateCard(fakeCard:FakeCard){
    this.fakeCardService.updateCard(fakeCard);
  }


}
