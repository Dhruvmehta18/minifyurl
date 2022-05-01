import API from "../../api";

export default async (req, res) => {
  const { headers } = req;
  try {
    const { data } = await API.get("user/me", {
      headers,
    });
    res.send(data);
  } catch ({ response: { status, data } }) {
    res.status(status).json(data);
  }
};
