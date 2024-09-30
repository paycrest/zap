## Waitlist • ![image](/public/images/logo.png)

[![Next.js](https://img.shields.io/badge/-Next.js-61DAFB?logo=Next.js&logoColor=white&color=11172a)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/-TypeScript-FFA500?logo=TypeScript&logoColor=blue&color=11172a)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?logo=Tailwind%20CSS&logoColor=blue&color=11172a)](https://tailwindcss.com/)
[![Biome](https://img.shields.io/badge/-Biome-FFA500?logo=Biome&logoColor=blue&color=11172a)](https://biomejs.dev/)

This branch contains the codebase for noblocks waitlist page. Noblocks simplifies cryptocurrency-to-local currency conversion using a decentralized liquidity protocol, providing a seamless user experience powered by [Paycrest Protocol](https://paycrest.io/).

Visit the live site at [noblocks.xyz](https://noblocks.xyz) and join the waitlist to stay updated on our launch.

## Running Locally

To run the project locally, follow these steps:

1. Clone the repository and switch to the waitlist branch:

   ```bash
   git clone https://github.com/paycrest/noblocks.git
   cd noblocks
   git checkout waitlist
   ```

2. Configure environment variables:

   - Copy the [`env.example`](.env.example) file to `.env.local`

     ```bash
     cp .env.example .env.local
     ```

   - Add the required environment variables.

3. Install dependencies and start the development server:

   ```bash
   pnpm install
   pnpm dev
   ```

4. Visit [localhost:3000](http://localhost:3000) to view the waitlist page locally.
