import permission from "@/api/mockServeData/permission";
import Cookie from "js-cookie";
export default {
  state: {
    isCollapse: false, // 控制菜单的展开和收起
    activePath: "首页", // 当前激活的tab
    menu: [],
    permissions: {
      // 权限数据
      manager: [
        // 经理
        {
          path: "/home",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home.vue",
        },
        {
          path: "/course",
          name: "course",
          label: "课程管理",
          icon: "video-play",
          url: "Course.vue",
        },
        {
          path: "/application",
          name: "application",
          label: "申请管理",
          icon: "message-solid",
          url: "Application.vue",
        },
        {
          label: "员工管理",
          icon: "user",
          children: [
            {
              path: "/executor",
              name: "executor",
              label: "执行人管理",
              icon: "office-building",
              url: "Executor.vue",
            },
            {
              path: "/teacher",
              name: "teacher",
              label: "讲师管理",
              icon: "notebook-2",
              url: "Teacher.vue",
            },
          ],
        },
        {
          path: "/report",
          name: "report",
          label: "报表管理",
          icon: "data-analysis",
          url: "Report.vue",
        },
      ],
      executor: [
        // 执行者
        {
          path: "/home",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home.vue",
        },
        {
          path: "/course",
          name: "course",
          label: "课程管理",
          icon: "video-play",
          url: "Course.vue",
        },
      ],
      company: [
        // 软件公司
        {
          path: "/home",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home.vue",
        },
        {
          path: "/submitApplication",
          name: "submitApplication",
          label: "提交申请",
          icon: "s-promotion",
          url: "SubmitApplication.vue",
        },
      ],
    },
  },
  mutations: {
    // 修改菜单展开收起的方法
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    // 设置当前激活的tab
    setActivePath(state, path) {
      state.activePath = path;
      console.log(state.activePath);
    },
    // 设置menu的数据
    setMenu(state, val) {
      state.menu = state.permissions[val];
      Cookie.set("menu", JSON.stringify(state.permissions[val]));
    },
    // 动态注册路由
    addMenu(state, router) {
      // 判断缓存中是否有数据
      if (!Cookie.get("menu")) return;
      const menu = JSON.parse(Cookie.get("menu"));
      state.menu = menu;
      // 组装动态路由的数据
      const menuArray = [];
      menu.forEach((item) => {
        if (item.children) {
          item.children = item.children.map((item) => {
            item.component = () => import(`../views/${item.url}`);
            return item;
          });
          menuArray.push(...item.children);
        } else {
          item.component = () => import(`../views/${item.url}`);
          menuArray.push(item);
        }
      });
      // 路由的动态添加
      console.log(menuArray);
      menuArray.forEach((item) => {
        router.addRoute("Main", item);
      });
    },
  },
};