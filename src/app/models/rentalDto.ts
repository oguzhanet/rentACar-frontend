export interface RentalDto{
    rentalId:number;
    carId:number;
    brandName:string;
    colorName:string;
    customerName:string;
    companyName:string;
    modelYear:number;
    dailyPrice:number;
    description:string;
    rentDate:Date;
    returnDate:Date;
}