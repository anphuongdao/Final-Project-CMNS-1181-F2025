/* --------------- Discount Popup --------------- */
function openDiscount(){ document.getElementById('discount-popup').style.display = 'flex'; }
function closeDiscount(){ document.getElementById('discount-popup').style.display = 'none'; }
function submitDiscount(){
  const email = document.getElementById('discount-email')?.value;
  if(email){
    alert(`Thank you ${email}! Check your inbox for your sparkly coupon 💖`);
    closeDiscount();
  } else alert('Please enter a valid email ✧');
}

/* --------------- Heart Animation --------------- */
function showHeart(x = null, y = null){
  const heart = document.createElement('div');
  heart.className = 'heart-burst';
  heart.textContent = '💖';
  heart.style.left = (x ?? (window.innerWidth * 0.5)) + 'px';
  heart.style.top = (y ?? (window.innerHeight * 0.6)) + 'px';
  document.body.appendChild(heart);
  setTimeout(()=> heart.remove(), 1100);
}

/* --------------- CART (localStorage) --------------- */
function getCart(){ return JSON.parse(localStorage.getItem('cart') || '[]'); }
function saveCart(c){ localStorage.setItem('cart', JSON.stringify(c)); updateCartCount(); }

function addToCart(name, price, image){
  const cart = getCart();
  cart.push({ name, price: Number(price), image: image || '' });
  saveCart(cart);
  // little feedback
  showHeart(Math.min(window.innerWidth - 140,  window.innerWidth * 0.8), window.innerHeight - 90);
  toast('Added to cart ♡');
}

function removeItem(index){
  const cart = getCart();
  if(index >= 0 && index < cart.length){
    cart.splice(index,1);
    saveCart(cart);
    if(window.location.pathname.includes('cart')) loadCart();
  }
}

function clearCart(){
  localStorage.removeItem('cart');
  if(window.location.pathname.includes('cart')) loadCart();
  updateCartCount();
}

/* Load cart for cart page */
function loadCart(){
  const cart = getCart();
  const cartItemsDiv = document.getElementById('cart-items');
  const totalDiv = document.getElementById('cart-total');

  if(!cartItemsDiv) return;
  if(cart.length === 0){
    cartItemsDiv.innerHTML = `<div class="empty">Your cart is empty ♡</div>`;
    totalDiv.textContent = '';
    return;
  }

  let html = '';
  let total = 0;
  cart.forEach((item, idx) => {
    total += Number(item.price);
    html += `
      <div class="cart-item">
        <img src="${item.image || 'https://via.placeholder.com/120'}" class="cart-img" alt="">
        <div>
          <h4>${item.name}</h4>
          <div class="kawaii-note">$${Number(item.price).toFixed(2)}</div>
        </div>
        <div class="cart-meta">
          <button class="btn-sm btn-ghost" onclick="removeItem(${idx}); loadCart();">Remove</button>
        </div>
      </div>
    `;
  });

  cartItemsDiv.innerHTML = html;
  totalDiv.textContent = `Total: $${total.toFixed(2)}`;
}

/* cart counter in header */
function updateCartCount(){
  const count = getCart().length;
  const el = document.getElementById('cart-count');
  if(el) el.textContent = count;
}

/* On DOM load */
document.addEventListener('DOMContentLoaded', ()=> {
  // header cart count
  updateCartCount();

  // auto-load cart page
  if(window.location.pathname.includes('cart')) loadCart();

  // Contact form handler if exists
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const feedback = document.getElementById('form-feedback');
      feedback && (feedback.textContent = "💖 Thank you! Your message has been sent! 💖");
      form.reset();
    });
  }
});

/* Tiny toast feedback */
function toast(msg = '') {
  const t = document.createElement('div');
  t.style.position = 'fixed';
  t.style.left = '50%';
  t.style.transform = 'translateX(-50%)';
  t.style.bottom = '20px';
  t.style.padding = '10px 16px';
  t.style.borderRadius = '12px';
  t.style.background = 'rgba(17,17,17,0.85)';
  t.style.color = 'white';
  t.style.zIndex = 150;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(()=> t.remove(), 1400);
}
