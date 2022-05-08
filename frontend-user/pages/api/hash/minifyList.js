import API from "../../../api";

export default async (req, res) => {
  const { headers, body } = req;
  try {
    const {
      data,
      headers: returnedHeaders,
      status,
    } = await API.get(
      "v1/hash/queryUrl?sortBy=creationTime&limit=100", // Node.js backend path
      { headers } // Headers from the Next.js Client
    );  
    //  Update headers on requester using headers from Node.js server response
    Object.entries(returnedHeaders).forEach((keyArr) =>
      res.setHeader(keyArr[0], keyArr[1])
    );
    res.status(status).send(data); // Send data from Node.js server response
  } catch ({ response: { status, data } }) {
    // Send status (probably 401) so the axios interceptor can run.
    res.status(status).json(data);
  }
};
