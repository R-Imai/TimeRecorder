export const API = {
  UrlBase: "http://127.0.0.1:5000",
  Calc: {
    Daily: "/calc/daily?path=$path&day=$day"
  },
  Record: {
    Start: "/record/start",
    End: "/record/end",
    Get: "/record/get?path=$path&day=$day",
    Edit: "/record/edit"
  },
  Setting: {
    RecordPath: "/setting/path"
  }
};

export default API;
