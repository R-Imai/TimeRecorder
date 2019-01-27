import request from 'superagent';
import API from "./ApiList";

export function recordPathSet(path, callBack) {
  request.post(API.UrlBase + API.Setting.RecordPath)
    .send({path: path})
    .set('Accept', 'application/json')
    .end(function(err, res){
      if (err === null) {
        let body = res.text;
        callBack(body)
      } else {
        callBack("APIへの送信がエラーになりました")
      }
    });
}

export function recordPathGet(callBack) {
  request.get(API.UrlBase + API.Setting.RecordPath)
    .end(function(err, res){
      if (err === null) {
        let body = res.text;
        callBack(body)
      } else {
        callBack("APIへの送信がエラーになりました")
      }
    });
}
