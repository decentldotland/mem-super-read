import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

export async function readFunction(id) {
  const path = `function-state/${id}.json`;
  const data = await supabaseClient.storage
    .from(process.env.SUPABASE_BUCKET_NAME)
    .download(path);

  if (data.data) {
    const result = data.data;
    console.log(result);
    return new Uint8Array(await result.arrayBuffer());
  } else {
    return undefined;
  }
}
