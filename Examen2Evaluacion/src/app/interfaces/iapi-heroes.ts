import { IHeroes } from "./iheroes";

export interface IApiHeroes {
  page: number;
  size: number;
  content: IHeroes[];
}
