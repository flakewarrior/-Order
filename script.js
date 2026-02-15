let cart = [];

function addToCart(item, price) {
  cart.push({ item, price });
  alert(item + " added to cart!");
}

function viewCart() {
  let summary = cart.map(c => `${c.item} - Tsh ${c.price}`).join("\n");
  alert("Your Cart:\n" + summary);
}

document.getElementById("orderForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const service = document.querySelector('input[name="service"]:checked').value;
  const payment = document.querySelector('input[name="payment"]:checked').value;

  const order = {
    cart,
    service,
    payment
  };

  try {
    const res = await fetch("https://your-n8n-backend-url/webhook/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order)
    });
    const data = await res.json();
    document.getElementById("response").textContent = "Order placed successfully!";
    cart = []; // clear cart after order
  } catch (err) {
    document.getElementById("response").textContent = "Error placing order.";
  }
});
