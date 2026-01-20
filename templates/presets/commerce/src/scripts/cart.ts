import { getCart, removeCartItem, updateCartItem } from "../services/cartService";

const list = document.querySelector<HTMLUListElement>("#cart-items");
const total = document.querySelector<HTMLParagraphElement>("#cart-total");
const status = document.querySelector<HTMLParagraphElement>("#cart-status");

if (!list || !total || !status) {
  throw new Error("Cart markup missing");
}

function formatPrice(cents: number): string {
  return `${(cents / 100).toFixed(2)} EUR`;
}

async function render() {
  status.textContent = "Loading cart...";
  const summary = await getCart();
  list.innerHTML = "";

  if (summary.cart.items.length === 0) {
    status.textContent = "Your cart is empty.";
    total.textContent = formatPrice(0);
    return;
  }

  status.textContent = "";
  for (const item of summary.cart.items) {
    const li = document.createElement("li");
    li.dataset.productId = item.productId;
    li.innerHTML = `
      <div>
        <p>Product: ${item.productId}</p>
        <p>Unit: ${formatPrice(item.unitPriceCents)}</p>
        <label>
          Qty
          <input type="number" min="1" value="${item.quantity}" />
        </label>
        <button type="button" data-action="remove">Remove</button>
      </div>
    `;
    list.appendChild(li);
  }

  total.textContent = formatPrice(summary.totalCents);
}

list.addEventListener("change", async (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) return;
  const li = target.closest<HTMLLIElement>("li");
  if (!li) return;
  const productId = li.dataset.productId;
  if (!productId) return;

  const quantity = Number(target.value);
  if (!Number.isFinite(quantity) || quantity < 1) return;

  await updateCartItem(productId, quantity);
  await render();
});

list.addEventListener("click", async (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) return;
  if (target.dataset.action !== "remove") return;
  const li = target.closest<HTMLLIElement>("li");
  if (!li) return;
  const productId = li.dataset.productId;
  if (!productId) return;
  await removeCartItem(productId);
  await render();
});

render().catch((err) => {
  status.textContent = err instanceof Error ? err.message : "Failed to load cart.";
});
