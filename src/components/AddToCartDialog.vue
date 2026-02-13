<template>
  <transition name="fade">
    <div v-if="isOpen" class="dialog-overlay" @click.self="closeDialog">
      <div class="dialog-content">
        <!-- start header  -->
        <header class="dialog-header">
          <h3>加入購物車</h3>
          <button class="close-btn" @click="closeDialog">&times;</button>
        </header>
        <!-- end header  -->

        <!-- start body  -->
        <section class="dialog-body" v-if="selectedProduct">
          <div class="product-preview">
            <img :src="selectedProduct.image" :alt="selectedProduct.title" />
            <div class="info">
              <h4>{{ selectedProduct.title }}</h4>
              <p class="price">$ {{ selectedProduct.price }}</p>
            </div>
          </div>

          <div class="form-group">
            <label for="qty">數量 <span class="required">*</span></label>
            <input 
              type="number" 
              id="qty" 
              v-model.number="quantity" 
              min="1" 
              placeholder="請輸入數量"
            />
          </div>
        </section>
        <!-- end body  -->

        <!-- start footer  -->
        <footer class="dialog-footer">
          <button class="btn btn-secondary" @click="closeDialog">取消</button>
          <button class="btn btn-primary" @click="confirmAddToCart" :disabled="!isValid">確認</button>
        </footer>
        <!-- end footer  -->
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'AddToCartDialog',
  data() {
    return {
      quantity: 1
    }
  },
  computed: {
    ...mapState(['isDialogOpen', 'selectedProduct']),
    isOpen() {
      return this.isDialogOpen
    },
    isValid() {
      return this.quantity > 0
    }
  },
  watch: {
    isOpen(val) {
      if (val) {
        this.quantity = 1
      }
    }
  },
  methods: {
    ...mapMutations(['closeProductDialog', 'addToCart']),
    closeDialog() {
      this.closeProductDialog()
    },
    confirmAddToCart() {
      if (this.isValid) {
        const img = this.$el.querySelector('.product-preview img')
        if (img) {
          const rect = img.getBoundingClientRect()
          this.$emit('fly-to-cart', {
            rect,
            image: this.selectedProduct.image
          })
        }
        
        this.addToCart({
          product: this.selectedProduct,
          quantity: this.quantity
        })
        this.closeProductDialog() // Ensure dialog closes on confirm
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--overlay-bg);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.dialog-content {
  background: var(--bg-card);
  width: 90%;
  max-width: 400px;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

// Dialog specific transition extension
.fade-enter-active, .fade-leave-active {
  .dialog-content {
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
}

.fade-enter, .fade-leave-to {
  .dialog-content {
    transform: scale(0.9);
  }
}

.dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h3 {
      margin: 0;
      font-size: 1.2rem;
      font-weight: 600;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--text-muted);
      padding: 0;
      line-height: 1;

      &:hover {
        color: var(--text-primary);
      }
    }
  }

  .product-preview {
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
    padding: 10px;
    background: var(--background-color);
    border-radius: 8px;

    img {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 4px;
    }

    .info {
      h4 {
        margin: 0 0 4px;
        font-size: 1rem;
      }
      .price {
        margin: 0;
        color: var(--text-secondary);
        font-weight: 500;
      }
    }
  }

  .form-group {
    margin-bottom: 24px;
    
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      font-size: 0.9rem;
      
      .required {
        color: var(--error-color);
      }
    }

    input {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid var(--border-base);
      border-radius: 6px;
      font-size: 1rem;
      outline: none;
      transition: border-color 0.2s;

      &:focus {
        border-color: var(--success-color);
      }
    }
  }

  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;

    .btn-primary:disabled {
      background: #aeb5bc;
    }
  }
</style>
