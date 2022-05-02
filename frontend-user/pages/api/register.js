import API from "../../api";

export default async (req, res) => {
  const { headers, body } = req;

  try {
    const { data, headers: returnedHeaders } = await API.post(
      "v1/auth/register",
      body,
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
