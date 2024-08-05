# Waitlist • Zap ![image](https://github.com/paycrest/zap/assets/87664239/152fa090-fea7-4553-ba98-1fd3bf9cb4b9)

![Shield3](https://img.shields.io/badge/Shield3-0c0c0c?style=for-the-badge&logo=shield3&logoColor=white) ![Biconomy](https://img.shields.io/badge/Biconomy-ff4e17?style=for-the-badge&logo=biconomy&logoColor=white) ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-0f172a?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Viem](https://img.shields.io/badge/Viem-232225?style=for-the-badge&logo=vue.js&logoColor=white) ![Wagmi](https://img.shields.io/badge/Wagmi-1b1b1f?style=for-the-badge&logo=wagmi&logoColor=white) ![RainbowKit](https://img.shields.io/badge/RainbowKit-6e66ee?style=for-the-badge&logo=rainbowkit&logoColor=white)

Zap by Paycrest is a dApp developed for the [Onchain Summer Buildathon](https://onchain-summer.devfolio.co/). Our goal is to simplify the conversion of cryptocurrency to local currency by leveraging a decentralized liquidity protocol, we aim to provide a seamless and efficient user experience.

Check out our live demo at [zap.paycrest.io](https://zap.paycrest.io).

## 🚀 Running Locally

To run Zap Waitlist locally, follow these steps:

```bash
git clone https://github.com/paycrest/zap.git
cd zap
npm install
npm run dev
```

Then, visit [http://localhost:3000](http://localhost:3000) to view the waitlist page.

## 📚 How It Works

Zap streamlines the conversion process through a simple flow:

1. **Create Order:** User creates an order on the [Gateway Smart Contract](https://github.com/paycrest/contracts) (escrow) through the Zap interface.
2. **Aggregate:** Paycrest Protocol Aggregator indexes the order and assigns it to one or more [Provision Nodes](https://github.com/paycrest/provider) run by liquidity providers.
3. **Fulfill:** The provisioning node automatically disburses funds to the recipient's local bank account or mobile money wallet via connections to payment service providers (PSP).

For more details, visit [paycrest.io](https://paycrest.io).

### Zap is built on Paycrest Protocol

| Before      | Now |
| ----------- | ----------- |
| ![image](https://github.com/paycrest/zap/assets/87664239/73548ada-bde5-41f5-8af6-0f9f943c763f) | ![image](https://github.com/paycrest/zap/assets/87664239/495e166f-54cf-4951-9cdd-92b9357e8608) |

## 🛠️ Technologies Used

- [Shield3](https://shield3.com/) for OFAC compliance
- [Biconomy](https://biconomy.io/) for gasless transactions

## ⚠️ Disclaimer Notice

This application is for demo use only. Any transactions conducted within this app are for illustrative purposes.

Therefore:

While the app records real transactions, please exercise caution and do not use this app as is in a production environment. Use at your own risk. The developers are not responsible for any issues or damages that may arise from the use of this app.

## 📄 License

This project is licensed under the [Affero General Public License v3.0](LICENSE).
