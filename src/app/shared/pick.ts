const pick = <T extends object, k extends keyof T>(
  obj: T,
  fileds: k[],
): Partial<T> => {
  const filterdObj: Partial<T> = {};
  if (fileds.length > 0) {
    fileds.forEach((filed) => {
      const hasThisProperty = Object.hasOwnProperty.call(obj, filed);
      if (hasThisProperty) {
        filterdObj[filed] = obj[filed];
      }
    });
  }

  return filterdObj;
};

export default pick;
