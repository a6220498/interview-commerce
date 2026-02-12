<template>
  <div class="cart-page">
    <h2>Shopping Cart</h2>
    <div v-if="cartCount === 0" class="empty-cart">
      <p>Your cart is empty.</p>
      <router-link to="/" class="btn-primary">Go Shopping</router-link>
    </div>
    <div v-else class="cart-items">
      <!-- Detailed cart implementation can be added here later -->
      <p>You have {{ cartCount }} items in your cart.</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  computed: {
    ...mapGetters(['cartCount'])
  }
}
</script>

<style lang="scss" scoped>
.cart-page {
  padding: 2rem 0;
  
  h2 {
    margin-bottom: 2rem;
  }
  
  .empty-cart {
    text-align: center;
    padding: 3rem;
    background: #f9f9f9;
    border-radius: 8px;
    
    p {
      margin-bottom: 1.5rem;
      color: #666;
    }
  }
  
  .btn-primary {
    display: inline-block;
    background-color: #4CAF50;
    color: white;
    padding: 0.8rem 1.5rem;
    text-decoration: none;
    border-radius: 4px;
    font-weight: bold;
    transition: background-color 0.3s;
    
    &:hover {
      background-color: #45a049;
    }
  }
}
</style>
