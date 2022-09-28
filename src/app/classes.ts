export class Currency
{
    constructor(
        public CurrencyCode: string, 
        public CurrencyName: string
    ) {}
}

export class Log
{
    constructor(
        public FromCurrency: string,
        public ToCurrency: string,
        public Amount: string,
        public Result: string,
        public Date: string
    ) {}
}