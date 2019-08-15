import request from 'superagent';
import axios from 'axios'
import API from "./ApiList";

export async function recordPathSet(path, callBack) {
  await axios.post(API.UrlBase + API.Setting.RecordPath, {path: path})
}

export async function recordPathGet() {
  const response = await axios.get(API.UrlBase + API.Setting.RecordPath)
  if (response.status !== 200) {
    return "APIへの送信がエラーになりました"
  }
  return response.data.path
}

export async function getActiveSubject() {
  const response = await axios.get(API.UrlBase + API.Setting.Subject)
  if (response.status !== 200) {
    return "APIへの送信がエラーになりました"
  }
  const data = response.data.filter((v) => {
    return v.is_active
  }).sort((a, b) => {
    return a.sort_val - b.sort_val
  }).map((v) => {
    return v.name
  })
  return data
}

export async function getSubjectColor() {
  const response = await axios.get(API.UrlBase + API.Setting.Subject)
  if (response.status !== 200) {
    return "APIへの送信がエラーになりました"
  }
  const actvData = response.data.filter((v) => {
    return v.is_active
  }).sort((a, b) => {
    return a.sort_val - b.sort_val
  })
  const noteData = response.data.filter((v) => {
    return !v.is_active
  }).sort((a, b) => {
    return a.sort_val - b.sort_val
  })
  return {active: actvData, note: noteData}
}

export async function sendSubjectColor(val) {
  await axios.put(API.UrlBase + API.Setting.Subject, val)
}

export function colorConfigGet(callBack) {
  request.get(API.UrlBase + API.Setting.GraphColor)
    .end(function(err, res){
      if (err === null) {
        let body = res.body;
        callBack(body)
      } else {
        callBack("APIへの送信がエラーになりました")
      }
    });
}

export function colorConfigSet(data, callBack) {
  request.put(API.UrlBase + API.Setting.GraphColor)
    .send({color_data: data})
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
