// utils.js

export function formatIndianCurrency(price) {
    const formattedPrice = price.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  
    return formattedPrice.replace(/\.00$/, '');
  }
  
  // utils.js
export const formatDistance = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
