<template>
  <div class="dashboard-container">
    <component :is="currentRole"></component>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import manager from './manager'

export default {
  name: 'Dashboard',
  components: {manager},
  data() {
    return{
      currentRole: 'manager'
    }
  },
  computed:{
    ...mapGetters([
      'typeId'
    ])
  },
  created() {
      this.currentRole = 'manager'
  }
}
</script>
