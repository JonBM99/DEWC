import { IUser } from "./iuser";

export interface IApi {
  page: number,
  per_page: number,
  total: number,
  total_pages: number,
  results: IUser[]
}
