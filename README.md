<h1>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github-production-user-asset-6210df.s3.amazonaws.com/87664239/344419935-b325a355-2d9e-4e22-96be-0a7cb77722c8.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240629%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240629T172639Z&X-Amz-Expires=300&X-Amz-Signature=559a149a95637bc744147b4229702808a83ee151678f38608df13d722338914d&X-Amz-SignedHeaders=host&actor_id=87664239&key_id=0&repo_id=816323837">
  <img alt="Zap logo" src="https://private-user-images.githubusercontent.com/87664239/344420186-73e4f426-5da9-4e4e-aab2-b7f995fea8f1.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTk2ODIzNzUsIm5iZiI6MTcxOTY4MjA3NSwicGF0aCI6Ii84NzY2NDIzOS8zNDQ0MjAxODYtNzNlNGY0MjYtNWRhOS00ZTRlLWFhYjItYjdmOTk1ZmVhOGYxLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA2MjklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNjI5VDE3Mjc1NVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTRjZTk0YmJmZmM0OGNkOTlhZDM4OTM0MjEzODZhMWNjMzNhN2I5ZjcyZWRmNWM4YmQ4ZWVkMDY4YTkyNTdlYjcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.ZtWHEJXAYKiGAsctWzMYpqsqtx1Ym021ZOg_311nXgQ">
</picture>
</h1>

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Viem](https://img.shields.io/badge/Viem-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white) ![Wagmi](https://img.shields.io/badge/Wagmi-FF4088?style=for-the-badge&logo=wagmi&logoColor=white) ![RainbowKit](https://img.shields.io/badge/RainbowKit-FF4088?style=for-the-badge&logo=rainbowkit&logoColor=white)

Zap by Paycrest is a decentralized application (dApp) developed for the [OnChain Hackathon](https://onchain-summer.devfolio.co/). Our goal is to simplify the conversion of cryptocurrency to fiat currency. Leveraging modern web technologies, we aim to provide a seamless and efficient user experience. 

Check out our live demo at [zapsend.xyz](https://zapsend.xyz).

## 🚀 Running Locally

To run Zap locally, follow these steps:

```bash
git clone https://github.com/paycrest/zap.git
cd zap
npm install
npm run dev
```

Don't forget to fill in the necessary variables in the `.env.local` file according to the template provided in [`.env.example`](.env.example).

Then, visit [http://localhost:3000](http://localhost:3000) to start converting crypto to fiat.

## 📚 How It Works

Zap streamlines the conversion process through a simple flow:

1. **Zap:** Users initiate the conversion using the Zap interface.
2. **Gateway Smart Contract:** The request is processed through a smart contract.
3. **Aggregator:** Optimizes the conversion route for efficiency.
4. **Provider Node(s):** Executes the conversion on the blockchain.
5. **Recipient:** The fiat currency is sent to the recipient's account.

For more details, visit [paycrest.io](https://paycrest.io).

### Zap is built on Paycrest Protocol

| Before      | Now |
| ----------- | ----------- |
| ![image](https://github.com/paycrest/zap/assets/87664239/73548ada-bde5-41f5-8af6-0f9f943c763f) | ![image](https://github.com/paycrest/zap/assets/87664239/495e166f-54cf-4951-9cdd-92b9357e8608) |

## ✨ Features

- **Easy Conversion:** Convert crypto to fiat easily.
- **Security:** Advanced security to protect your transactions.
- **Accessibility:** Use on any device, anywhere.

## 🛠️ Technologies Used

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Viem](https://viem.sh/)
- [Wagmi](https://wagmi.sh/)
- [RainbowKit](https://www.rainbowkit.com/)

## ⚠️ Disclaimer Notice

This application is for demo use only. Any transactions conducted within this app are for illustrative purposes and use simulated data. While the app records real transactions, it is not connected to any actual financial institutions or cryptocurrency networks.

Therefore:

- The exchange rates and conversion values displayed are for demonstration purposes and may not reflect real-world market conditions.
- Any financial decisions made based on information from this app are at your own risk.
- This application should not be used for making real financial transactions.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

<!--

![dark-mode-logo](https://github.com/paycrest/zap/assets/87664239/b325a355-2d9e-4e22-96be-0a7cb77722c8)

![light-mode-logo](https://github.com/paycrest/zap/assets/87664239/73e4f426-5da9-4e4e-aab2-b7f995fea8f1)

-->
