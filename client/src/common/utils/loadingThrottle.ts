/**
 * callback 함수의 실행이 너무 빨리 끝났을 때 로딩화면이 깜빡이는 것처럼 순식간에 지나가는 것을 delay시키기 위한 함수
 * @param defaultTime : 초단위 number
 * @param callback : 실행할 비동기 함수
 * @param setLoading : loading state를 설정하는 React.Dispatch
 */
const loadingThrottle = async (
  defaultTime: number,
  callback: () => Promise<void>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const start = new Date();

  setLoading(true);
  await callback();

  const end = new Date();
  const timeDiff = end.getTime() - start.getTime();

  setTimeout(() => {
    setLoading(false);
  }, defaultTime * 1000 - timeDiff);
};

export default loadingThrottle;
