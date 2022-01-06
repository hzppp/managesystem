<template>
  <header>
    <div class="l-content">
      <el-button type="primary" 
      icon="el-icon-menu" 
      size="mini"
      @click="collapbtnClick" />
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">
          {{ current.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img :src="userImg" class="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      message : '123',
      userImg: require("../assets/images/user.png"),
    };
  },
  computed: {
    ...mapState({
      current: state => state.tab.currentMenu
    })
  },
  methods : {
    collapbtnClick(){
      this.$store.commit('collapseMenu')
    },
    logOut() {
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      location.reload()
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.userImg {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.l-content{
  display: flex;
  align-items: center;
  width: 380px;
}

.l-content .el-button{
  margin-right: 20px;
}
</style>

<style lang="scss">
.el-breadcrumb__item{
  .el-breadcrumb__inner{
    color: #666;
    font-weight: normal;
  }
  &:last-child{
    .el-breadcrumb__inner{
      color: #fff;
    }
  }
}
/* .el-breadcrumb__item:last-child .el-breadcrumb__inner{
  color: #fff;
} */
</style>
