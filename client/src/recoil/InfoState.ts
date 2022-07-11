import { atom } from 'recoil';

export interface DateObject {
  year: number;
  month: number;
}

export interface JandiType {
  isNow: boolean;
  isActive: boolean;
}

const currentDate = new Date();

export const dateObjectAtom = atom<DateObject>({
  key: 'dateObject',
  default: { year: currentDate.getFullYear(), month: currentDate.getMonth() },
});

export const jandiListAtom = atom<Array<JandiType>>({
  key: 'jandiList',
  default: [],
});
