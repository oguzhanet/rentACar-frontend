export interface Rental{
    rentalId?:number;
    carId:number;
    customerId:number;
    rentDate:Date;
    returnDate?:Date;
    rentEndDate:Date;

}