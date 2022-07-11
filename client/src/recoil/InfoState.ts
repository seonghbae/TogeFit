import { atom } from 'recoil';

export interface DateObject {
  year: number;
  month: number;
}

const currentDate = new Date();

export const dateObjectAtom = atom<DateObject>({
  key: 'dateObject',
  default: { year: currentDate.getFullYear(), month: currentDate.getMonth() },
});
