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

// WalletConnect Cloud project ID
const projectId = "1300fc0abe89f84bc8d0ab10368bff6c";

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: projectId,
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
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
