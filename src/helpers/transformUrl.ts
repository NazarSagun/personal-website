export const transformUrl = (str: string) => {
  return str.split(" ").slice(0, 3).join("_").toLowerCase();
}
// export const transformUrlForServer = (str: string) => {
//   return str.split("_")
// }