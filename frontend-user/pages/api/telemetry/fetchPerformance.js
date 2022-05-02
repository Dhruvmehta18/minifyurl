import API from "../../../api";

export default async (req, res) => {
  const { headers, query } = req;
  console.log(query);
  const queryString = Object.keys(query).map(key => `${key}=${query[key]}`).join("&")
  try {
    const { data } = await API.get(`v1/telemetry/qyeryTelemetry?${queryString}`, {
      headers,
    });
    res.send(data);
  } catch ({ response: { status, data } }) {
    res.status(status).json(data);
  }
};
