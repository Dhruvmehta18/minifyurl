import api from "../../api";

export default async (req, res) => {
  const { headers, body } = req;
  try {
    const { data, headers: returnedHeaders } = await api.post(
      "v1/auth/refresh-tokens", // refresh token Node.js server path
      body,
      {
        headers,
      }
    );

    //  Update headers on requester using headers from Node.js server response
    Object.keys(returnedHeaders).forEach((key) =>
      res.setHeader(key, returnedHeaders[key])
    );

    res.status(200).json(data);
  } catch (error) {
    // we don't want to send status 401 here.
    res.send(error);
  }
};
