import { useEffect, useState } from 'react';

interface DateObject {
  year: number;
  month: number;
}

interface JandiType {
  isNow: boolean;
  isActive: boolean;
}

const calculateCalendar = (dateObject: DateObject) => {
  const result: Array<JandiType> = [];
  const standardDate = new Date(dateObject.year, dateObject.month);
  const nextDate = new Date(dateObject.year, dateObject.month + 1, 0);

  // 이번 달 첫 요일 전까지 push
  for (let day = 0; day < standardDate.getDay(); day += 1) {
    result.push({ isNow: false, isActive: false });
  }

  // 이번 달 첫 날부터 마지막 날까지 push
  for (let date = 0; date < nextDate.getDate(); date += 1) {
    result.push({ isNow: true, isActive: true });
  }

  return result;
};

const moveDate = (prevDate: DateObject, type: string) => {
  let { year, month } = prevDate;

  switch (type) {
    case 'right':
      if (month + 1 > 11) {
        month = 0;
        year += 1;
      } else {
        month += 1;
      }
      break;

    case 'left':
      if (month - 1 < 0) {
        month = 11;
        year -= 1;
      } else {
        month -= 1;
      }
      break;

    default:
      break;
  }

  return { year, month };
};

const useJandi = () => {
  const currentDate = new Date();
  const [jandiList, setJandiList] = useState<Array<JandiType>>([]);
  const [dateObject, setDateObject] = useState<DateObject>({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
  });

  const changeDate = (type: string) => {
    setDateObject((prevDate) => moveDate(prevDate, type));
  };

  useEffect(() => {
    setJandiList(() => calculateCalendar(dateObject));
  }, [dateObject]);

  return { dateObject, jandiList, changeDate };
};

export default useJandi;
