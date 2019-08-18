import axios from 'axios'
import API from "./ApiList";

export async function dailyCalc(query) {
  const response = await axios.get(API.UrlBase + API.Calc.Daily, {params: query})
  if (response.status !== 200) {
    return "APIへの送信がエラーになりました"
  }
  return response.data.str
}

export async function save(query, callBack) {
  const response = await axios.get(API.UrlBase + API.Calc.Save, query)
  if (response.status !== 200) {
    return "APIへの送信がエラーになりました"
  }
  return API.UrlBase + "/" + response.data.path
}
