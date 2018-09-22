<template>
  <section class="transaction">
    <h1><i class="el-icon-tickets"></i> Logs</h1>

    <div class="transactions">
      <div v-for="transaction in transactions" :key="transaction._id">
        <a-card-transaction :transaction="transaction" />
      </div>
    </div>

  </section>
</template>

<script>
import Transaction from '@/middleware/Transaction'

import CardTransaction from '@/views/components/dashboard/shared/Card-transaction'

export default {
  components: {
    'a-card-transaction': CardTransaction
  },

  data: () => ({
    transactions: []
  }),

  async mounted() {
    const response = await Transaction.get()
    this.transactions = response.data.transactions.reverse()
  }

}
</script>

<style lang="sass" scoped>
.transaction
  h1
    font-size: 1.7em
    padding: 0 0 10px 15px

  .transactions
    padding: 10px

</style>
