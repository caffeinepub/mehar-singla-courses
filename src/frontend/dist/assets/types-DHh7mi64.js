function getLevelLabel(level) {
  return level.__kind__;
}
function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Number(price));
}
export {
  formatPrice as f,
  getLevelLabel as g
};
