import axios from "axios";
import "dotenv/config";

const api_url = process.env.API_URL;

const getDevfToken = async () => {
  const url = api_url + "api/v1/login";
  const payload = {
    username: process.env.DEVF_USERNAME,
    password: process.env.DEVF_PASSWORD,
  };

  const headers = {
    "Content-Type": "application/json",
    Origin: "https://thebrain.devf.la",
  };

  return axios.post(url, payload, { headers });
};

const lineupCron = async (token) => {
  let config = {
    method: "post",
    url: api_url + "api/v1/lineup/sensei",
    headers: {
      Origin: "https://thebrain.devf.la",
      Authorization: "Bearer " + token,
    },
  };

  axios
    .request(config)
    .then((response) => {
      console.log("Lineup cron executed successfully.");
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log("Error in lineupCron:", error.message);
    });
};

async function main() {
  const token = await getDevfToken();
  if (token.data.token) {
    await lineupCron(token.data.token);
  }
}

main();
