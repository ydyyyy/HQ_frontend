import http from "@/utils/request";

//请求首页数据
export const getData = () => {
  // 返回一个promise对象
  return http.get("/home/getData");
};

//获取
export const getUser = (params) => {
  return http.get("/user/getUser", params);
};

                                                  export const getCourse = (params) => {
                                                    return http.get("/course/getCourse", params);
                                                  };

export const getTeacher = (params) => {
  return http.get("/teacher/getTeacher", params);
};
export const getExecutor = (params) => {
  return http.get("/executor/getExecutor", params);
};

//添加
export const addUser = (data) => {
  return http.post("/user/add", data);
};
                                                  export const addCourse = (data) => {
                                                    return http.post("/course/add", data);
                                                  };
export const addTeacher = (data) => {
  return http.post("/teacher/add", data);
};
export const addExecutor = (data) => {
  return http.post("/executor/add", data);
};

//编辑
export const editUser = (data) => {
  return http.post("/user/edit", data);
};
                                                  export const editCourse = (data) => {
                                                    return http.post("/course/edit", data);
                                                  };
export const editTeacher = (data) => {
  return http.post("/teacher/edit", data);
};
export const editExecutor = (data) => {
  return http.post("/executor/edit", data);
};


//删除
export const delUser = (data) => {
  return http.post("/user/del", data);
};
export const delCourse = (data) => {
  return http.post("/course/del", data);
};
export const delTeacher = (data) => {
  return http.post("/teacher/del", data);
};
export const delExecutor = (data) => {
  return http.post("/executor/del", data);
};

                                              export const getMenu = (data) => {
                                                return http.post("/permission/getMenu", data);
                                              };