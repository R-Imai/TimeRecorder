import request from 'superagent';
import API from "./ApiList";

export function dailyCalc(query, callBack) {
  console.log(query)
  let url = API.Calc.Daily.replace("$path", query.path).replace("$day", query.day)
  request.get(API.UrlBase + url)
    .end(function(err, res){
      if (err === null) {
        let body = res.text;
        callBack(body)
      } else {
        callBack("APIへの送信がエラーになりました")
      }
    });
}
