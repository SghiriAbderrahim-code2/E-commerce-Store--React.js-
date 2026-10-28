/**
 * Builds the fake order payload stored after a successful checkout.
 * Kept outside the component so impure calls (Date.now) never run during render.
 */
export const createOrder = ({ items, summary, customer }) => ({
  id: `NX-${Date.now().toString(36).toUpperCase()}`,
  date: new Date().toISOString(),
  customer,
  items: items.map((item) => ({
    id: item.product.id,
    title: item.product.title,
    image: item.product.image,
    price: item.product.price,
    quantity: item.quantity,
  })),
  summary,
})
