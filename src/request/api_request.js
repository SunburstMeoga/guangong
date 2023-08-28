import { config } from "@/const/config";
import axios from "axios";

export async function hotList() {
  const result = await axios.get(`${config.api}nft/hot`);
  return result;
}

export async function ownerList(address) {
  const result = await axios.get(`${config.api}nft/owner/${address}`);
  return result;
}
