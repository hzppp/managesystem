<template>
  <el-menu
    :collapse="isCollapse"
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3 v-show="isCollapse">PP</h3>
    <h3 v-show="!isCollapse">PP's test(vue+elementui)</h3>
    <el-menu-item
      :index="item.path"
      v-for="item in noChildren"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu index="index" v-for="(item, index) in hasChildren" :key="index">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span>{{ item.label }}</span>
      </template>

      <el-menu-item-group>
        <el-menu-item 
        :index="subItem.path" 
        v-for="(subItem, subIndex) in item.children" 
        :key="subIndex"
        @click="clickMenu(subItem)">
          <i :class="'el-icon-' + subItem.icon"></i>
          <span slot="title">{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      asideMenu: [
        {
          name : 'home',
          path: "/",
          label: "首页",
          icon: "s-home",
        },
        {
          name : 'video',
          path: "/video",
          label: "视频管理",
          icon: "video-play",
        },
        {
          name : 'user',
          path: "/user",
          label: "用户管理",
          icon: "user",
        },
        {
          label: "其他",
          icon: "more",
          children: [
            {
              name : 'page1',
              path: "/page1",
              label: "页面1",
              icon: "setting",
            },
            {
              name : 'page2',
              path: "/page2",
              label: "页面2",
              icon: "setting",
            },
          ],
        },
      ],
    };
  },
  computed: {
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menu.filter((item) => item.children);
    },
    isCollapse(){
      return this.$store.state.tab.isCollapse;
    },
    menu(){
      return this.$store.state.tab.menu
    }
  },
  methods : {
    clickMenu(item){
      if(this.$route.name != item.name){
        this.$router.push({ name: item.name })
      }
      this.$store.commit('selectMenu', item);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #ffffff;
    text-align: center;
    line-height: 48px;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
