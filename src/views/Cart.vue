<template>
  <div class="cart-page">
    <h2>Shopping Cart</h2>
    <div v-if="cartCount === 0" class="empty-cart">
      <p>Your cart is empty.</p>
      <router-link to="/" class="btn-primary">Go Shopping</router-link>
    </div>
    <div v-else class="cart-items-container">
      <ul class="cart-list">
        <li v-for="item in cart" :key="item.id" class="cart-item">
          <div class="item-left">
            <img :src="item.image" :alt="item.title" class="item-image" />
          </div>
          <div class="item-right">
            <div class="item-details">
              <h3 class="item-title">{{ item.title }}</h3>
            </div>
            <div class="item-meta">
              <span class="item-qty">x {{ item.quantity }}</span>
              <span class="item-price">$ {{ item.price }}</span>
            </div>
          </div>
        </li>
      </ul>

      <div class="cart-footer">
        <div class="cart-total">
          <span>Total:</span>
          <span class="total-amount">$ {{ cartTotal }}</span>
        </div>
        <div class="cart-actions">
          <router-link to="/" class="btn-secondary">Go Shopping</router-link>
          <button class="btn-primary">Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Cart',
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['cartCount', 'cartTotal'])
  }
}
</script>

<style lang="scss" scoped>
.cart-page {
  padding: 2rem 0;
  max-width: 800px;
  margin: 0 auto;
  height: calc(100vh - 80px); /* Adjust based on header height, assumed ~80px */
  display: flex;
  flex-direction: column;
  
  h2 {
    margin-bottom: 2rem;
    font-size: 1.8rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 1rem;
    flex-shrink: 0;
  }

  .cart-items-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden; /* Prevent container itself from scrolling */
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

  .cart-list {
    list-style: none;
    padding: 0;
    margin: 0;
    flex-grow: 1;
    overflow-y: auto; /* Enable scrolling for list */
    padding-right: 10px; /* Space for scrollbar */
    
    &::-webkit-scrollbar {
      width: 6px;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: #ccc;
      border-radius: 3px;
    }
  }

  .cart-item {
    display: flex;
    align-items: center;
    padding: 1.5rem 0;
    border-bottom: 1px solid #eee;
    
    .item-left {
      width: 80px;
      height: 80px;
      margin-right: 1.5rem;
      flex-shrink: 0;
      
      .item-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px;
        background-color: #f5f5f5;
      }
    }
    
    .item-right {
      flex-grow: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .item-title {
      margin: 0;
      font-size: 1rem;
      color: #333;
    }

    .item-meta {
      display: flex;
      gap: 2rem;
      align-items: center;
      
      .item-qty {
        color: #666;
        font-size: 0.9rem;
      }
      
      .item-price {
        font-weight: 600;
        font-size: 1.1rem;
        min-width: 80px;
        text-align: right;
      }
    }
  }

  .cart-footer {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
    margin-top: 1rem;
    background-color: white;
    flex-shrink: 0; /* Prevent footer from shrinking */
    
    .cart-total {
      font-size: 1.5rem;
      font-weight: bold;
      color: #333;
      
      .total-amount {
        margin-left: 1rem;
        color: #e53935;
      }
    }
    
    .cart-actions {
      display: flex;
      gap: 1rem;
    }
  }
  
  .btn-primary, .btn-secondary {
    display: inline-block;
    padding: 0.8rem 2rem;
    text-decoration: none;
    border-radius: 4px;
    font-weight: 500;
    transition: all 0.3s;
    border: none;
    cursor: pointer;
    font-size: 1rem;
  }
  
  .btn-primary {
    background-color: #212529;
    color: white;
    
    &:hover {
      background-color: #000;
      transform: translateY(-2px);
    }
  }
  
  .btn-secondary {
    background-color: #f1f3f5;
    color: #495057;
    
    &:hover {
      background-color: #e9ecef;
    }
  }
}
</style>
