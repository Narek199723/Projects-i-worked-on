export const formatPoints = (value, fractionDigits) => {
  return parseFloat(value).toLocaleString(undefined, {
    minimumFractionDigits: fractionDigits === undefined ? 2 : fractionDigits,
    maximumFractionDigits: fractionDigits === undefined ? 2 : fractionDigits,
  });
};

export const formatDate = (value) => {
  return new Date(value).toLocaleDateString();
};

export const formatDateTime = (value) => {
  return new Date(value).toLocaleString();
};

export const formatCurrency = (value, fractionDigits) => {
  return (
    '$' +
    parseFloat(value).toLocaleString(undefined, {
      minimumFractionDigits: fractionDigits === undefined ? 2 : fractionDigits,
      maximumFractionDigits: fractionDigits === undefined ? 2 : fractionDigits,
    })
  );
};
