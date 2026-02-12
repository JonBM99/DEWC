import { INinja } from "./ininja";

export interface IApi {
  page: number;
  size: number;
  total_pages: number;
  content: INinja[];
}
