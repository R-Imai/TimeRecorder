export const API = {
  UrlBase: "http://127.0.0.1:5000",
  Calc: {
    Daily: "/calc/daily",
    Plot: "/graph/show?json=$json_path",
    Save: "/graph/save"
  },
  Record: {
    Start: "/record/start",
    End: "/record/end",
    Get: "/record/get",
    Edit: "/record/edit"
  },
  Setting: {
    RecordPath: "/setting/path",
    GraphColor: "/graph/color",
    Subject: "/setting/subject"
  }
};

export default API;
