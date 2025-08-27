/* ====== Mobile Nav Toggle ====== */
const nav = document.getElementById('primary-nav');
const toggle = document.querySelector('.nav-toggle');
if (toggle && nav){
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

/* ====== Simple Slider ====== */
document.querySelectorAll('[data-slider]').forEach(slider => {
  const slides = slider.querySelector('.slides');
  const prev = slider.querySelector('.prev');
  const next = slider.querySelector('.next');
  let index = 0;
  function update(){ slides.style.transform = `translateX(-${index * 100}%)`; }
  prev.addEventListener('click', ()=>{ index = Math.max(0, index - 1); update(); });
  next.addEventListener('click', ()=>{ index = Math.min(slides.children.length - 1, index + 1); update(); });
});

/* ====== Contact Form (Demo Only) ====== */
const form = document.getElementById('contactForm');
if (form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    document.getElementById('thankYouPopup').style.display = 'flex';

    form.reset();
  });
}

/* ====== Product Filter ====== */
const filter = document.getElementById('filter');
if (filter){
  filter.addEventListener('change', () => {
    const val = filter.value;
    document.querySelectorAll('#products [role="listitem"]').forEach(item => {
      const match = val === 'all' || item.dataset.category === val;
      item.style.display = match ? '' : 'none';
    });
  });
}

/* ====== Cart Functionality ====== */
// Get cart from localStorage
function getCart(){
  return JSON.parse(localStorage.getItem('cart')) || {};
}

// Save cart to localStorage
function setCart(cart){
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart badge in header
function updateCartCount(){
  const cart = getCart();
  let count = 0;
  // Sum all quantities in the cart
  for (let key in cart) {
    if (cart.hasOwnProperty(key)) {
      count += cart[key];
    }
  }
  const badge = document.getElementById('cartCount');
  if(badge) badge.textContent = count; // display only the number
}

// Add to cart buttons
document.querySelectorAll('[data-add-to-cart]').forEach(button=>{
  button.addEventListener('click', ()=>{
    const productId = button.dataset.id;
    const cart = getCart();
    cart[productId] = (cart[productId] || 0) + 1;
    setCart(cart);
    updateCartCount(); // update the badge
  });
});

// Run on page load
updateCartCount();

// Checkout button navigation
const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    window.location.href = 'checkout.html';
  });
}
