export type Search = (SearchOption) => Query;

export interface SearchOption {
  url: string;
}

export type Query = (val:string) => Promise<any>

export interface SearchResult {
  [key:string]:any
}