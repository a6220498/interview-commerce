<template>
    <div class="product-grid">
      <!-- 商品卡片 -->
      <product-card
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
      <!-- 加入購物車彈窗 -->
      <add-to-cart-dialog @fly-to-cart="handleFlyAnimation" />

      <!-- 飛到購物車的圖片 -->
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
      const cartIcon = document.getElementById('cartIcon')
      if (!cartIcon) return

      const cartRect = cartIcon.getBoundingClientRect()
      const id = Date.now()
      
      // 使用 rect 的原始寬度作為固定寬高
      const initialSize = rect.width
      
      // 初始樣式：位置固定在原始位置，使用 transform 初始化
      const startStyle = {
        top: `${rect.top}px`,
        left: `${rect.left}px`,
        width: `${initialSize}px`,
        height: `${initialSize}px`,
        opacity: 1,
        transform: 'translate(0, 0) scale(1)',
        transformOrigin: 'center center'
      }

      this.flyingItems.push({
        id,
        image,
        style: startStyle
      })

      // 執行飛行動畫
      requestAnimationFrame(() => {
        const item = this.flyingItems.find(i => i.id === id)
        if (item) {
          // 計算目標中心點（購物車圖示中心）
          const targetCenterX = cartRect.left + cartRect.width / 2
          const targetCenterY = cartRect.top + cartRect.height / 2
          
          // 計算起點中心點（圖片原始中心）
          const startCenterX = rect.left + rect.width / 2
          const startCenterY = rect.top + rect.height / 2
          
          // 計算位移距離
          const translateX = targetCenterX - startCenterX
          const translateY = targetCenterY - startCenterY
          
          // 計算縮放比例（目標大小為 24px）
          const scale = 24 / initialSize

          // 更新 transform，不觸發 reflow
          item.style = {
            ...item.style,
            opacity: 0.9,
            transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`
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
