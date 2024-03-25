import service from "@/utils/request";

export function GetDetailed() {
  return service.request({
    method: "get",
    url: "/detailed/",
  });
}
