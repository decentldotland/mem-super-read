import axios from "axios";

export async function writeFunction(inputs, function_id, ignoreState) {
  try {
    const req = await axios.post(
      "https://api.mem.tech/api/transactions",
      {
        functionId: function_id,
        inputs: inputs,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    
    if (ignoreState) {
      delete req?.data?.data?.execution?.state;
    }

    return req?.data;
  } catch (error) {
    console.log(error);
    return {};
  }
}
