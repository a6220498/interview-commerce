<template>
  <div class="checkout-success">
    <div class="success-card">
      <div class="success-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="11" stroke="#4CAF50" stroke-width="2"/>
          <path d="M7 12L10.5 15.5L17 9" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      
      <h1>結帳成功！</h1>
      <p class="success-message">感謝您的購買，您的訂單已成功送出。</p>
      
      <div class="order-info">
        <p class="order-number">訂單編號：#{{ orderNumber }}</p>
        <p class="order-time">訂單時間：{{ orderTime }}</p>
      </div>
      
      <router-link to="/" class="btn-primary btn-home">返回首頁</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutSuccess',
  data() {
    return {
      orderNumber: this.generateOrderNumber(),
      orderTime: this.getCurrentTime()
    }
  },
  methods: {
    generateOrderNumber() {
      return Date.now().toString().slice(-8)
    },
    getCurrentTime() {
      const now = new Date()
      return now.toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.checkout-success {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.success-card {
  background: var(--bg-card);
  border-radius: 16px;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  max-width: 500px;
  width: 100%;
  animation: slideUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.success-icon {
  margin: 0 auto 2rem;
  width: 80px;
  height: 80px;
  animation: scaleIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s both;
  
  svg {
    width: 100%;
    height: 100%;
  }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: scale(1); }
}

h1 {
  font-size: 2rem;
  color: var(--text-primary);
  margin: 0 0 1rem;
  font-weight: 700;
}

.success-message {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin: 0 0 2rem;
  line-height: 1.6;
}

.order-info {
  background: var(--background-color);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2.5rem;
  text-align: left;
  
  p {
    margin: 0.5rem 0;
    color: var(--text-secondary);
    font-size: 0.95rem;
    display: flex;
    justify-content: space-between;
    
    &.order-number {
      font-weight: 600;
      color: var(--text-primary);
    }
  }
}

.btn-home {
  width: 100%;
  padding: 1rem;
}

@media (max-width: 600px) {
  .checkout-success {
    padding: 1.5rem;
  }
  
  .success-card {
    padding: 2.5rem 1.5rem;
  }
  
  h1 {
    font-size: 1.75rem;
  }
}
</style>
