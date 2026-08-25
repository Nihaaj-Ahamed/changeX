import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  try {
    const res = await apiRequest("/posts/" + params.id);
    console.log("API Raw Response:", res.data); // Console-la check panna idhu uruthuna help pannaum
    return res.data;
  } catch (error) {
    console.error("Loader fetch error:", error);
    return null;
  }
};

// export const listPageLoader = async ({ request }) => {
//   const url = new URL(request.url);
//   const query = url.search; // Returns "?city=colombo" or empty string ""

//   const res = await apiRequest("/posts" + query);
//   return res.data;
// }
// };
export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1] || "";
  
  try {
    const res = await apiRequest("/posts?" + query);
    // Standard Object-a return pannungal (defer thevaiyilla)
    return {
      postResponse: res,
    };
  } catch (err) {
    console.error("Failed to load posts:", err);
    return { postResponse: { data: [] } };
  }
}

export const profilePageLoader = async () => {
  const postPromise = await apiRequest("/users/profilePosts");
  const chatPromise = await apiRequest("/chats");
 
  return {
    postResponse: postPromise,
    chatResponse: chatPromise,
  };
};
// export const profilePageLoader = async () => {
//   const postPromise = apiRequest("/users/profilePosts");
//   // const chatPromise = apiRequest("/chats");
//   return {
//     postResponse: postPromise,
//     // chatResponse: chatPromise,
//   };
// };