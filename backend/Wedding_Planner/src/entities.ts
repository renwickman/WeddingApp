
export class Wedding {
    constructor(
        public weddingId:number,
        public groomName:string,
        public brideName:string,
        public weddingLocation: string,
        public weddingBudget:number,
        public weddingDate: Date
    ){}
}

export class Expenses {
    constructor(
        public expenseId:number,
        public expenseAmount:number,
        public reason:string,
        public weddingId:number
    ){}
}