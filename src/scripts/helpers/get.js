import fetch from "node-fetch";

const get = {};

get.JSON = async function (url, options) {
  var data = await fetch(url, options);
  return data.json();
};

get.gql = async function (url, query, variables = {}) {
  const data = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  return data.json();
};

get.StaticPaths = function (data) {
  const paths = data.map(function (project) {
    return {
      params: {
        path: project.local.pathname,
      },
      props: {
        ...project,
      },
    };
  });

  return paths;
};

/**
 * @name toRems
 * @prop {Number} value
 * @returns {String}
 */

get.rems = (value = 1) => String(value * 0.0625 + "rem");

export default get;
