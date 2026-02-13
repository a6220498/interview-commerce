<template>
  <div class="scene-switch">
    <!-- start header -->
    <header class="app-header">
      <div class="header-container">
        <h1>面試題目-微型電商</h1>
        <div class="cart-icon" ref="cartIcon" @click="$router.push('/cart')">
          <!-- 購物車圖標 來源: Font Awesome CDN -->
          <i class="fas fa-shopping-cart"></i>
          <span class="badge" v-if="cartCount > 0">{{ cartCount }}</span>
        </div>
      </div>
    </header>
    <!-- end header -->
    <main class="main-container">
      <router-view />
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SceneSwitch',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['cartCount'])
  },
  methods: {}
}
</script>

<style lang="scss">
.scene-switch {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: white;
  border-bottom: 1px solid #eee;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);

  .header-container {
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
      background-color: var(--cart-red-color);
      color: white;
      font-size: 0.75rem;
      padding: 2px 6px;
      border-radius: 10px;
      font-weight: bold;
    }
  }
}

.main-container {
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
}
</style>
