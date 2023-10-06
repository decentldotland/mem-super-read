import axios from "axios";

export async function writeContract(inputs, function_id) {
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

    return req?.data;
  } catch (error) {
    console.log(error);
    return {};
  }
}
