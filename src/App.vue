<template>
  <div id="app">
    <header class="app-header">
      <div class="container">
        <h1>面試小電商</h1>
        <div class="cart-icon" @click="$router.push('/cart')">
          <i class="fas fa-shopping-cart"></i>
          <span class="badge" v-if="cartCount > 0">{{ cartCount }}</span>
        </div>
      </div>
    </header>

    <main class="container">
      <router-view />
    </main>

    <add-to-cart-dialog @fly-to-cart="handleFlyAnimation" />
    
    <!-- Flying Image Container -->
    <div class="flying-img-container">
      <img 
        v-for="item in flyingItems" 
        :key="item.id"
        :src="item.image" 
        class="flying-img"
        :style="item.style"
        @transitionend="removeFlyingItem(item.id)"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddToCartDialog from './components/AddToCartDialog.vue'

export default {
  name: 'App',
  components: {
    AddToCartDialog
  },
  data() {
    return {
      flyingItems: []
    }
  },
  computed: {
    ...mapGetters(['cartCount'])
  },
  methods: {
    handleFlyAnimation({ rect, image }) {
      const cartIcon = this.$refs.cartIcon
      if (!cartIcon) return

      const cartRect = cartIcon.getBoundingClientRect()
      const id = Date.now()
      
      // Start position
      const startStyle = {
        top: `${rect.top}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        opacity: 1,
        transform: 'scale(1)'
      }

      this.flyingItems.push({
        id,
        image,
        style: startStyle
      })

      // Trigger animation in next frame
      requestAnimationFrame(() => {
        const item = this.flyingItems.find(i => i.id === id)
        if (item) {
          // Calculate center of cart icon
          const centerX = cartRect.left + cartRect.width / 2
          const centerY = cartRect.top + cartRect.height / 2
          const targetSize = 24 // Shrink to cart icon size

          item.style = {
            top: `${centerY - targetSize / 2}px`,
            left: `${centerX - targetSize / 2}px`,
            width: `${targetSize}px`,
            height: `${targetSize}px`,
            opacity: 0.9,
            transform: 'scale(1)'
          }
        }
      })
    },
    removeFlyingItem(id) {
      this.flyingItems = this.flyingItems.filter(item => item.id !== id)
    }
  }
}
</script>

<style lang="scss">
// SCSS Variables
// Global styles imported below
@use '@/assets/styles.scss';

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

.flying-img-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  
  .flying-img {
    position: absolute;
    border-radius: 50%;
    object-fit: cover;
    transition: all 0.8s cubic-bezier(0.19, 1, 0.22, 1);
  }
}

/* Add Font Awesome for cart icon (simulated via CDN in HTML or just text if failed) */
</style>
