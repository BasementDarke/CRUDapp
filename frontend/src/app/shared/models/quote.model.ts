export interface QuoteDto {
    id: number;
    text: string;
    origin: string;
}

export interface QuoteUpdateDto {
    text: string;
    origin: string;
}

export interface QuoteCreateDto {
    text: string;
    origin: string;
}
