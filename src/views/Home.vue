<template>
    <div class="product-grid">
      <product-card
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
      <add-to-cart-dialog @fly-to-cart="handleFlyAnimation" />

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
import { mapState, mapGetters } from 'vuex'
import ProductCard from '@/components/ProductCard.vue'
import AddToCartDialog from '@/components/AddToCartDialog.vue'

export default {
  name: 'Home',
  components: {
    ProductCard,
    AddToCartDialog
  },
  data() {
    return {
      // 模擬飛到購物車的圖片
      flyingItems: []
    }
  },
  computed: {
    ...mapState(['products']),
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
</style>
