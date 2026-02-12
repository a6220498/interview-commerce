<template>
  <div id="app">
    <header class="app-header">
      <div class="container">
        <h1>Interview Products</h1>
        <div class="cart-icon">
          <i class="fas fa-shopping-cart"></i>
          <span class="badge" v-if="cartCount > 0">{{ cartCount }}</span>
        </div>
      </div>
    </header>

    <main class="container">
      <div class="product-grid">
        <product-card
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </main>

    <add-to-cart-dialog />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ProductCard from './components/ProductCard.vue'
import AddToCartDialog from './components/AddToCartDialog.vue'

export default {
  name: 'App',
  components: {
    ProductCard,
    AddToCartDialog
  },
  computed: {
    ...mapState(['products']),
    ...mapGetters(['cartCount'])
  }
}
</script>

<style lang="scss">
// SCSS Variables
// Global styles imported below
@import '@/assets/styles.scss';

.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: white;
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h1 {
    font-size: 1.5rem;
    margin: 0;
    color: #333;
    font-weight: 700;
  }

  .cart-icon {
    position: relative;
    font-size: 1.2rem;
    cursor: pointer;
    
    .badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background-color: #e53935;
      color: white;
      font-size: 0.75rem;
      padding: 2px 6px;
      border-radius: 10px;
      font-weight: bold;
    }
  }
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
  
  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1rem;
  }
}

/* Add Font Awesome for cart icon (simulated via CDN in HTML or just text if failed) */
</style>
