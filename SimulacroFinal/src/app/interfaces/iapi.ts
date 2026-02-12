import { Iusuario } from "./iusuario";

export interface IApi {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  results: Iusuario[];
}
