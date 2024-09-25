"use client";

import { ThemeProvider } from "next-themes";
import { PrivyProvider } from "@privy-io/react-auth";

import { BiconomyProvider } from "@biconomy/use-aa";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { base, baseSepolia } from "wagmi/chains";
import {
  connectorsForWallets,
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  bitgetWallet,
  braveWallet,
  bybitWallet,
  coinbaseWallet,
  imTokenWallet,
  ledgerWallet,
  metaMaskWallet,
  omniWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

if (
  !process.env.NEXT_PUBLIC_PAYMASTER_API_KEY ||
  !process.env.NEXT_PUBLIC_BUNDLER_URL
) {
  throw new Error("Missing env var");
}

const connectors = connectorsForWallets(
  [
    {
      groupName: "Popular",
      wallets: [
        metaMaskWallet,
        trustWallet,
        walletConnectWallet,
        rainbowWallet,
        coinbaseWallet,
      ],
    },
    {
      groupName: "More",
      wallets: [
        bybitWallet,
        braveWallet,
        bitgetWallet,
        ledgerWallet,
        argentWallet,
        omniWallet,
        imTokenWallet,
      ],
    },
  ],
  {
    appName: "noblocks by Paycrest",
    projectId: "1300fc0abe89f84bc8d0ab10368bff6c",
  },
);

export const config = getDefaultConfig({
  appName: "noblocks by Paycrest",
  projectId: "1300fc0abe89f84bc8d0ab10368bff6c",
  chains: [baseSepolia, base],
  ssr: true,
  // @ts-ignore
  connectors,
});

export default function Providers({ children }: { children: React.ReactNode }) {
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

  const biconomyPaymasterApiKey =
    process.env.NEXT_PUBLIC_PAYMASTER_API_KEY || "";
  const bundlerUrl = process.env.NEXT_PUBLIC_BUNDLER_URL || "";
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || "";

  const queryClient = new QueryClient();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <PrivyProvider
        appId={privyAppId}
        config={{
          appearance: {
            theme: "dark",
            accentColor: "#8B85F4",
            logo: "/logos/noblocks-logo.svg",
          },
          embeddedWallets: {
            createOnLogin: "all-users",
          },
        }}
      >
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider
              initialChain={environment === "mainnet" ? base : baseSepolia}
              theme={darkTheme({
                borderRadius: "large",
                accentColor: "#3384F7",
                fontStack: "Inter" as "system",
              })}
            >
              <BiconomyProvider
                config={{
                  biconomyPaymasterApiKey,
                  bundlerUrl,
                }}
                queryClient={queryClient}
              >
                {children}
              </BiconomyProvider>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </PrivyProvider>
    </ThemeProvider>
  );
}
