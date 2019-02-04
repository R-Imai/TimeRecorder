import request from 'superagent';
import API from "./ApiList";

export function recordStart(val, callBack) {
  request.post(API.UrlBase + API.Record.Start)
    .send({val: val})
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

export function recordStartGet(callBack) {
  request.get(API.UrlBase + API.Record.Start)
    .end(function(err, res){
      if (err === null) {
        let body = res.text;
        callBack(body)
      } else {
        callBack("APIへの送信がエラーになりました")
      }
    });
}

export function recordEnd(param, callBack) {
  request.post(API.UrlBase + API.Record.End)
    .send(param)
    .set('Accept', 'application/json')
    .end(function(err, res){
      if (err === null) {
        let body = res.body;
        callBack(body)
      } else {
        callBack("APIへの送信がエラーになりました")
      }
    });
}

export function recordGet(path, day, callBack){
  const url = API.Record.Get.replace("$path", path).replace("$day", day)
  request.get(API.UrlBase + url)
    .end(function(err, res){
      if (err === null) {
        let body = res.body;
        callBack(body)
      } else {
        callBack("APIへの送信がエラーになりました")
      }
    });
}

export function recordEdit(path, val, day, callBack) {
  const param = {path: path, val: val, day: day}
  request.post(API.UrlBase + API.Record.Edit)
    .send(param)
    .set('Accept', 'application/json')
    .end(function(err, res){
      if (err === null) {
        let body = res.body;
        callBack(body)
      } else {
        callBack("APIへの送信がエラーになりました")
      }
    });
}
