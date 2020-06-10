import request from "@/utils/request";

export function getWtdData(params) {
  return request({
    url: "/report/getWtdData",
    method: "POST",
    data: params
  });
}
