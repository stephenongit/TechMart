/**
 * TechMart — Next-Gen E-Commerce Main Application Logic
 * Pure Vanilla JavaScript implementation with full localStorage persistence.
 */

class TechMartApp {
  constructor() {
    // State variables
    this.products = PRODUCTS_DATA;
    this.cart = this.loadFromStorage('techmart_cart', [
      // Preload with 2 popular sample items so the cart is immediately engaging to explore
      { id: 'ph-01', quantity: 1, color: 'Natural Titanium' },
      { id: 'aud-01', quantity: 1, color: 'Midnight Black' }
    ]);
    this.wishlist = this.loadFromStorage('techmart_wishlist', ['lap-01', 'app-01']);
    this.currency = this.loadFromStorage('techmart_currency', 'USD');
    this.theme = this.loadFromStorage('techmart_theme', 'dark');
    this.user = this.loadFromStorage('techmart_user', null);

    // Filter states
    this.filters = {
      category: 'all',
      brand: 'all',
      maxPrice: 4000,
      minRating: 0,
      inStockOnly: false,
      onSaleOnly: false,
      searchQuery: '',
      sortBy: 'featured',
      viewMode: 'grid'
    };

    // Discounts
    this.appliedCoupon = null;
    this.coupons = {
      'TECH20': { type: 'percent', value: 0.20, label: '20% OFF Tech Deal' },
      'TECH15': { type: 'percent', value: 0.15, label: '15% OFF Special' },
      'WELCOME50': { type: 'flat', value: 50, label: '$50 Welcome Bonus' },
      'CYBER10': { type: 'percent', value: 0.10, label: '10% OFF Gadgets' }
    };

    // Slider state
    this.currentSlide = 0;
    this.slideInterval = null;

    // Quick view state
    this.quickViewProductItem = null;
    this.quickViewQty = 1;
    this.quickViewColor = null;

    // Checkout state
    this.currentCheckoutStep = 1;

    // Initialize application
    this.init();
  }

