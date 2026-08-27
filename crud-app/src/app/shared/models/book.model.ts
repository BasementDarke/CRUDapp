export interface BookDto {
    id: number;
    title: string;
    author: string;
    publishDate: Date;
}

export interface BookUpdateDto {
    title: string;
    author: string;
    publishDate: Date;
}

export interface BookCreateDto {
    title: string;
    author: string;
    publishDate: Date;
}
