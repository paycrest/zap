import type { TabButtonProps } from "../types";

export const TabButton = ({
  tab,
  selectedTab,
  handleTabChange,
}: TabButtonProps) => (
  <button
    type="button"
    className={`flex-1 rounded-full px-5 py-2.5 transition-all duration-300 ${
      selectedTab === tab
        ? "border border-gray-300 bg-white text-neutral-900 shadow dark:border-white/20 dark:bg-transparent dark:text-white"
        : "border border-transparent text-gray-400 dark:text-white/40"
    }`}
    onClick={() => handleTabChange(tab)}
  >
    {
      {
        "bank-transfer": "Bank transfer",
        "mobile-money": "Mobile money",
      }[tab]
    }
  </button>
);
