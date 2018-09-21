<template>
  <section class="transaction">
    <h1><i class="el-icon-tickets"></i> Logs</h1>

  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('auth', ['user'])
  },

  data: () => ({
    transactions: []
  })

}
</script>

<style lang="sass" scoped>
.transaction
</style>
