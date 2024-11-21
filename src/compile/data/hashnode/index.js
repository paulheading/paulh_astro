import { get } from "#helpers";

import { GET_USER_ARTICLES } from "#hashnode/queries";

async function getHashnodeData() {
  const data = await get
    .gql("https://api.hashnode.com/", GET_USER_ARTICLES, { page: 0 })
    .then(({ data }) => data.user.publication.posts);
  return data;
}

export default getHashnodeData;
