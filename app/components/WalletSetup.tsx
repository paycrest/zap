export const WalletSetup = () => {
  return (
    <>
      <button
        type="button"
        className="rounded-xl bg-blue-600 px-4 py-2.5 font-medium text-white transition-all hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-95 dark:focus-visible:ring-offset-neutral-900"
      >
        Connect Wallet
      </button>

      <button
        type="button"
        className="rounded-xl border border-gray-300 bg-transparent px-4 py-2.5 font-medium text-neutral-900 transition-all hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-95 dark:border-white/20 dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-offset-neutral-900"
      >
        Create Wallet
      </button>
    </>
  );
};
