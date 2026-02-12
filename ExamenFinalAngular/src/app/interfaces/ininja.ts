import { IStats } from "./istats";

export interface INinja {
  id: number;
  affiliation: string;
  clan: string;
  fullname: string;
  gender: string;
  image1: string;
  image2: string;
  level: string;
  naturetype: string;
  ninjaname: string;
  stats: IStats[];
}
