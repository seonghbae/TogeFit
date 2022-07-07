import { useLocation } from 'react-router-dom';

const getPath = () => {
  const { pathname } = useLocation();
  const path = pathname.split('/').at(-1);

  return path;
};

export default getPath;
