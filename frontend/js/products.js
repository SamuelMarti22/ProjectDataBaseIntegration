const id_nodo = localStorage.getItem("id_nodo");
console.log("ID recibido:", id_nodo);

const products = [
  { name: "iPhone 13 pro max-Pacific Blue-128GB storage", price: "$180 / 499", status: "Partially paid", badge: "Confirmed", badgeClass: "confirmed", statusClass: "partially-paid", img: "https://picsum.photos/40?random=1" },
  { name: "Apple MacBook Pro 13 inch-M1-8/256GB-space", price: "$120 / 499", status: "Full paid", badge: "Confirmed", badgeClass: "confirmed", statusClass: "full-paid", img: "https://picsum.photos/40?random=2" },
  { name: "PlayStation 5 DualSense Wireless Controller", price: "$120 / 499", status: "Cancelled", badge: "Cancelled", badgeClass: "cancelled", statusClass: "cancelled-line", img: "https://picsum.photos/40?random=3" },
  { name: "Amazon Basics Mesh, Mid-Back, Swivel Office", price: "$120 / 499", status: "Partially paid", badge: "Confirmed", badgeClass: "confirmed", statusClass: "partially-paid", img: "https://picsum.photos/40?random=4" },
  { name: "Sony X85J 75 Inch Sony 4K Ultra HD LED Smart", price: "$120 / 499", status: "Full paid", badge: "Confirmed", badgeClass: "confirmed", statusClass: "full-paid", img: "https://picsum.photos/40?random=5" }
];

const list = document.getElementById("product-list");

products.forEach(p => {
  const item = document.createElement("div");
  item.className = "product";
  item.innerHTML = `
    <div class="product-left">
      <img src="${p.img}" alt="icon" />
      <div class="product-details">
        <strong>${p.name}</strong>
        <span class="product-status ${p.statusClass}">${p.status}</span>
      </div>
    </div>
    <div class="product-middle">
      <div class="amount">${p.price}</div>
    </div>
    <div class="product-right">
      <span class="badge ${p.badgeClass}">${p.badge}</span>
    </div>
  `;
  list.appendChild(item);
});
