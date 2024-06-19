import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="flex w-full items-center justify-between border-t border-dashed border-gray-200 pb-6 pt-4 dark:border-white/10">
      <p className="text-xs font-medium">
        <span className="text-gray-500 dark:text-white/80">
          &copy; 2024 Powered by
        </span>{" "}
        <span className="text-neutral-900 dark:text-white/50">Paycrest</span>
      </p>
      <div className="flex items-center justify-center gap-2">
        <Image
          src="/farcaster-icon.svg"
          alt="Farcaster icon"
          width={20}
          height={20}
        />
        <Image
          src="/github-icon.svg"
          alt="GitHub icon"
          width={20}
          height={20}
        />
        <Image src="/x-icon.svg" alt="X icon" width={20} height={20} />
      </div>
    </footer>
  );
};
