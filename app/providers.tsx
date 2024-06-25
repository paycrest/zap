"use client";

import { ThemeProvider } from "next-themes";

import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import {
  getDefaultConfig,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: "Zap by Paycrest",
  projectId: "1300fc0abe89f84bc8d0ab10368bff6c",
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true,
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={lightTheme({
              borderRadius: "large",
              accentColor: "#3384F7",
              fontStack: "Inter" as "system",
            })}
          >
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
