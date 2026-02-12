import { Iheroe } from "./iheroe";

export interface IApi {
    content: Iheroe[];
  totalPages: number;
  totalElements: number;
  number: number;  // página actual
  size: number;
}
