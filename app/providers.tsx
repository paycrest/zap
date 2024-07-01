"use client";

import { ThemeProvider } from "next-themes";

import { BiconomyProvider } from "@biconomy/use-aa";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { base, baseSepolia } from "wagmi/chains";
import {
  getDefaultConfig,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";

if (
  !process.env.NEXT_PUBLIC_PAYMASTER_API_KEY ||
  !process.env.NEXT_PUBLIC_BUNDLER_URL
) {
  throw new Error("Missing env var");
}

export const config = getDefaultConfig({
  appName: "Zap by Paycrest",
  projectId: "1300fc0abe89f84bc8d0ab10368bff6c",
  chains: [baseSepolia, base],
  ssr: true,
});

export default function Providers({ children }: { children: React.ReactNode }) {

  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

  const biconomyPaymasterApiKey =
    process.env.NEXT_PUBLIC_PAYMASTER_API_KEY || "";
  const bundlerUrl = process.env.NEXT_PUBLIC_BUNDLER_URL || "";

  const queryClient = new QueryClient();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            initialChain={environment === "mainnet" ? base : baseSepolia}
            theme={lightTheme({
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
    </ThemeProvider>
  );
}
