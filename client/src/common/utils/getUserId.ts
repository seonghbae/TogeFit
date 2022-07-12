export const getUserId = () =>
  document.cookie
    .split(';')
    .map((item) => {
      const cookies = item.split('=');
      return {
        key: cookies[0].replace(/(\s*)/g, ''),
        value: cookies[1],
      };
    })
    .find((token) => token.key === 'userId')?.value;
