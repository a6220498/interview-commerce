<template>
  <div class="cart-page">
    <h2>購物車</h2>
    
    <transition name="fade" mode="out-in">
      <div v-if="cartCount === 0" key="empty" class="empty-cart">
        <p>您的購物車是空的。</p>
        <router-link to="/" class="btn-primary">去購物</router-link>
      </div>
      <div v-else key="items" class="cart-items-container">
        <transition-group name="list" tag="ul" class="cart-list">
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
              <button class="btn-delete" @click="removeItem(item.id)" title="刪除">×</button>
            </div>
          </li>
        </transition-group>

        <div class="cart-footer">
          <div class="cart-total">
            <span>總計:</span>
            <span class="total-amount">$ {{ cartTotalAmount }}</span>
          </div>
          <div class="cart-actions">
            <router-link to="/" class="btn-secondary">去購物</router-link>
            <button class="btn-primary" @click="handleCheckout">結帳</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Cart',
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['cartCount', 'cartTotalAmount'])
  },
  methods: {
    ...mapMutations(['clearCart', 'removeFromCart']),
    handleCheckout() {
      this.clearCart()
      this.$router.push('/checkout-success')
    },
    removeItem(productId) {
      this.removeFromCart(productId)
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-page {
  padding: 2rem 1rem;
  max-width: 800px;
  margin: 0 auto;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  
  h2 {
    margin-bottom: 2rem;
    font-size: 1.8rem;
    border-bottom: 1px solid var(--border-light);
    padding-bottom: 1rem;
    flex-shrink: 0;
  }

  @media (max-width: 600px) {
    padding: 1rem 0.75rem;
    height: calc(100vh - 60px);
    
    h2 {
      font-size: 1.3rem;
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
    }
  }

  .cart-items-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden; /* Prevent container itself from scrolling */
  }

  .cart-items-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .empty-cart {
    text-align: center;
    padding: 4rem 2rem;
    background: var(--bg-muted);
    border-radius: 12px;
    margin-top: 2rem;
    
    p {
      margin-bottom: 2rem;
      color: var(--text-secondary);
      font-size: 1.1rem;
    }
  }

  .cart-list {
    list-style: none;
    padding: 0;
    margin: 0;
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 10px;
    
    &::-webkit-scrollbar {
      width: 6px;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: var(--border-base);
      border-radius: 3px;
    }
  }

  // Transition animations for list items
  .list-enter-active {
    transition: all 0.3s ease;
  }
  
  .list-leave-active {
    transition: all 0.4s ease;
  }
  
  .list-enter {
    opacity: 0;
    transform: translateX(-30px);
  }
  
  .list-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }
  
  .list-move {
    transition: transform 0.3s ease;
  }

  .cart-item {
    display: flex;
    align-items: center;
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--border-light);
    
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
        background-color: var(--bg-muted);
      }
    }
    
    .item-right {
      flex-grow: 1;
      display: flex;
      align-items: center;
      gap: 1.5rem;
      min-width: 0;
    }

    .item-details {
      flex: 1;
      min-width: 0;
    }

    .item-title {
      margin: 0;
      font-size: 1rem;
      color: var(--text-primary);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .item-meta {
      display: flex;
      gap: 2rem;
      align-items: center;
      flex-shrink: 0;
      
      .item-qty {
        color: var(--text-secondary);
        font-size: 0.9rem;
      }
      
      .item-price {
        font-weight: 600;
        font-size: 1.1rem;
        min-width: 80px;
        text-align: right;
      }
    }

    .btn-delete {
      background: none;
      border: none;
      color: var(--cart-red-color);
      font-size: 1.8rem;
      cursor: pointer;
      padding: 0.25rem 0.5rem;
      margin-left: 1rem;
      line-height: 1;
      transition: all 0.2s;
      
      &:hover {
        color: #c62828;
        transform: scale(1.2);
      }
      
      &:active {
        transform: scale(1);
      }
    }

    @media (max-width: 600px) {
      padding: 1rem 0;
      
      .item-left {
        width: 60px;
        height: 60px;
        margin-right: 1rem;
      }
      
      .item-right {
        position: relative;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      
      .item-details {
        flex: 1 1 100%;
      }
      
      .item-title {
        font-size: 0.875rem;
        padding-right: 2rem;
      }
      
      .item-meta {
        gap: 0.75rem;
        flex-direction: row;
        align-items: center;
        
        .item-qty {
          font-size: 0.8rem;
        }
        
        .item-price {
          font-size: 0.95rem;
          min-width: auto;
        }
      }
      
      .btn-delete {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0;
        padding: 0.5rem;
        font-size: 1.5rem;
      }
    }
  }

  .cart-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-light);
    margin-top: 1rem;
    background-color: var(--bg-card);
    flex-shrink: 0;
    
    .cart-total {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--text-primary);
      display: flex;
      align-items: center;
      
      .total-amount {
        margin-left: 1rem;
        color: var(--cart-red-color);
      }
    }
    
    .cart-actions {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    @media (max-width: 600px) {
      flex-direction: column;
      align-items: flex-end;
      gap: 1rem;
      padding-top: 1rem;
      
      .cart-total {
        font-size: 1.3rem;
      }
      
      .cart-actions {
        width: 100%;
        justify-content: flex-end;
        
        .btn {
          flex: 1;
          max-width: 150px;
        }
      }
    }
  }
}
</style>
