"use client";
import { useCallback, useEffect } from "react";
import { useAccount, useConnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { secondaryBtnClasses } from "./Styles";
import { trackEvent } from "@/hooks/analytics";

export const WalletButtons = () => {
  const { connectors, connect } = useConnect();
  const account = useAccount();

  useEffect(() => {
    if (account.status === "connected" && account.connector) {
      trackEvent("wallet_connected", {
        wallet: account.connector.name,
      });
    }
  }, [account.status, account.connector]);

  const createWallet = useCallback(() => {
    trackEvent("cta_clicked", {
      cta: "Create wallet",
      position: "Navbar",
    });
    const coinbaseWalletConnector = connectors.find(
      (connector) => connector.id === "coinbaseWalletSDK",
    );
    if (coinbaseWalletConnector) {
      connect({ connector: coinbaseWalletConnector });
    }
  }, [connectors, connect]);

  return (
    <>
      <div
        onClick={() => {
          trackEvent("cta_clicked", {
            cta: "Connect wallet",
            position: "Navbar",
          });
        }}
      >
        <ConnectButton
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "full",
          }}
          chainStatus={"none"}
          label={"Connect"}
          showBalance={false}
        />
      </div>

      {!account.isConnected && (
        <button
          type="button"
          className={secondaryBtnClasses}
          onClick={createWallet}
        >
          Create wallet
        </button>
      )}
    </>
  );
};
