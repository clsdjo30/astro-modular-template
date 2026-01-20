import { apiRequest } from "../services/apiClient";

const form = document.querySelector<HTMLFormElement>("#checkout-form");
const status = document.querySelector<HTMLParagraphElement>("#checkout-status");

if (!form || !status) {
  throw new Error("Checkout markup missing");
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  status.textContent = "Submitting order...";

  const formData = new FormData(form);
  const payload = {
    customerName: String(formData.get("customerName") ?? ""),
    customerEmail: String(formData.get("customerEmail") ?? ""),
    customerPhone: String(formData.get("customerPhone") ?? ""),
    fulfillmentType: String(formData.get("fulfillmentType") ?? ""),
    notes: String(formData.get("notes") ?? "")
  };

  try {
    await apiRequest("/api/v1/orders", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    status.textContent = "Order submitted. We will confirm shortly.";
    form.reset();
  } catch (err) {
    status.textContent = err instanceof Error ? err.message : "Order failed.";
  }
});
