/* =========================
   Sellamo — app.js
   Vanilla JS
   - categories + products
   - cart (localStorage)
   - drawer + modal
   - Firebase order
   ========================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// ===== Firebase config =====
const firebaseConfig = {
  apiKey: "AIzaSyBq3-98tHzE5H7mCUKhr4Ci2Lbqb45-tWo",
  authDomain: "sellamo-app.firebaseapp.com",
  projectId: "sellamo-app",
  storageBucket: "sellamo-app.firebasestorage.app",
  messagingSenderId: "568980662203",
  appId: "1:568980662203:web:2c8a7d14025c267e8bc69e",
  measurementId: "G-T6T9NGP3M8"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ===== Products =====
const PRODUCTS = [
  {id:'p1', name:'Express', price:2.5, img:'assets/img/cafe/exp.avif', category:'Café'},
  {id:'p2', name:'Capucin', price:4.0, img:'assets/img/cafe/capss.jpg', category:'Café'},
  {id:'p3', name:'Direct', price:4.3, img:'assets/img/cafe/dir.jpg', category:'Café'},
  {id:'p4', name:'Glacé', price:4.5, img:'assets/img/cafe/glacé.jpg', category:'Café'},
  {id:'p5', name:'Thé Vert', price:2.8, img:'assets/img/the/tea.jpg', category:'Thé'},
  {id:'p6', name:'Thé + Fruit sec', price:2.8, img:'assets/img/the/tea+fruitsec.avif', category:'Thé'},
  {id:'p7', name:'Cafe Turc', price:5.8, img:'assets/img/cafe_armonter/cafe_turc.jpeg', category:'cafe armonter'},
  {id:'p8', name:'Cafee Cappucino Chantillyc', price:6, img:'assets/img/cafe_armonter/cafee_cappucino_chantilly.jpeg', category:'cafe armonter'},
  {id:'p9', name:'Cappuccino', price:6, img:'assets/img/cafe_armonter/cappuccino.jpg', category:'cafe armonter'},
  {id:'p10', name:'Café Caramel', price:6, img:'assets/img/cafe_armonter/caramel.jpeg', category:'cafe armonter'},
  {id:'p11', name:'Café Chocolat', price:6.5, img:'assets/img/cafe_armonter/chocolat.jpg', category:'cafe armonter'},
  {id:'p12', name:'Frappuchino Caramel', price:6.5, img:'assets/img/Frappuchino/caramel.jpeg', category:'Frappuchino'},
  {id:'p13', name:'Frappuchino Nutella', price:6.5, img:'assets/img/Frappuchino/nutella.jpeg', category:'Frappuchino'},
  {id:'p14', name:'Frappuchino Noissete', price:6.5, img:'assets/img/Frappuchino/noissete.jpeg', category:'Frappuchino'},
  {id:'p15', name:'Frappuchino Oreo', price:6.5, img:'assets/img/Frappuchino/oreo.jpeg', category:'Frappuchino'},
  {id:'p16', name:'Frappuchino Snickers', price:6.5, img:'assets/img/Frappuchino/snuikers.jpeg', category:'Frappuchino'},
  {id:'p17', name:'Frappuchino Nutella + Oreo', price:6.5, img:'assets/img/Frappuchino/nutella_oreo.jpeg', category:'Frappuchino'},
  {id:'p18', name:'Glace 2 Boule', price:4.5, img:'assets/img/glace/2_boule.jpeg', category:'Glace'},
  {id:'p19', name:'Glace 3 Boule', price:4.5, img:'assets/img/glace/3_boule.jpeg', category:'Glace'},
  {id:'p20', name:'Glace Speciale', price:4.5, img:'assets/img/glace/speciale.jpeg', category:'Glace'},
  {id:'p21', name:'Water', price:3.5, img:'assets/img/water.jpeg', category:'a boire'},
  {id:'p22', name:'Boisson Gazeuse', price:4.7, img:'assets/img/jus/Boisson_gazeuse.jpeg', category:'a boire'},
  {id:'p23', name:'Jus De Bannen', price:5.7, img:'assets/img/jus/bannen.jpeg', category:'a boire'},
  {id:'p24', name:'Jus De Fraise', price:5.7, img:'assets/img/jus/fraise.jpeg', category:'a boire'},
  {id:'p25', name:'Jus D orange', price:5.7, img:'assets/img/jus/orange.jpeg', category:'a boire'},
  {id:'p26', name:'Coktail', price:7, img:'assets/img/jus/coktail.jpeg', category:'a boire'},
  {id:'p27', name:'Mojito Classique', price:7, img:'assets/img/mojito/classique.jpeg', category:'Mojito'},
  {id:'p28', name:'Mojito Ananas', price:7, img:'assets/img/mojito/ananas.jpeg', category:'Mojito'},
  {id:'p29', name:'Mojito Blue', price:7, img:'assets/img/mojito/blue.jpeg', category:'Mojito'},
  {id:'p30', name:'Mojito Energetic', price:7, img:'assets/img/mojito/energy.jpeg', category:'Mojito'},
  {id:'p31', name:'Mojito Fraise', price:7, img:'assets/img/mojito/FRAISE.jpeg', category:'Mojito'},
  {id:'p32', name:'Crépe Sallami', price:7, img:'assets/img/sale/sallami.jpeg', category:'Nos Salée'},
  {id:'p33', name:'Crépe Thon', price:7, img:'assets/img/sale/thon.jpeg', category:'Nos Salée'},
  {id:'p34', name:'Panin Jombon', price:7, img:'assets/img/sale/Pjombon.jpeg', category:'Nos Salée'},
  {id:'p35', name:'Panin Sallami', price:7, img:'assets/img/sale/sallami.jpeg', category:'Nos Salée'},
  {id:'p36', name:'Crepe Chocolat', price:7, img:'assets/img/sucree/crepe.jpg', category:'Nos Sucrée'},
  {id:'p37', name:'Crepe Chocolat + Fruit Sec', price:7, img:'assets/img/sucree/fruit.jpeg', category:'Nos Sucrée'},
  {id:'p38', name:'Gauffre Chocolat', price:7, img:'assets/img/sucree/gaufres_nutella.jpeg', category:'Nos Sucrée'},
  {id:'p39', name:'Gauffre Chocolat + Fruit Sec', price:7, img:'assets/img/sucree/gauffre_fruit_sec.jpeg', category:'Nos Sucrée'}
];


// ===== DOM =====
const catalogEl = document.getElementById('catalog');
const categoryTabs = document.getElementById('categoryTabs');
const searchInput = document.getElementById('search');
const cartBtn = document.getElementById('openCart');
const cartDrawer = document.getElementById('cartDrawer');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const cartCountEl = document.getElementById('cartCount');
const closeCartBtn = document.getElementById('closeCart');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const cancelCheckout = document.getElementById('cancelCheckout');
const confirmCheckout = document.getElementById('confirmCheckout');
const tableNumberInput = document.getElementById('tableNumber');
const toastEl = document.getElementById('toast');

// ===== State =====
const CART_KEY = 'sellamo_cart_v1';

// السلة دايمًا فارغة
function loadCart(){ 
  return []; 
}

let cart = loadCart(); // تعريف مرة واحدة
saveCart(); // يعرض السلة الفارغة مباشرة
function saveCart(){ 
  localStorage.setItem(CART_KEY, JSON.stringify(cart)); 
  renderCart(); 
  updateBadge(); 
}
function updateBadge(){ 
  cartCountEl.textContent = cart.reduce((s,i)=> s+i.qty,0); 
}
function formatDT(v){ return v.toFixed(2)+' DT'; }
function toast(msg, ms=1700){ 
  clearTimeout(toastEl._t); 
  toastEl.textContent = msg; 
  toastEl.classList.add('show'); 
  toastEl._t = setTimeout(()=>toastEl.classList.remove('show'), ms); 
}

// ===== Cart Operations =====
function addToCart(pid){
  const existing = cart.find(i=>i.id===pid);
  const p = PRODUCTS.find(x=>x.id===pid);
  if(!p) return;
  if(existing) existing.qty++; 
  else cart.push({id:p.id, name:p.name, price:p.price, img:p.img, qty:1, comment:''});
  saveCart(); 
  toast('Ajouté au panier ✅');
}
function removeFromCart(id){ 
  cart = cart.filter(i=>i.id!==id); 
  saveCart(); 
}
function changeQty(id, delta){ 
  const it = cart.find(i=>i.id===id); 
  if(!it) return; 
  it.qty = Math.max(1, it.qty + delta); 
  saveCart(); 
}
function cartTotal(){ 
  return cart.reduce((s,i)=> s + i.price*i.qty, 0); 
}

// ===== Render Categories & Catalog =====
function renderCategories(){
  const cats = Array.from(new Set(PRODUCTS.map(p=>p.category)));
  categoryTabs.innerHTML = ''; 
  categoryTabs.appendChild(createTab('Tous'));
  cats.forEach(c=>categoryTabs.appendChild(createTab(c)));
  setActiveTab('Tous');
}
function createTab(name){
  const b = document.createElement('button'); 
  b.className='tab'; 
  b.textContent = name;
  b.addEventListener('click', ()=>{ setActiveTab(name); filterByCategory(name); });
  return b;
}
function setActiveTab(name){ 
  Array.from(categoryTabs.children).forEach(btn=>btn.classList.toggle('active', btn.textContent===name)); 
}
function filterByCategory(cat){ 
  renderCatalog(cat && cat!=='Tous' ? PRODUCTS.filter(p=>p.category===cat) : PRODUCTS); 
}
function renderCatalog(list=PRODUCTS){
  if(!list.length){ 
    catalogEl.innerHTML = '<div class="muted">Aucun produit trouvé.</div>'; 
    return; 
  }
  const groups = {};
  list.forEach(p=>{ if(!groups[p.category]) groups[p.category]=[]; groups[p.category].push(p); });
  catalogEl.innerHTML = Object.keys(groups).map(cat=>{
    const cards = groups[cat].map(p=>`
      <article class="card">
        <img class="card__img" src="${p.img}" alt="${p.name}">
        <div class="card__meta">
          <div class="card__title">${p.name}</div>
          <div class="card__price">${formatDT(p.price)}</div>
        </div>
        <div class="card__foot">
          <button class="btn btn--primary add-btn" data-id="${p.id}">Ajouter au panier</button>
        </div>
      </article>`).join('');
    return `<section class="catalog-section"><h2>${cat}</h2><div class="grid">${cards}</div></section>`;
  }).join('');
  document.querySelectorAll('.add-btn').forEach(b=>b.addEventListener('click', e=>addToCart(e.currentTarget.dataset.id)));
}

// ===== Cart Rendering =====
function renderCart(){
  if(!cartItemsEl) return;

  if(!cart.length){
    cartItemsEl.innerHTML = '<div style="padding:12px;color:#666;">Panier vide.</div>';
    cartTotalEl.textContent = '0.00 DT';
    updateBadge();
    return;
  }

  cartItemsEl.innerHTML = cart.map(i=>`
    <div class="cart-item" data-id="${i.id}">
      <img src="${i.img}" alt="${i.name}">
      <div class="cart-item-info">
        <div class="title">${i.name}</div>
        <div class="muted">${formatDT(i.price)}</div>
        <textarea class="comment" placeholder="Commentaire">${i.comment||''}</textarea>
        <div class="cart-item-row">
          <div class="qty">
            <button data-act="dec" data-id="${i.id}">−</button>
            <span>${i.qty}</span>
            <button data-act="inc" data-id="${i.id}">+</button>
          </div>
          <button class="remove" data-act="rm" data-id="${i.id}">Supprimer</button>
        </div>
      </div>
    </div>
  `).join('');

  cartItemsEl.querySelectorAll('button').forEach(b=>{
    const id = b.dataset.id, act = b.dataset.act;
    b.addEventListener('click', ()=>{
      const commentEl = b.closest('.cart-item').querySelector('.comment');
      const item = cart.find(it => it.id===id);
      if(item && commentEl) item.comment = commentEl.value;

      if(act==='inc') changeQty(id,1);
      else if(act==='dec') changeQty(id,-1);
      else if(act==='rm') removeFromCart(id);
    });
  });

  cartTotalEl.textContent = formatDT(cartTotal());
  updateBadge();
}

// ===== Drawer =====
cartBtn.addEventListener('click', ()=>{
  const open = !cartDrawer.classList.contains('open');
  cartDrawer.classList.toggle('open', open);
  cartDrawer.setAttribute('aria-hidden', !open);
  if(open) renderCart();
});
closeCartBtn && closeCartBtn.addEventListener('click', ()=>{
  cartDrawer.classList.remove('open');
  cartDrawer.setAttribute('aria-hidden', true);
});

// ===== Search =====
searchInput.addEventListener('input', e=>{
  const q = e.target.value.trim().toLowerCase();
  renderCatalog(!q ? PRODUCTS : PRODUCTS.filter(p=>
    p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  ));
});

// ===== Firebase Order =====
async function sendOrderToFirebase(order){
  try {
    const docRef = await addDoc(collection(db,"orders"), {...order, createdAt: serverTimestamp()});
    console.log("✅ Commande envoyée à Firebase ID:", docRef.id);
    return {ok:true, id:docRef.id};
  } catch(e){
    console.error("❌ Erreur Firebase:", e);
    throw e;
  }
}

// ===== Checkout =====
checkoutBtn.addEventListener('click', ()=>{
  if(!cart.length){ toast('Panier vide'); return; }
  cartDrawer.classList.remove('open');
  cartDrawer.setAttribute('aria-hidden', true);
  checkoutModal.classList.add('open');
  tableNumberInput && tableNumberInput.focus();
});
cancelCheckout && cancelCheckout.addEventListener('click', ()=> checkoutModal.classList.remove('open'));
confirmCheckout && confirmCheckout.addEventListener('click', async ()=>{
  const table = parseInt(tableNumberInput.value,10);
  if(!table || table<1){ toast('أدخل رقم الطاولة صحيح'); return; }
  const method = document.querySelector('input[name="pay"]:checked')?.value || 'cash';
  cart.forEach(i=>{
    const el = cartItemsEl.querySelector(`.cart-item[data-id="${i.id}"] .comment`);
    if(el) i.comment = el.value;
  });
  const items = cart.map(i=>({id:i.id, name:i.name, price:i.price, qty:i.qty, comment:i.comment||''}));
  const total = cartTotal();
  const order = {id:'ord_'+Date.now(), table, items, total, method, paid: method==='online'?false:false};

  try{
    if(method==='online'){
      const confirmPay = confirm(`Vous allez payer ${total.toFixed(2)} DT en ligne. Confirmer ?`);
      if(!confirmPay){ toast('Paiement annulé'); return; }
      order.paid = true;
      toast('✅ Paiement en ligne effectué !');
    }
    await sendOrderToFirebase(order);
    toast('✅ Commande envoyée au serveur !');
    cart=[]; saveCart(); checkoutModal.classList.remove('open');
  } catch(e){
    toast('❌ Erreur envoi Firebase'); console.error(e);
  }
});

// ===== Init =====
renderCategories();
renderCatalog();
renderCart();
updateBadge();
