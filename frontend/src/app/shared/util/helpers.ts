import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export function toNgbDateFromString(date: string): NgbDateStruct {
    const [year, month, day] = date.split('-').map(Number);

    return {
      year,
      month,
      day
    };
}

export function toNgbDateFromDate(date: Date): NgbDateStruct {
    const ngbDate: NgbDateStruct = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
    };

    return ngbDate;
}

export function toDateOnly(ngbDate: NgbDateStruct): Date { 
    const {year, month, day} = ngbDate!;
    const date = new Date(year, month-1, day+1)
    return date.toISOString().split('T')[0] as unknown as Date
}
