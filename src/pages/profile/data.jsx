export const convertDataToSpecificFormat = (data) => {
  let newArray = [];

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      newArray.push({ name: key, value: data[key] });
    }
  }

  return newArray;
};
