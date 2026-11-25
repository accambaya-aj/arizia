// Filter Bento Meals
function filterMeals(diet, clickedBtn) {
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  clickedBtn.classList.add('active');

  document.querySelectorAll('.bento-card').forEach(card => {
    if (diet === 'all' || card.getAttribute('data-diet') === diet) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// Shopping Bag & Promo Logic
let bag = [];
let discountApplied = false;
const drawer = document.getElementById('cartDrawer');

function toggleCart() {
  drawer.classList.toggle('open');
}

function addBento(name, price) {
  bag.push({ name, price });
  updateBag();
  drawer.classList.add('open');
}

function removeBento(index) {
  bag.splice(index, 1);
  updateBag();
}

function applyPromo() {
  const code = document.getElementById('promoInput').value.trim().toUpperCase();
  if (code === 'ARIZIA20') {
    discountApplied = true;
    updateBag();
    alert('20% discount applied with ARIZIA20!');
  } else {
    alert('Invalid promo code. Try ARIZIA20 for 20% off!');
  }
}

function updateBag() {
  document.getElementById('bagCount').textContent = bag.length;
  const listEl = document.getElementById('cartList');
  const totalEl = document.getElementById('totalPrice');

  if (bag.length === 0) {
    listEl.innerHTML = '<p class="empty-note">Your bento box is empty. Add a meal to get started!</p>';
    totalEl.textContent = '₱0';
    return;
  }

  let total = 0;
  listEl.innerHTML = bag.map((item, idx) => {
    total += item.price;
    return `
      <div class="cart-item">
        <span>${item.name}</span>
        <div>
          <strong>₱${item.price.toLocaleString()}</strong>
          <button class="remove-btn" onclick="removeBento(${idx})">Remove</button>
        </div>
      </div>
    `;
  }).join('');

  if (discountApplied) {
    total = Math.round(total * 0.8);
    totalEl.textContent = '₱' + total.toLocaleString() + ' (20% OFF)';
  } else {
    totalEl.textContent = '₱' + total.toLocaleString();
  }
}

function checkoutOrder() {
  if (bag.length === 0) return alert('Please add a Filipino bento or meal plan first!');
  const savedName = document.getElementById('custName').value;
  const savedRice = document.getElementById('riceType').value;
  const greeting = savedName ? `Salamat, ${savedName}!` : 'Salamat!';
  alert(`${greeting} Your Arizia healthy Filipino bento order (${savedRice}) is confirmed for delivery.`);
  bag = [];
  discountApplied = false;
  updateBag();
  drawer.classList.remove('open');
}

// Custom Delivery Schedule Submission
document.getElementById('scheduleForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('custName').value;
  const date = document.getElementById('startDate').value;
  const slot = document.getElementById('timeSlot').value;
  const rice = document.getElementById('riceType').value;

  const confirmBox = document.getElementById('scheduleConfirm');
  confirmBox.style.display = 'block';
  confirmBox.textContent = `✓ Schedule saved for ${name}! Starting ${date} (${slot}) with ${rice}. You can now checkout your Bento Box.`;
});