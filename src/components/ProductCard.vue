<template>
  <div class="product-item">
    <div class="product-image-container" @click="openProductDialog">
      <img :src="product.image" :alt="product.title" class="product-image">
      <button class="add-to-cart-btn">
        加入購物車
      </button>
    </div>
    <div class="product-info">
      <h3 class="product-title">{{ product.title }}</h3>
      <p class="product-price">$ {{ product.price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    openProductDialog() {
      this.$store.commit('openProductDialog', this.product)
    }
  }
}
</script>

<style lang="scss" scoped>
.product-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  .product-image-container {
    position: relative;
    width: 100%;
    aspect-ratio: 1; 
    overflow: hidden;
    border-radius: 8px;
    background-color: var(--bg-muted);
    cursor: pointer;
    
    .product-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    // 桌面版 Hover 效果 (只在支援 hover 的裝置上)
    @media (hover: hover) {
      &:hover .product-image {
        transform: scale(1.05);
      }
      
      &:hover .add-to-cart-btn {
        opacity: 1;
        pointer-events: auto;
      }
    }
    
    .add-to-cart-btn {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.8);
      color: var(--text-on-dark);
      border: none;
      padding: 8px 16px;
      border-radius: 20px;
      cursor: pointer;
      font-size: 14px;
      white-space: nowrap;
      transition: all 0.2s;
      
      // 預設隱藏且不干擾點擊
      opacity: 0;
      pointer-events: none;
      
      &:hover {
        background-color: black;
        transform: translateX(-50%) scale(1.05);
      }
    }
  }
  
  .product-info {
    .product-title {
      font-size: 16px;
      font-weight: 500;
      margin: 0;
      color: var(--text-primary);
    }
    .product-price {
      font-size: 14px;
      color: var(--text-secondary);
      margin: 4px 0 0;
    }
  }
}
</style>