  // --- LOCAL STORAGE HELPERS ---
  loadFromStorage(key, defaultValue) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.warn(`Error reading ${key} from storage:`, e);
      return defaultValue;
    }
  }

  saveToStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`Error saving ${key} to storage:`, e);
    }
  }

  // --- INITIALIZATION ---
  init() {
    this.applyTheme(this.theme);
    this.initCurrency();
    this.initHeroSlider();
    this.initDealsCountdown();
    this.renderCategoryPills();
    this.renderBrandFilters();
    this.renderProducts();
    this.renderFlashDeals();
    this.updateCartUI();
    this.updateWishlistUI();
    this.initEventListeners();
    this.updateUserUI();
  }

  // --- THEME MANAGEMENT ---
  applyTheme(theme) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    this.saveToStorage('techmart_theme', theme);
  }

  toggleTheme() {
    const nextTheme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme(nextTheme);
    this.showToast(`Switched to ${nextTheme} mode`, 'info');
  }

  // --- CURRENCY CONVERSION ---
  initCurrency() {
    const select = document.getElementById('currencySelect');
    const mobileSelect = document.getElementById('mobileCurrencySelect');
    if (select) select.value = this.currency;
    if (mobileSelect) mobileSelect.value = this.currency;
  }

  setCurrency(curr) {
    if (!CURRENCIES[curr]) return;
    this.currency = curr;
    this.saveToStorage('techmart_currency', curr);

    // Sync select dropdowns
    const select = document.getElementById('currencySelect');
    const mobileSelect = document.getElementById('mobileCurrencySelect');
    if (select) select.value = curr;
    if (mobileSelect) mobileSelect.value = curr;

    this.renderProducts();
    this.renderFlashDeals();
    this.updateCartUI();
    this.updateWishlistUI();
    this.updateHeroPrices();
    this.showToast(`Currency changed to ${curr} (${CURRENCIES[curr].symbol})`, 'info');
  }

  formatPrice(amountInUSD) {
    const curr = CURRENCIES[this.currency] || CURRENCIES.USD;
    const converted = amountInUSD * curr.rate;
    
    // Formatting with commas
    const formattedNum = converted.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
    return `${curr.symbol}${formattedNum}`;
  }

  updateHeroPrices() {
    document.querySelectorAll('.hero-price .price-value').forEach(el => {
      const base = parseFloat(el.getAttribute('data-base-price'));
      if (base) {
        el.textContent = this.formatPrice(base);
      }
    });
  }

  // --- HERO SLIDER ---
  initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('#heroDots .dot');
    if (!slides.length) return;

    this.showSlide = (index) => {
      slides.forEach((s, i) => s.classList.toggle('active', i === index));
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
      this.currentSlide = index;
    };

    const nextSlide = () => {
      let next = (this.currentSlide + 1) % slides.length;
      this.showSlide(next);
    };

    const prevSlide = () => {
      let prev = (this.currentSlide - 1 + slides.length) % slides.length;
      this.showSlide(prev);
    };

    document.getElementById('heroNextBtn')?.addEventListener('click', () => {
      this.resetSlideInterval();
      nextSlide();
    });

    document.getElementById('heroPrevBtn')?.addEventListener('click', () => {
      this.resetSlideInterval();
      prevSlide();
    });

    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const slideIdx = parseInt(e.target.getAttribute('data-slide'));
        this.resetSlideInterval();
        this.showSlide(slideIdx);
      });
    });

    // Auto rotate every 6.5 seconds
    this.startSlideInterval = () => {
      this.slideInterval = setInterval(nextSlide, 6500);
    };

    this.resetSlideInterval = () => {
      clearInterval(this.slideInterval);
      this.startSlideInterval();
    };

    this.startSlideInterval();
    this.updateHeroPrices();
  }

  // --- FLASH DEALS COUNTDOWN TIMER ---
  initDealsCountdown() {
    // End time 8 hours 42 minutes from now, persistent for realism
    let endTime = sessionStorage.getItem('techmart_deal_end');
    if (!endTime) {
      endTime = Date.now() + (8 * 3600 + 42 * 60 + 15) * 1000;
      sessionStorage.setItem('techmart_deal_end', endTime);
    } else {
      endTime = parseInt(endTime);
    }

    const updateTimer = () => {
      const now = Date.now();
      let diff = Math.max(0, endTime - now);

      if (diff <= 0) {
        // Reset 24-hr loop
        endTime = Date.now() + 24 * 3600 * 1000;
        sessionStorage.setItem('techmart_deal_end', endTime);
        diff = 24 * 3600 * 1000;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      const hEl = document.getElementById('timerHours');
      const mEl = document.getElementById('timerMins');
      const sEl = document.getElementById('timerSecs');

      if (hEl) hEl.textContent = String(hours).padStart(2, '0');
      if (mEl) mEl.textContent = String(mins).padStart(2, '0');
      if (sEl) sEl.textContent = String(secs).padStart(2, '0');
    };

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  // --- FLASH DEALS RENDERING ---
  renderFlashDeals() {
    const container = document.getElementById('flashDealsGrid');
    if (!container) return;

    const deals = this.products.filter(p => p.flashSale).slice(0, 4);

    container.innerHTML = deals.map(product => {
      const isWishlisted = this.wishlist.includes(product.id);
      const discountPct = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
      const soldPct = Math.min(92, Math.max(60, Math.floor(product.rating * 18)));

      return `
        <div class="product-card deal-card">
          <div class="product-image-box">
            <span class="card-badge badge-deal">-${discountPct}% OFF</span>
            <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
            <div class="card-hover-actions">
              <button class="card-action-icon ${isWishlisted ? 'active' : ''}" 
                      onclick="app.toggleWishlist('${product.id}', this)" 
                      title="Save to Wishlist">
                <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
              </button>
              <button class="card-action-icon" 
                      onclick="app.quickViewProduct('${product.id}')" 
                      title="Quick Specs">
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>
          <div class="product-card-body">
            <span class="product-brand">${product.brand}</span>
            <h3 class="product-name" onclick="app.quickViewProduct('${product.id}')">${product.name}</h3>
            
            <div class="stock-progress-wrap">
              <div class="stock-text-row">
                <span>Claimed: ${soldPct}%</span>
                <span>Only ${product.stockCount} left</span>
              </div>
              <div class="stock-progress-bar">
                <div class="stock-progress-fill" style="width: ${soldPct}%"></div>
              </div>
            </div>

            <div class="product-card-footer">
              <div class="product-pricing">
                <span class="current-price">${this.formatPrice(product.price)}</span>
                <span class="original-price">${this.formatPrice(product.originalPrice)}</span>
              </div>
              <button class="add-cart-btn" onclick="app.addToCart('${product.id}')">
                <i class="fa-solid fa-cart-plus"></i> Add
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- CATEGORIES & BRANDS RENDER ---
  renderCategoryPills() {
    const pillsContainer = document.getElementById('categoryPills');
    const mobileCatContainer = document.getElementById('mobileNavCategories');
    const sidebarCatContainer = document.getElementById('categoryFilterList');

    if (pillsContainer) {
      pillsContainer.innerHTML = CATEGORIES.map(cat => `
        <li class="cat-pill ${this.filters.category === cat.id ? 'active' : ''}" 
            onclick="app.filterByCategory('${cat.id}')">
          <i class="${cat.icon}"></i> ${cat.name}
        </li>
      `).join('');
    }

    if (mobileCatContainer) {
      mobileCatContainer.innerHTML = CATEGORIES.map(cat => `
        <li class="${this.filters.category === cat.id ? 'active' : ''}" 
            onclick="app.filterByCategory('${cat.id}'); app.toggleMobileDrawer(false);">
          <i class="${cat.icon}"></i> ${cat.name}
        </li>
      `).join('');
    }

    if (sidebarCatContainer) {
      sidebarCatContainer.innerHTML = CATEGORIES.map(cat => {
        const count = cat.id === 'all' 
          ? this.products.length 
          : this.products.filter(p => p.category === cat.id).length;

        return `
          <div class="category-filter-item ${this.filters.category === cat.id ? 'active' : ''}" 
               onclick="app.filterByCategory('${cat.id}')">
            <span><i class="${cat.icon}"></i> ${cat.name}</span>
            <span class="count-badge">${count}</span>
          </div>
        `;
      }).join('');
    }
  }

  renderBrandFilters() {
    const brandContainer = document.getElementById('brandFilterList');
    if (!brandContainer) return;

    // Get unique brands
    const brands = ['all', ...new Set(this.products.map(p => p.brand))];

    brandContainer.innerHTML = brands.map(brand => `
      <label class="custom-radio">
        <input type="radio" name="brandFilter" value="${brand}" 
               ${this.filters.brand === brand ? 'checked' : ''} 
               onchange="app.filterByBrand('${brand}')">
        <span>${brand === 'all' ? 'All Brands' : brand}</span>
      </label>
    `).join('');
  }

  // --- CATALOG FILTERING & RENDERING ---
  filterByCategory(categoryId) {
    this.filters.category = categoryId;
    this.renderCategoryPills();
    this.renderProducts();
    
    // Update Section Title
    const titleEl = document.getElementById('catalogSectionTitle');
    if (titleEl) {
      const match = CATEGORIES.find(c => c.id === categoryId);
      titleEl.textContent = match && match.id !== 'all' ? match.name : 'All Electronic Devices';
    }

    // Scroll smoothly to catalog section
    const catalogSec = document.getElementById('catalog');
    if (catalogSec) {
      catalogSec.scrollIntoView({ behavior: 'smooth' });
    }
  }

  filterByBrand(brand) {
    this.filters.brand = brand;
    this.renderProducts();
  }

  resetAllFilters() {
    this.filters = {
      category: 'all',
      brand: 'all',
      maxPrice: 4000,
      minRating: 0,
      inStockOnly: false,
      onSaleOnly: false,
      searchQuery: '',
      sortBy: 'featured',
      viewMode: this.filters.viewMode
    };

    // Reset controls in DOM
    const priceRange = document.getElementById('priceRange');
    if (priceRange) priceRange.value = 4000;
    const priceDisplay = document.getElementById('priceDisplay');
    if (priceDisplay) priceDisplay.textContent = '$4,000';

    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
    const clearBtn = document.getElementById('clearSearchBtn');
    if (clearBtn) clearBtn.style.display = 'none';

    const inStock = document.getElementById('inStockFilter');
    if (inStock) inStock.checked = false;

    const onSale = document.getElementById('onSaleFilter');
    if (onSale) onSale.checked = false;

    const sortSelect = document.getElementById('catalogSortSelect');
    if (sortSelect) sortSelect.value = 'featured';

    const ratingRadios = document.querySelectorAll('input[name="ratingFilter"]');
    ratingRadios.forEach(r => r.checked = r.value === '0');

    this.renderCategoryPills();
    this.renderBrandFilters();
    this.renderProducts();
    this.showToast('All filters reset', 'info');
  }

  getFilteredProducts() {
    return this.products.filter(product => {
      // Category filter
      if (this.filters.category !== 'all' && product.category !== this.filters.category) {
        return false;
      }
      // Brand filter
      if (this.filters.brand !== 'all' && product.brand !== this.filters.brand) {
        return false;
      }
      // Price filter
      if (product.price > this.filters.maxPrice) {
        return false;
      }
      // Rating filter
      if (this.filters.minRating > 0 && product.rating < this.filters.minRating) {
        return false;
      }
      // Stock filter
      if (this.filters.inStockOnly && !product.inStock) {
        return false;
      }
      // On sale filter
      if (this.filters.onSaleOnly && (!product.originalPrice || product.originalPrice <= product.price)) {
        return false;
      }
      // Search query filter
      if (this.filters.searchQuery.trim() !== '') {
        const q = this.filters.searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesDesc = product.shortDesc.toLowerCase().includes(q);
        const matchesSpecs = Object.values(product.specs).some(val => val.toLowerCase().includes(q));
        if (!matchesName && !matchesBrand && !matchesDesc && !matchesSpecs) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      switch (this.filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'featured':
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });
  }

  renderProducts() {
    const container = document.getElementById('productsGrid');
    const emptyState = document.getElementById('catalogEmptyState');
    const countPill = document.getElementById('catalogCountPill');
    const tagsContainer = document.getElementById('activeFilterTags');

    if (!container) return;

    const filtered = this.getFilteredProducts();

    // Update count pill
    if (countPill) {
      countPill.textContent = `${filtered.length} Product${filtered.length === 1 ? '' : 's'} Found`;
    }

    // Render active filter badges
    if (tagsContainer) {
      let activeTagsHtml = [];
      if (this.filters.category !== 'all') {
        const cat = CATEGORIES.find(c => c.id === this.filters.category);
        activeTagsHtml.push(`
          <span class="filter-tag-pill">
            ${cat ? cat.name : this.filters.category} 
            <button onclick="app.filterByCategory('all')"><i class="fa-solid fa-xmark"></i></button>
          </span>
        `);
      }
      if (this.filters.brand !== 'all') {
        activeTagsHtml.push(`
          <span class="filter-tag-pill">
            Brand: ${this.filters.brand} 
            <button onclick="app.filterByBrand('all')"><i class="fa-solid fa-xmark"></i></button>
          </span>
        `);
      }
      if (this.filters.maxPrice < 4000) {
        activeTagsHtml.push(`
          <span class="filter-tag-pill">
            Under $${this.filters.maxPrice} 
            <button onclick="document.getElementById('priceRange').value=4000; app.filters.maxPrice=4000; document.getElementById('priceDisplay').textContent='$4,000'; app.renderProducts();"><i class="fa-solid fa-xmark"></i></button>
          </span>
        `);
      }
      if (this.filters.searchQuery) {
        activeTagsHtml.push(`
          <span class="filter-tag-pill">
            "${this.filters.searchQuery}" 
            <button onclick="app.clearSearch()"><i class="fa-solid fa-xmark"></i></button>
          </span>
        `);
      }

      tagsContainer.innerHTML = activeTagsHtml.join('');
    }

    // Toggle Empty State
    if (filtered.length === 0) {
      container.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
      return;
    } else {
      container.style.display = 'grid';
      if (emptyState) emptyState.style.display = 'none';
    }

    // Toggle list view class
    if (this.filters.viewMode === 'list') {
      container.classList.add('list-view');
    } else {
      container.classList.remove('list-view');
    }

    // Render cards
    container.innerHTML = filtered.map(product => {
      const isWishlisted = this.wishlist.includes(product.id);
      
      // Badges
      let badgeHtml = '';
      if (product.badge) {
        const isBestseller = product.badge.toLowerCase().includes('bestseller');
        const isNew = product.badge.toLowerCase().includes('new') || product.badge.toLowerCase().includes('copilot');
        badgeHtml = `<span class="card-badge ${isBestseller ? 'badge-bestseller' : isNew ? 'badge-new' : ''}">${product.badge}</span>`;
      }

      // Specs tags (take top 2 specs for quick pill display)
      const specEntries = Object.entries(product.specs).slice(0, 2);
      const specsPills = specEntries.map(([key, val]) => `
        <span class="spec-pill" title="${key}: ${val}">${val.length > 25 ? val.substring(0, 25) + '…' : val}</span>
      `).join('');

      return `
        <div class="product-card" id="card-${product.id}">
          <div class="product-image-box">
            ${badgeHtml}
            <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
            <div class="card-hover-actions">
              <button class="card-action-icon ${isWishlisted ? 'active' : ''}" 
                      onclick="app.toggleWishlist('${product.id}', this)" 
                      title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}">
                <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
              </button>
              <button class="card-action-icon" 
                      onclick="app.quickViewProduct('${product.id}')" 
                      title="Quick Specifications">
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>
          <div class="product-card-body">
            <span class="product-brand">${product.brand}</span>
            <h3 class="product-name" onclick="app.quickViewProduct('${product.id}')">${product.name}</h3>
            
            <div class="product-rating">
              <div class="stars-wrap">
                ${this.renderStars(product.rating)}
              </div>
              <span class="rating-count">(${product.reviewCount})</span>
            </div>

            <div class="specs-tags">
              ${specsPills}
            </div>

            <div class="product-card-footer">
              <div class="product-pricing">
                <span class="current-price">${this.formatPrice(product.price)}</span>
                ${product.originalPrice ? `<span class="original-price">${this.formatPrice(product.originalPrice)}</span>` : ''}
              </div>
              <button class="add-cart-btn" onclick="app.addToCart('${product.id}', 1, null, this)">
                <i class="fa-solid fa-cart-plus"></i> Add to Cart
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  renderStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars += '<i class="fa-solid fa-star"></i>';
      } else if (rating >= i - 0.5) {
        stars += '<i class="fa-solid fa-star-half-stroke"></i>';
      } else {
        stars += '<i class="fa-regular fa-star"></i>';
      }
    }
    return stars;
  }

  // --- LIVE SEARCH & AUTOCOMPLETE ---
  handleSearchInput(value) {
    const clearBtn = document.getElementById('clearSearchBtn');
    const dropdown = document.getElementById('searchDropdown');
    const query = value.trim().toLowerCase();

    if (clearBtn) {
      clearBtn.style.display = query.length > 0 ? 'block' : 'none';
    }

    if (!dropdown) return;

    if (query.length < 2) {
      dropdown.classList.remove('active');
      dropdown.innerHTML = '';
      return;
    }

    const matches = this.products.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.brand.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query)
    ).slice(0, 5);

    if (matches.length === 0) {
      dropdown.innerHTML = `
        <div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
          No tech hardware found for "<strong>${value}</strong>"
        </div>
      `;
      dropdown.classList.add('active');
      return;
    }

    dropdown.innerHTML = matches.map(item => `
      <div class="search-dropdown-item" onclick="app.selectSearchResult('${item.id}')">
        <img src="${item.images[0]}" alt="${item.name}" class="search-drop-thumb">
        <div class="search-drop-info">
          <div class="search-drop-name">${item.name}</div>
          <div class="search-drop-cat">${item.brand} • ${item.category.toUpperCase()}</div>
        </div>
        <div class="search-drop-price">${this.formatPrice(item.price)}</div>
      </div>
    `).join('');

    dropdown.classList.add('active');
  }

  clearSearch() {
    const input = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearchBtn');
    const dropdown = document.getElementById('searchDropdown');
    if (input) input.value = '';
    if (clearBtn) clearBtn.style.display = 'none';
    if (dropdown) dropdown.classList.remove('active');
    this.filters.searchQuery = '';
    this.renderProducts();
  }

  selectSearchResult(productId) {
    const dropdown = document.getElementById('searchDropdown');
    if (dropdown) dropdown.classList.remove('active');
    this.quickViewProduct(productId);
  }

  // --- SHOPPING CART MANAGEMENT ---
  addToCart(productId, quantity = 1, color = null, triggerBtn = null) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = this.cart.findIndex(item => item.id === productId && (!color || item.color === color));

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        id: productId,
        quantity: quantity,
        color: color || (product.colors ? product.colors[0] : null)
      });
    }

    this.saveToStorage('techmart_cart', this.cart);
    this.updateCartUI();

    // Button animation feedback
    if (triggerBtn) {
      const origHtml = triggerBtn.innerHTML;
      triggerBtn.innerHTML = '<i class="fa-solid fa-check"></i> Added!';
      triggerBtn.style.background = 'var(--success)';
      triggerBtn.style.color = '#fff';
      setTimeout(() => {
        triggerBtn.innerHTML = origHtml;
        triggerBtn.style.background = '';
        triggerBtn.style.color = '';
      }, 1200);
    }

    this.showToast(`Added <strong>${product.name}</strong> to cart!`, 'success');
  }

  updateCartQuantity(index, delta) {
    if (this.cart[index]) {
      this.cart[index].quantity += delta;
      if (this.cart[index].quantity <= 0) {
        this.cart.splice(index, 1);
        this.showToast('Item removed from cart', 'info');
      }
      this.saveToStorage('techmart_cart', this.cart);
      this.updateCartUI();
    }
  }

  removeFromCart(index) {
    if (this.cart[index]) {
      const product = this.products.find(p => p.id === this.cart[index].id);
      this.cart.splice(index, 1);
      this.saveToStorage('techmart_cart', this.cart);
      this.updateCartUI();
      this.showToast(`Removed <strong>${product ? product.name : 'item'}</strong>`, 'info');
    }
  }

  clearCart() {
    if (this.cart.length === 0) return;
    this.cart = [];
    this.appliedCoupon = null;
    this.saveToStorage('techmart_cart', this.cart);
    this.updateCartUI();
    this.showToast('Shopping cart cleared', 'info');
  }

  applyCouponCode(code) {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      this.showToast('Please enter a coupon code', 'warning');
      return;
    }

    if (this.coupons[cleanCode]) {
      this.appliedCoupon = cleanCode;
      this.updateCartUI();
      this.showToast(`Coupon <strong>${cleanCode}</strong> applied successfully!`, 'success');
    } else {
      this.showToast(`Invalid coupon code. Try <strong>TECH20</strong> for 20% off!`, 'error');
    }
  }

  removeCoupon() {
    this.appliedCoupon = null;
    this.updateCartUI();
    this.showToast('Coupon removed', 'info');
  }

  calculateCartTotals() {
    let subtotal = 0;
    let itemCount = 0;

    this.cart.forEach(item => {
      const product = this.products.find(p => p.id === item.id);
      if (product) {
        subtotal += product.price * item.quantity;
        itemCount += item.quantity;
      }
    });

    let discount = 0;
    if (this.appliedCoupon && this.coupons[this.appliedCoupon]) {
      const coup = this.coupons[this.appliedCoupon];
      if (coup.type === 'percent') {
        discount = subtotal * coup.value;
      } else if (coup.type === 'flat') {
        discount = Math.min(subtotal, coup.value);
      }
    }

    const discountedSubtotal = Math.max(0, subtotal - discount);
    const shipping = discountedSubtotal > 150 || subtotal === 0 ? 0 : 25;
    const tax = discountedSubtotal * 0.08; // 8% estimated tax
    const grandTotal = discountedSubtotal + shipping + tax;

    return {
      subtotal,
      discount,
      shipping,
      tax,
      grandTotal,
      itemCount
    };
  }

  updateCartUI() {
    const totals = this.calculateCartTotals();

    // Badges in header
    const cartCountEl = document.getElementById('cartCount');
    const headerCartTotalEl = document.getElementById('headerCartTotal');
    const drawerTotalItemsEl = document.getElementById('cartDrawerTotalItems');

    if (cartCountEl) cartCountEl.textContent = totals.itemCount;
    if (headerCartTotalEl) headerCartTotalEl.textContent = this.formatPrice(totals.grandTotal);
    if (drawerTotalItemsEl) drawerTotalItemsEl.textContent = totals.itemCount;

    // Free shipping progress bar ($150 target)
    const goalThreshold = 150;
    const shippingFill = document.getElementById('freeShippingFill');
    const shippingText = document.getElementById('freeShippingText');

    if (shippingFill && shippingText) {
      if (totals.subtotal === 0) {
        shippingFill.style.width = '0%';
        shippingText.innerHTML = `Add <strong>${this.formatPrice(150)}</strong> more to get FREE Express Delivery!`;
      } else if (totals.subtotal >= goalThreshold) {
        shippingFill.style.width = '100%';
        shippingText.innerHTML = `<span style="color: var(--success);"><i class="fa-solid fa-circle-check"></i> Congratulations! You unlocked FREE Express Delivery!</span>`;
      } else {
        const remaining = goalThreshold - totals.subtotal;
        const pct = Math.min(100, Math.round((totals.subtotal / goalThreshold) * 100));
        shippingFill.style.width = `${pct}%`;
        shippingText.innerHTML = `Add <strong>${this.formatPrice(remaining)}</strong> more to get FREE Express Delivery!`;
      }
    }

    // Cart Items Container
    const container = document.getElementById('cartItemsContainer');
    const footer = document.getElementById('cartFooter');

    if (!container) return;

    if (this.cart.length === 0) {
      container.innerHTML = `
        <div class="empty-cart-view">
          <i class="fa-solid fa-bag-shopping"></i>
          <h4>Your cart is empty</h4>
          <p>Explore laptops, smartphones, and appliances to add items.</p>
          <button class="btn btn-primary" onclick="app.toggleCart(false); app.filterByCategory('all');" style="margin-top: 14px;">
            Start Shopping
          </button>
        </div>
      `;
      if (footer) footer.style.display = 'none';
      return;
    }

    if (footer) footer.style.display = 'block';

    container.innerHTML = this.cart.map((item, index) => {
      const product = this.products.find(p => p.id === item.id);
      if (!product) return '';

      const lineTotal = product.price * item.quantity;

      return `
        <div class="cart-item">
          <img src="${product.images[0]}" alt="${product.name}" class="cart-item-img">
          <div class="cart-item-info">
            <h4 class="cart-item-title">${product.name}</h4>
            ${item.color ? `<div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 2px;">Color: ${item.color}</div>` : ''}
            <div class="cart-item-price">${this.formatPrice(lineTotal)}</div>
            <div class="cart-item-controls">
              <div class="qty-counter">
                <button type="button" onclick="app.updateCartQuantity(${index}, -1)" aria-label="Decrease quantity">
                  <i class="fa-solid fa-minus"></i>
                </button>
                <input type="text" value="${item.quantity}" readonly>
                <button type="button" onclick="app.updateCartQuantity(${index}, 1)" aria-label="Increase quantity">
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
              <button class="cart-remove-item" onclick="app.removeFromCart(${index})" title="Remove item">
                <i class="fa-regular fa-trash-can"></i> Remove
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Summary breakdown
    const subtotalEl = document.getElementById('cartSubtotal');
    const discountRow = document.getElementById('cartDiscountRow');
    const discountEl = document.getElementById('cartDiscount');
    const shippingEl = document.getElementById('cartShipping');
    const taxEl = document.getElementById('cartTax');
    const grandTotalEl = document.getElementById('cartGrandTotal');

    if (subtotalEl) subtotalEl.textContent = this.formatPrice(totals.subtotal);

    if (discountRow && discountEl) {
      if (totals.discount > 0) {
        discountRow.style.display = 'flex';
        discountEl.textContent = `-${this.formatPrice(totals.discount)}`;
      } else {
        discountRow.style.display = 'none';
      }
    }

    if (shippingEl) {
      shippingEl.textContent = totals.shipping === 0 ? 'FREE' : this.formatPrice(totals.shipping);
      shippingEl.style.color = totals.shipping === 0 ? 'var(--success)' : 'inherit';
    }

    if (taxEl) taxEl.textContent = this.formatPrice(totals.tax);
    if (grandTotalEl) grandTotalEl.textContent = this.formatPrice(totals.grandTotal);

    // Coupon pill in footer
    const couponPill = document.getElementById('appliedCouponPill');
    const couponCodeTag = document.getElementById('appliedCouponCode');
    if (couponPill && couponCodeTag) {
      if (this.appliedCoupon) {
        couponPill.style.display = 'flex';
        couponCodeTag.textContent = this.appliedCoupon;
      } else {
        couponPill.style.display = 'none';
      }
    }
  }

  // --- WISHLIST MANAGEMENT ---
  toggleWishlist(productId, btnEl = null) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;

    const idx = this.wishlist.indexOf(productId);
    const isAdding = idx === -1;

    if (isAdding) {
      this.wishlist.push(productId);
      this.showToast(`Saved <strong>${product.name}</strong> to wishlist!`, 'success');
    } else {
      this.wishlist.splice(idx, 1);
      this.showToast(`Removed <strong>${product.name}</strong> from wishlist`, 'info');
    }

    this.saveToStorage('techmart_wishlist', this.wishlist);
    this.updateWishlistUI();

    // Toggle button UI if passed
    if (btnEl) {
      btnEl.classList.toggle('active', isAdding);
      const icon = btnEl.querySelector('i');
      if (icon) {
        icon.className = isAdding ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
      }
    }

    // Refresh products cards to sync wishlist status
    this.renderProducts();
    this.renderFlashDeals();
  }

  updateWishlistUI() {
    const countEl = document.getElementById('wishlistCount');
    const drawerCountEl = document.getElementById('wishlistDrawerCount');
    const container = document.getElementById('wishlistItemsContainer');

    if (countEl) countEl.textContent = this.wishlist.length;
    if (drawerCountEl) drawerCountEl.textContent = this.wishlist.length;

    if (!container) return;

    if (this.wishlist.length === 0) {
      container.innerHTML = `
        <div class="empty-cart-view">
          <i class="fa-regular fa-heart"></i>
          <h4>Your wishlist is empty</h4>
          <p>Tap the heart icon on any laptop, phone or appliance to save it here.</p>
        </div>
      `;
      return;
    }

    const items = this.wishlist.map(id => this.products.find(p => p.id === id)).filter(Boolean);

    container.innerHTML = items.map(product => `
      <div class="cart-item">
        <img src="${product.images[0]}" alt="${product.name}" class="cart-item-img">
        <div class="cart-item-info">
          <h4 class="cart-item-title">${product.name}</h4>
          <div class="cart-item-price">${this.formatPrice(product.price)}</div>
          <div class="cart-item-controls" style="margin-top: 6px;">
            <button class="btn btn-primary" style="padding: 6px 12px; font-size: 0.78rem;" 
                    onclick="app.addToCart('${product.id}'); app.toggleWishlist('${product.id}');">
              <i class="fa-solid fa-cart-plus"></i> Move to Cart
            </button>
            <button class="cart-remove-item" onclick="app.toggleWishlist('${product.id}')">
              <i class="fa-solid fa-trash-can"></i> Remove
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // --- QUICK VIEW MODAL ---
  quickViewProduct(productId) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;

    this.quickViewProductItem = product;
    this.quickViewQty = 1;
    this.quickViewColor = product.colors ? product.colors[0] : null;

    // Populate data
    document.getElementById('quickViewBrand').textContent = product.brand;
    document.getElementById('quickViewTitle').textContent = product.name;
    document.getElementById('quickViewDesc').textContent = product.description;
    document.getElementById('quickViewPrice').textContent = this.formatPrice(product.price);
    
    const oldPriceEl = document.getElementById('quickViewOldPrice');
    const discountEl = document.getElementById('quickViewDiscountBadge');
    if (product.originalPrice && product.originalPrice > product.price) {
      oldPriceEl.textContent = this.formatPrice(product.originalPrice);
      oldPriceEl.style.display = 'inline';
      const pct = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
      discountEl.textContent = `Save ${pct}%`;
      discountEl.style.display = 'inline-block';
    } else {
      oldPriceEl.style.display = 'none';
      discountEl.style.display = 'none';
    }

    // Stars & Reviews
    document.getElementById('quickViewStars').innerHTML = this.renderStars(product.rating);
    document.getElementById('quickViewReviewCount').textContent = `(${product.reviewCount} verified reviews)`;

    // Main Image & Thumbnails
    const mainImg = document.getElementById('quickViewMainImg');
    mainImg.src = product.images[0];
    mainImg.alt = product.name;

    const thumbsContainer = document.getElementById('quickViewThumbnails');
    thumbsContainer.innerHTML = product.images.map((imgSrc, i) => `
      <div class="thumb-item ${i === 0 ? 'active' : ''}" onclick="app.switchQuickViewImage('${imgSrc}', this)">
        <img src="${imgSrc}" alt="${product.name} view ${i + 1}">
      </div>
    `).join('');

    // Specs table
    const specsTable = document.getElementById('quickViewSpecsTable');
    specsTable.innerHTML = Object.entries(product.specs).map(([key, val]) => `
      <tr>
        <td>${key}</td>
        <td>${val}</td>
      </tr>
    `).join('');

    // Colors
    const colorsWrap = document.getElementById('quickViewColorsWrap');
    const colorsList = document.getElementById('quickViewColors');
    if (product.colors && product.colors.length > 0) {
      colorsWrap.style.display = 'block';
      colorsList.innerHTML = product.colors.map((color, i) => `
        <span class="color-pill ${i === 0 ? 'active' : ''}" onclick="app.selectQuickViewColor('${color}', this)">
          ${color}
        </span>
      `).join('');
    } else {
      colorsWrap.style.display = 'none';
    }

    // Reset quantity
    document.getElementById('qvQtyInput').value = 1;

    // Wishlist button state
    const isWishlisted = this.wishlist.includes(product.id);
    const qvWishlistBtn = document.getElementById('qvWishlistBtn');
    if (qvWishlistBtn) {
      qvWishlistBtn.querySelector('i').className = isWishlisted ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
      qvWishlistBtn.style.color = isWishlisted ? 'var(--accent)' : '';
      qvWishlistBtn.onclick = () => {
        this.toggleWishlist(product.id);
        const nowSaved = this.wishlist.includes(product.id);
        qvWishlistBtn.querySelector('i').className = nowSaved ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
        qvWishlistBtn.style.color = nowSaved ? 'var(--accent)' : '';
      };
    }

    // Add to cart button handler
    const qvAddToCartBtn = document.getElementById('qvAddToCartBtn');
    if (qvAddToCartBtn) {
      qvAddToCartBtn.onclick = () => {
        this.addToCart(product.id, this.quickViewQty, this.quickViewColor, qvAddToCartBtn);
      };
    }

    this.openModal('quickViewModal');
  }

  switchQuickViewImage(imgUrl, thumbEl) {
    const main = document.getElementById('quickViewMainImg');
    if (main) main.src = imgUrl;

    document.querySelectorAll('.gallery-thumbnails .thumb-item').forEach(el => el.classList.remove('active'));
    if (thumbEl) thumbEl.classList.add('active');
  }

  selectQuickViewColor(color, pillEl) {
    this.quickViewColor = color;
    document.querySelectorAll('.color-badges .color-pill').forEach(el => el.classList.remove('active'));
    if (pillEl) pillEl.classList.add('active');
  }

  // --- MULTI-STEP CHECKOUT FLOW ---
  startCheckout() {
    if (this.cart.length === 0) {
      this.showToast('Your cart is empty. Please add items to checkout.', 'warning');
      return;
    }
    this.toggleCart(false);
    this.goToCheckoutStep(1);
    this.openModal('checkoutModal');
  }

  goToCheckoutStep(step) {
    this.currentCheckoutStep = step;

    // Update step indicators
    for (let i = 1; i <= 3; i++) {
      const ind = document.getElementById(`stepIndicator${i}`);
      const content = document.getElementById(`checkoutStep${i}`);
      if (ind) {
        ind.classList.toggle('active', i === step);
        ind.classList.toggle('completed', i < step);
      }
      if (content) {
        content.style.display = i === step ? 'block' : 'none';
      }
    }

    // If step 2, update payment submit total
    if (step === 2) {
      const totals = this.calculateCartTotals();
      const payTotal = document.getElementById('paySubmitTotal');
      if (payTotal) payTotal.textContent = this.formatPrice(totals.grandTotal);
    }
  }

  switchPayMethod(method) {
    const cardBox = document.getElementById('cardPaymentBox');
    const altBox = document.getElementById('altPaymentBox');
    const altTitle = document.getElementById('altPayTitle');
    const altDesc = document.getElementById('altPayDesc');

    if (method === 'card') {
      cardBox.style.display = 'block';
      altBox.style.display = 'none';
    } else {
      cardBox.style.display = 'none';
      altBox.style.display = 'block';

      if (method === 'paypal') {
        altTitle.textContent = 'PayPal Express Checkout';
        altDesc.textContent = 'You will securely authorize payment through your linked PayPal account.';
      } else if (method === 'applepay') {
        altTitle.textContent = 'Apple Pay / Google Wallet';
        altDesc.textContent = 'Complete your transaction instantly using Touch ID, Face ID, or Device Passcode.';
      } else if (method === 'cod') {
        altTitle.textContent = 'Cash On Delivery (COD)';
        altDesc.textContent = 'Pay in cash upon physical receipt and inspection of your package at your doorstep.';
      }
    }
  }

  processPayment() {
    const totals = this.calculateCartTotals();
    const btn = document.getElementById('paySubmitBtn');
    const origText = btn ? btn.innerHTML : '';

    if (btn) {
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Authorizing...';
      btn.disabled = true;
    }

    setTimeout(() => {
      if (btn) {
        btn.innerHTML = origText;
        btn.disabled = false;
      }

      // Generate Order confirmation
      const randomOrderId = 'TM-' + Math.floor(100000 + Math.random() * 900000);
      const deliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
      });

      document.getElementById('confirmedOrderId').textContent = randomOrderId;
      document.getElementById('confirmedDeliveryDate').textContent = `${deliveryDate} (Express Dispatch)`;
      document.getElementById('confirmedTotalPaid').textContent = this.formatPrice(totals.grandTotal);

      // Clear the cart
      this.cart = [];
      this.appliedCoupon = null;
      this.saveToStorage('techmart_cart', this.cart);
      this.updateCartUI();

      this.goToCheckoutStep(3);
      this.showToast('🎉 Order placed successfully!', 'success');
    }, 1200);
  }

  // --- USER AUTHENTICATION (MOCK) ---
  switchAuthTab(tab) {
    const isLogin = tab === 'login';
    document.getElementById('tabLogin').classList.toggle('active', isLogin);
    document.getElementById('tabRegister').classList.toggle('active', !isLogin);
    document.getElementById('loginForm').style.display = isLogin ? 'block' : 'none';
    document.getElementById('registerForm').style.display = !isLogin ? 'block' : 'none';
  }

  handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const name = email.split('@')[0];
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

    this.user = { name: formattedName, email: email };
    this.saveToStorage('techmart_user', this.user);
    this.updateUserUI();
    this.closeModal('authModal');
    this.showToast(`Welcome back, ${formattedName}!`, 'success');
  }

  handleRegister() {
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;

    this.user = { name: name, email: email };
    this.saveToStorage('techmart_user', this.user);
    this.updateUserUI();
    this.closeModal('authModal');
    this.showToast(`Account created! Welcome to TechMart, ${name}!`, 'success');
  }

  handleSocialAuth(provider) {
    this.user = { name: `${provider} User`, email: `user@${provider.toLowerCase()}.com` };
    this.saveToStorage('techmart_user', this.user);
    this.updateUserUI();
    this.closeModal('authModal');
    this.showToast(`Connected with ${provider}!`, 'success');
  }

  updateUserUI() {
    const label = document.getElementById('userLabel');
    if (!label) return;

    if (this.user) {
      label.textContent = this.user.name;
    } else {
      label.textContent = 'Sign In';
    }
  }

  handleUserClick() {
    if (this.user) {
      if (confirm(`You are logged in as ${this.user.name} (${this.user.email}). Would you like to sign out?`)) {
        this.user = null;
        this.saveToStorage('techmart_user', null);
        this.updateUserUI();
        this.showToast('Signed out of TechMart', 'info');
      }
    } else {
      this.openModal('authModal');
    }
  }

  handleNewsletter(e) {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value;
    this.showToast(`Subscribed! 15% promo code sent to <strong>${email}</strong>`, 'success');
    document.getElementById('newsletterEmail').value = '';
  }

  openSupportModal() {
    this.showToast('Our 24/7 Tech Team is online! Call +1 (800) 832-4627 or email support@techmart.example', 'info');
  }

  // --- MODAL / DRAWER HELPERS ---
  toggleCart(open) {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    if (drawer && overlay) {
      drawer.classList.toggle('active', open);
      overlay.classList.toggle('active', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }
  }

  toggleWishlistDrawer(open) {
    const drawer = document.getElementById('wishlistDrawer');
    const overlay = document.getElementById('wishlistOverlay');
    if (drawer && overlay) {
      drawer.classList.toggle('active', open);
      overlay.classList.toggle('active', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }
  }

  toggleMobileDrawer(open) {
    const drawer = document.getElementById('mobileDrawer');
    const overlay = document.getElementById('mobileDrawerOverlay');
    if (drawer && overlay) {
      drawer.classList.toggle('active', open);
      overlay.classList.toggle('active', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    let backdropId = modalId.replace('Modal', 'Backdrop');
    const backdrop = document.getElementById(backdropId);

    if (modal) modal.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    let backdropId = modalId.replace('Modal', 'Backdrop');
    const backdrop = document.getElementById(backdropId);

    if (modal) modal.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  // --- FLOATING TOAST NOTIFICATIONS ---
  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const icons = {
      success: 'fa-solid fa-circle-check',
      info: 'fa-solid fa-circle-info',
      warning: 'fa-solid fa-triangle-exclamation',
      error: 'fa-solid fa-circle-xmark'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <i class="${icons[type] || icons.info} toast-icon"></i>
      <div class="toast-text">${message}</div>
    `;

    container.appendChild(toast);

    // Remove after 3.8 seconds
    setTimeout(() => {
      toast.classList.add('toast-leave');
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  // --- GLOBAL EVENT LISTENERS ---
  initEventListeners() {
    // Theme toggle
    document.getElementById('themeToggleBtn')?.addEventListener('click', () => this.toggleTheme());

    // Currency selector
    document.getElementById('currencySelect')?.addEventListener('change', (e) => this.setCurrency(e.target.value));
    document.getElementById('mobileCurrencySelect')?.addEventListener('change', (e) => this.setCurrency(e.target.value));

    // Cart Drawer triggers
    document.getElementById('cartBtn')?.addEventListener('click', () => this.toggleCart(true));
    document.getElementById('closeCartBtn')?.addEventListener('click', () => this.toggleCart(false));
    document.getElementById('cartOverlay')?.addEventListener('click', () => this.toggleCart(false));

    // Wishlist Drawer triggers
    document.getElementById('wishlistBtn')?.addEventListener('click', () => this.toggleWishlistDrawer(true));
    document.getElementById('closeWishlistBtn')?.addEventListener('click', () => this.toggleWishlistDrawer(false));
    document.getElementById('wishlistOverlay')?.addEventListener('click', () => this.toggleWishlistDrawer(false));

    // Mobile Navigation triggers
    document.getElementById('mobileMenuBtn')?.addEventListener('click', () => this.toggleMobileDrawer(true));
    document.getElementById('closeMobileDrawerBtn')?.addEventListener('click', () => this.toggleMobileDrawer(false));
    document.getElementById('mobileDrawerOverlay')?.addEventListener('click', () => this.toggleMobileDrawer(false));
    document.getElementById('mobileSignInBtn')?.addEventListener('click', () => {
      this.toggleMobileDrawer(false);
      this.handleUserClick();
    });

    // User Account
    document.getElementById('userBtn')?.addEventListener('click', () => this.handleUserClick());

    // Modals close buttons & backdrops
    document.getElementById('closeQuickViewBtn')?.addEventListener('click', () => this.closeModal('quickViewModal'));
    document.getElementById('quickViewBackdrop')?.addEventListener('click', () => this.closeModal('quickViewModal'));

    document.getElementById('closeCheckoutBtn')?.addEventListener('click', () => this.closeModal('checkoutModal'));
    document.getElementById('checkoutBackdrop')?.addEventListener('click', () => this.closeModal('checkoutModal'));

    document.getElementById('closeAuthBtn')?.addEventListener('click', () => this.closeModal('authModal'));
    document.getElementById('authBackdrop')?.addEventListener('click', () => this.closeModal('authModal'));

    // Cart actions
    document.getElementById('proceedCheckoutBtn')?.addEventListener('click', () => this.startCheckout());
    document.getElementById('clearCartBtn')?.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear your cart?')) this.clearCart();
    });

    document.getElementById('applyCouponBtn')?.addEventListener('click', () => {
      const code = document.getElementById('couponInput').value;
      this.applyCouponCode(code);
      document.getElementById('couponInput').value = '';
    });

    document.getElementById('removeCouponBtn')?.addEventListener('click', () => this.removeCoupon());

    // Quick View Stepper
    document.getElementById('qvQtyPlus')?.addEventListener('click', () => {
      if (this.quickViewQty < 10) {
        this.quickViewQty++;
        document.getElementById('qvQtyInput').value = this.quickViewQty;
      }
    });

    document.getElementById('qvQtyMinus')?.addEventListener('click', () => {
      if (this.quickViewQty > 1) {
        this.quickViewQty--;
        document.getElementById('qvQtyInput').value = this.quickViewQty;
      }
    });

    // Simulated Card live preview
    const cardNumInput = document.getElementById('cardNumber');
    const cardExpInput = document.getElementById('cardExpiry');
    const nameInput = document.getElementById('shipFirstName');

    if (cardNumInput) {
      cardNumInput.addEventListener('input', (e) => {
        // Auto format in chunks of 4
        let val = e.target.value.replace(/\D/g, '').substring(0, 16);
        let formatted = val.match(/.{1,4}/g)?.join(' ') || '';
        e.target.value = formatted;
        document.getElementById('cardNumPreview').textContent = formatted || '•••• •••• •••• 4242';
      });
    }

    if (cardExpInput) {
      cardExpInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '').substring(0, 4);
        if (val.length >= 2) {
          val = val.substring(0, 2) + '/' + val.substring(2);
        }
        e.target.value = val;
        document.getElementById('cardExpPreview').textContent = val || '12/28';
      });
    }

    if (nameInput) {
      nameInput.addEventListener('input', (e) => {
        document.getElementById('cardNamePreview').textContent = e.target.value.toUpperCase() || 'ALEX VANCE';
      });
    }

    // Catalog Filter Controls
    const priceSlider = document.getElementById('priceRange');
    const priceDisplay = document.getElementById('priceDisplay');
    if (priceSlider && priceDisplay) {
      priceSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        this.filters.maxPrice = val;
        priceDisplay.textContent = `$${val.toLocaleString()}`;
        this.renderProducts();
      });
    }

    const sortSelect = document.getElementById('catalogSortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.filters.sortBy = e.target.value;
        this.renderProducts();
      });
    }

    // Grid vs List view switchers
    const gridBtn = document.getElementById('viewGridBtn');
    const listBtn = document.getElementById('viewListBtn');
    if (gridBtn && listBtn) {
      gridBtn.addEventListener('click', () => {
        this.filters.viewMode = 'grid';
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
        this.renderProducts();
      });
      listBtn.addEventListener('click', () => {
        this.filters.viewMode = 'list';
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
        this.renderProducts();
      });
    }

    // Ratings radio filters
    document.querySelectorAll('input[name="ratingFilter"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.filters.minRating = parseFloat(e.target.value);
        this.renderProducts();
      });
    });

    // Checkbox filters
    document.getElementById('inStockFilter')?.addEventListener('change', (e) => {
      this.filters.inStockOnly = e.target.checked;
      this.renderProducts();
    });

    document.getElementById('onSaleFilter')?.addEventListener('change', (e) => {
      this.filters.onSaleOnly = e.target.checked;
      this.renderProducts();
    });

    document.getElementById('resetFiltersBtn')?.addEventListener('click', () => this.resetAllFilters());

    // Search bar input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filters.searchQuery = e.target.value;
        this.handleSearchInput(e.target.value);
        this.renderProducts();
      });
    }

    document.getElementById('clearSearchBtn')?.addEventListener('click', () => this.clearSearch());

    // Close search dropdown on click outside
    document.addEventListener('click', (e) => {
      const container = document.querySelector('.search-container');
      const dropdown = document.getElementById('searchDropdown');
      if (container && !container.contains(e.target) && dropdown) {
        dropdown.classList.remove('active');
      }
    });

    // Mobile filter sidebar toggle
    const mobileFilterBtn = document.getElementById('openMobileFilterBtn');
    const sidebar = document.getElementById('catalogSidebar');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');

    if (mobileFilterBtn && sidebar) {
      mobileFilterBtn.addEventListener('click', () => sidebar.classList.add('active'));
    }
    if (closeSidebarBtn && sidebar) {
      closeSidebarBtn.addEventListener('click', () => sidebar.classList.remove('active'));
    }

    // Scroll & Back to top button
    const backToTopBtn = document.getElementById('backToTopBtn');
    const mainHeader = document.getElementById('mainHeader');

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;
      if (mainHeader) {
        mainHeader.classList.toggle('scrolled', scrollPos > 50);
      }
      if (backToTopBtn) {
        backToTopBtn.classList.toggle('active', scrollPos > 400);
      }
    });

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Keyboard ESC to close any modal or drawer
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.toggleCart(false);
        this.toggleWishlistDrawer(false);
        this.toggleMobileDrawer(false);
        this.closeModal('quickViewModal');
        this.closeModal('checkoutModal');
        this.closeModal('authModal');
        sidebar?.classList.remove('active');
      }
    });
  }
}

// Instantiate App globally when DOM is ready
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new TechMartApp();
});

