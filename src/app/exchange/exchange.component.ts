import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppService } from '../app.service';
import { Currency, Log } from '../classes'


@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {

  myControl = new FormControl();
  currencies!: Currency[];
  fromCurrency!: string;
  toCurrency!: string;
  amount!: number;
  result!: string;
  amountPattern: RegExp = /(?<=^| )\d+(\.\d+)?(?=$| )/;
  showResult: boolean = false;
  mssError!: string;

  constructor(private dataService: AppService) { }

  ngOnInit(): void {
    this.dataService.GetCurrencies().subscribe((data: any) =>
      {
        this.currencies = new Array<Currency>();
        Object.getOwnPropertyNames(data.symbols).forEach(item => this.currencies.push(new Currency(item.toString(), data.symbols[item].toString() )));
      }, (err: any) => this.handleError(err));
  }

  onChange(){
    if(this.amount != undefined && this.fromCurrency != undefined && this.toCurrency != undefined){
      this.dataService.convertCurrency(this.FromCurrency, this.toCurrency, this.amount.toFixed(2)).subscribe((data: any) =>
      {
        this.result = data.result.toFixed(2);
        this.dataService.setNewLog(new Log(this.fromCurrency, this.toCurrency, this.amount.toFixed(2), this.result, data.date));
        this.showResult = true;
      }, (err: any) => this.handleError(err));
    }
    else this.showResult = false;
  }

  handleError(err:any){
    debugger;
    let msg = null;
    if(err! && err.error! && err.error.error! && err.error.error.message!) msg = err.error.error.message;
    else if(err! && err.error! && err.error.message!) msg = err.error.message;
    else if(err! && err.message!) msg = err.message;
    else msg = 'An error occurred';
    this.mssError = msg;
    this.showResult = false;
    console.log(msg);
  }

}
