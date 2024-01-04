// implement MIP-3 https://github.com/decentldotland/MIPs/blob/main/MIPs/mip-3.md
import { readFunction } from "./supabase.js";
import { writeFunction } from "./write.js";
import axios from "axios";

const MIP_3_REGISTRY = `lhTHcou2Y-PUx4Sn-xzDhk8bXJ2dCz9OvlMD_Wv2gfg`;

async function getLatestVersion(function_id) {
  try {
    const registry = (
      await axios.get(`https://api.mem.tech/api/state/${MIP_3_REGISTRY}`)
    )?.data?.registry;

    if (!(function_id in registry)) {
      return function_id;
    }

    return registry[function_id]?.latest;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function mip3ReadFunction(id) {
  try {
    const latest_id = await getLatestVersion(id);
    return await readFunction(latest_id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function mip3WriteFunction(inputs, function_id, ignoreState) {
  try {
    const latest_id = await getLatestVersion(function_id);
    await writeFunction(inputs, latest_id, ignoreState);
  } catch (error) {
    console.log(error);
    return {};
  }
}
