import fetch from "node-fetch";

let get = {};

get.JSON = async function (url, options) {
  var data = await fetch(url, options);
  return data.json();
};

// get.gql = async function (url, query, variables = {}) {
//   const data = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       query,
//       variables,
//     }),
//   });
//   return data.json();
// };

export { get };
