import { Injectable } from '@angular/core';
import { Currency, Log } from './classes'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

const CONVERT_CURRENCY_API = 'https://api.apilayer.com/exchangerates_data/';
const CONVERT = 'convert';
const SYMBOLS = 'symbols';
const API_KEY = '3FXMJpnfd76dfXkE1PhnLpOmfpCrTiIr';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  constructor(private http: HttpClient) { }

  public readonly LOG_RECORDS = 'logRecors';
  private _logRecords!: Log[];
  private _currencies!: Currency[];

  public setNewLog(newLog: Log){
    this._logRecords.push(newLog);
    sessionStorage.setItem(this.LOG_RECORDS, JSON.stringify(this._logRecords));
  }

  public setLogs(){
    let sessionLogs = sessionStorage.getItem(this.LOG_RECORDS);
    if(sessionLogs!)
      this._logRecords = JSON.parse(sessionLogs!);
    else
      this._logRecords = new Array<Log>();
  }

  public getLogs():Array<Log>{
    return this._logRecords;
  }

  public convertCurrency(from:string, to:string, amount:string): any {
    const reqHeader = new HttpHeaders({ 'apikey': API_KEY });
    const prms = new HttpParams().set('to', to).set('from', from).set('amount', amount);
    return this.http.get<any>(CONVERT_CURRENCY_API + CONVERT, ({ params: prms, headers: reqHeader }));
  }

  public GetCurrencies(): any {
    const reqHeader = new HttpHeaders({ 'apikey': API_KEY });
    return this.http.get<any>(CONVERT_CURRENCY_API + SYMBOLS, ({ headers: reqHeader }));
  }

}
