<template>
  <div class="dashboard-container">
    <component :is="currentRole"></component>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import manager from './manager'
import user from './user'

export default {
  name: 'Dashboard',
  components: {manager,user},
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
    if(this.typeId==1||this.typeId==2){
      this.currentRole = 'user'
    }else{
      this.currentRole = 'manager'
    }
  }
}
</script>
