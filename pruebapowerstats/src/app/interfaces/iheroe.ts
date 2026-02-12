import { IPowerStats } from "./ipower-stats";

export interface Iheroe {
    id?: number;
  name: string;
  fullName?: string;
  alterEgos?: string;
  aliases?: string[];
  placeOfBirth?: string;
  firstAppearance?: string;
  publisher?: string;
  alignment: 'HERO' | 'VILLAIN' | 'ANTI_HERO' | 'NEUTRAL';
  gender?: string;
  race?: string;
  height?: string;
  weight?: string;
  eyeColor?: string;
  hairColor?: string;
  occupation?: string;
  base?: string;
  groupAffiliation?: string[];
  relatives?: string[];
  imageUrl?: string;
  powerStats?: IPowerStats;
  createdAt?: string;
  updatedAt?: string;
}
