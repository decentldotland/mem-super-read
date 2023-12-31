<p align="center">
  <a href="https://decent.land">
    <img src="https://mem-home.vercel.app/icons/mem/mem-logo-v2.svg" height="180">
  </a>
  <h3 align="center"><code>@decentldotland/mem-super-read</code></h3>
  <p align="center">A gateway to access large MEM contracts state & onchain metadata </p>
</p>

## Endpoints

#### Base API endpoint: https://mem-api.com

- `GET /state/:function_id` : equivalento to `https://api.mem.tech/api/state/`
- `GET /mip3-state/:function_id` : equivalento to `https://api.mem.tech/api/state/` with [MIP-3](https://github.com/decentldotland/MIPs/blob/main/MIPs/mip-3.md) support.
- `GET /super-state/:function_id` : returns state plus additional onchain contract-related data.
- `GET /kv/:function_id`
- `POST /transactions` : same behavior of `https://api.mem.tech/api/transactions`
- `POST /mip3-transactions` : same behavior of `https://api.mem.tech/api/transactions` with [MIP-3](https://github.com/decentldotland/MIPs/blob/main/MIPs/mip-3.md) support.

## License
This repository is licensed under the [MIT license](./LICENSE)
