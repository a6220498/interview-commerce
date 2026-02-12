<template>
  <div class="product-item">
    <div class="product-image-container" @mouseenter="hover = true" @mouseleave="hover = false">
      <img :src="product.image" :alt="product.title" class="product-image">
      <button v-show="hover" class="add-to-cart-btn" @click="openDialog">
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
    return {
      hover: false
    }
  },
  methods: {
    openDialog() {
      this.$store.commit('OPEN_DIALOG', this.product)
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
    background-color: #f5f5f5;
    cursor: pointer;
    
    .product-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &:hover .product-image {
      transform: scale(1.05);
    }
    
    .add-to-cart-btn {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 20px;
      cursor: pointer;
      font-size: 14px;
      white-space: nowrap;
      transition: opacity 0.2s;
      
      &:hover {
        background-color: black;
      }
    }
  }
  
  .product-info {
    .product-title {
      font-size: 16px;
      font-weight: 500;
      margin: 0;
      color: #333;
    }
    .product-price {
      font-size: 14px;
      color: #666;
      margin: 4px 0 0;
    }
  }
}
</style>
