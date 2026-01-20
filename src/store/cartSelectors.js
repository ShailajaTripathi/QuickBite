import { createSelector } from "reselect";

const selectCart = (state) => state.cart.items;

// total items count
export const selectCartItemsCount = createSelector(
  [selectCart],
  (items) => items.length
);
// total quantity
export const selectCartTotalQuantity = createSelector(
  [selectCart],
  (items) =>
    items.reduce((sum, item) => sum + item.quantity, 0)
);

// total price
export const selectCartTotal = createSelector(
  [selectCart],
  (items) =>
    items.reduce(
      (total, item) =>
        total +
        ((item.card.info.price || item.card.info.defaultPrice) / 100) *
          item.quantity,
      0
    )
);
