"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import {
  BaseIcon,
  BNBIcon,
  SolanaIcon,
  TronIcon,
  ZapIcon,
} from "./components/ImageAssets";
import {
  AnimatedComponent,
  AnimatedPage,
  fadeInOut,
  Footer,
  Navbar,
  Preloader,
  scaleInOut,
  slideInOut,
  WaitlistForm,
} from "./components";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

const NetworkIcon = ({
  Icon,
  index,
}: {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  index: number;
}) => (
  <Icon
    className={`size-7 border-2 border-white bg-white transition dark:bg-neutral-900 dark:border-neutral-900 rounded-full ${index > 0 ? "-ml-2" : ""}`}
  />
);

export default function Home() {
  const { resolvedTheme } = useTheme();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const networks = [
    { name: "BNB", Icon: BNBIcon },
    { name: "Base", Icon: BaseIcon },
    { name: "Tron", Icon: TronIcon },
    { name: "Solana", Icon: SolanaIcon },
  ];

  useEffect(() => {
    setIsPageLoading(false);
  }, []);

  return (
    <AnimatedPage componentKey="home">
      <Preloader isLoading={isPageLoading} />

      <div className="w-full transition-colors bg-white dark:bg-neutral-900">
        <div className="max-w-screen-2xl mx-auto px-4 lg:pl-16 lg:pr-0 flex justify-between gap-10">
          <div className="relative flex max-w-md mx-auto lg:mx-0 flex-col gap-20 min-h-screen flex-1">
            <Navbar />

            <main className="w-full flex-grow space-y-4">
              <AnimatedComponent variant={slideInOut} delay={0.4}>
                <h1 className="text-3xl font-semibold leading-normal text-neutral-900 dark:text-white">
                  So{" "}
                  <span className="text-sky-500 font-extrabold font-playfair-display">
                    fast
                  </span>{" "}
                  they ask "How's that even possible?"
                  <ZapIcon className="size-6 inline-block align-middle" />
                </h1>
              </AnimatedComponent>

              <AnimatedComponent variant={fadeInOut} delay={0.6}>
                <p className="leading-normal text-neutral-900 dark:text-white/80 font-light">
                  Convert your crypto to fiat at lightening speed. <br />
                  Transfer them seamlessly to any bank account or mobile wallet.
                </p>
              </AnimatedComponent>

              <AnimatedComponent variant={scaleInOut} delay={0.8}>
                <WaitlistForm />
              </AnimatedComponent>

              <AnimatedComponent variant={fadeInOut} delay={1}>
                <div className="text-neutral-900 dark:text-white/80 font-light">
                  Supports
                  <div className="inline-flex align-middle mx-2">
                    {networks.map(({ name, Icon }, index) => (
                      <NetworkIcon key={name} Icon={Icon} index={index} />
                    ))}
                  </div>
                  networks
                </div>
              </AnimatedComponent>

              <AnimatedComponent variant={fadeInOut} delay={1.2}>
                <div className="flex items-center gap-3.5">
                  <button type="button" onClick={() => setIsModalOpen(true)}>
                    <div className="sr-only">Watch how Zap works</div>
                    <Image
                      src="/video-icon.svg"
                      alt="Video Icon"
                      width={24}
                      height={24}
                      className="hover:shadow-md transition shadow-neutral-900 dark:shadow-white/20 rounded-md w-6 h-6"
                    />
                  </button>

                  <p className="text-neutral-900 dark:text-white/80 font-light">
                    See how it works
                  </p>

                  <Dialog
                    open={isModalOpen}
                    as="div"
                    className="relative z-10 focus:outline-none"
                    onClose={() => setIsModalOpen(false)}
                  >
                    <DialogBackdrop
                      transition
                      className="fixed inset-0 bg-black/30 backdrop-blur-sm duration-300 ease-out data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                      <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                          transition
                          className="w-full max-w-3xl p-4 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                          <div className="relative pt-[56.25%]">
                            <iframe
                              src="https://player.vimeo.com/video/995054247?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                              title="Zap Demo"
                              allowTransparency
                              allowFullScreen
                              className="absolute inset-0 w-full h-full rounded-2xl"
                            />
                          </div>
                          <script src="https://player.vimeo.com/api/player.js" />
                        </DialogPanel>
                      </div>
                    </div>
                  </Dialog>
                </div>
              </AnimatedComponent>
            </main>

            <Footer />
          </div>

          <AnimatedComponent
            variant={fadeInOut}
            delay={0.4}
            className="w-full max-w-xl h-screen flex-1 hidden lg:block sticky top-0 right-0"
          >
            <Image
              src={
                !isPageLoading && resolvedTheme === "dark"
                  ? "/transaction-illustration-dark.png"
                  : "/transaction-illustration-light.png"
              }
              alt="Transaction Illustration"
              className="h-full w-full object-top object-contain"
              width={600}
              height={600}
              priority
            />
          </AnimatedComponent>
        </div>
      </div>
    </AnimatedPage>
  );
}
