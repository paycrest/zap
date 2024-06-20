import Image from "next/image";
import Link from "next/link";

interface SocialLinkProps {
  href: string;
  imagePath: string;
  alt: string;
  title?: string;
}

const SocialLink = ({ href, imagePath, alt, title }: SocialLinkProps) => {
  return (
    <Link href={href} title={title}>
      <Image src={imagePath} alt={alt} width={20} height={20} />
    </Link>
  );
};

const socials = [
  {
    href: "https://farcaster.io",
    imagePath: "/farcaster-icon.svg",
    alt: "Farcaster icon",
    title: "Farcaster",
  },
  {
    href: "https://github.com/paycrest",
    imagePath: "/github-icon.svg",
    alt: "GitHub icon",
    title: "GitHub",
  },
  {
    href: "https://x.com/paycrest",
    imagePath: "/x-icon.svg",
    alt: "X icon",
    title: "X",
  },
];

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
        {socials.map((social, index) => (
          <SocialLink key={index} {...social} />
        ))}
      </div>
    </footer>
  );
};
