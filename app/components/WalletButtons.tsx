import { useCallback } from "react";
import { useConnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { secondaryBtnClasses } from "./Styles";

export const WalletButtons = () => {
  const { connectors, connect, data } = useConnect();

  const createWallet = useCallback(() => {
    const coinbaseWalletConnector = connectors.find(
      (connector) => connector.id === "coinbaseWalletSDK",
    );
    if (coinbaseWalletConnector) {
      connect({ connector: coinbaseWalletConnector });
    }
  }, [connectors, connect]);

  return (
    <>
      <ConnectButton
        accountStatus={"address"}
        chainStatus={"none"}
        label={"Connect"}
        showBalance={false}
      />

      <button
        type="button"
        className={secondaryBtnClasses}
        onClick={createWallet}
      >
        Create wallet
      </button>
    </>
  );
};
