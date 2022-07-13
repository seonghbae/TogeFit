import { useEffect, useMemo } from 'react';
import { useRecoilState, SetterOrUpdater } from 'recoil';
import {
  dateObjectAtom,
  DateObject,
  jandiListAtom,
  JandiType,
} from 'recoil/infoState';
import { customAxios } from 'common/api';
import { useLocation } from 'react-router-dom';

const getPostGrass = async (
  dateObject: DateObject,
  userId: string | undefined
) => {
  const response = await customAxios.get(
    `/api/post/grass?userId=${userId}&year=${dateObject.year}&month=${
      dateObject.month + 1
    }`
  );

  return response.data;
};

const calculateCalendar = async (
  dateObject: DateObject,
  setJandiList: SetterOrUpdater<JandiType[]>,
  userId: string | undefined
) => {
  const result: Array<JandiType> = [];
  const standardDate = new Date(dateObject.year, dateObject.month);
  const nextDate = new Date(dateObject.year, dateObject.month + 1, 0);

  const data = await getPostGrass(dateObject, userId);

  // 이번 달 첫 요일 전까지 push
  for (let day = 0; day < standardDate.getDay(); day += 1) {
    result.push({ isNow: false, isActive: false });
  }

  // 이번 달 첫 날부터 마지막 날까지 push
  for (let date = 0; date < nextDate.getDate(); date += 1) {
    const jandi = {
      isNow: true,
      isActive: data.find((e: number) => e === date + 1),
    };
    result.push(jandi);
  }

  setJandiList(result);
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
  const { pathname } = useLocation();
  const [jandiList, setJandiList] =
    useRecoilState<Array<JandiType>>(jandiListAtom);
  const [dateObject, setDateObject] =
    useRecoilState<DateObject>(dateObjectAtom);

  const userId = useMemo(() => pathname.split('/').at(-1), [pathname]);

  const changeDate = (type: string) => {
    setDateObject((prevDate) => moveDate(prevDate, type));
  };

  useEffect(() => {
    calculateCalendar(dateObject, setJandiList, userId);
  }, [dateObject]);

  return { dateObject, jandiList, changeDate };
};

export default useJandi;
