const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
  }).format(number / 100);
  return newNumber;
};

const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  if (type === "colors") {
    unique = unique.flat();
  }
  if (type === "sizes") {
    unique = unique.flat();
  }
  return ["all", ...new Set(unique)];
};

const makeDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString();
};

const getTime = (date) => {
  return new Date(date).getTime();
};

export { getUniqueValues, formatPrice, makeDate, getTime };
