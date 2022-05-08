import axios from "axios";

export default async (req, res) => {
  const { headers } = req;

  try {
    const { data, headers: returnedHeaders } = await axios.delete(
      "v1/auth/logout",
      {
        headers,
      }
    );
    //  Update headers on requester using headers from Node.js server response
    Object.entries(returnedHeaders).forEach((keyArr) =>
      res.setHeader(keyArr[0], keyArr[1])
    );

    res.send(data);
  } catch ({ response: { status, data } }) {
    res.status(status).json(data);
  }
};
