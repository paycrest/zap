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
import { IoIosCloseCircle } from "react-icons/io";
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
                <>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-3.5 group"
                  >
                    <Image
                      src="/video-icon.svg"
                      alt="Video Icon"
                      width={24}
                      height={24}
                      aria-label="Video Icon"
                      className="transition rounded-md w-6 h-5 inline-block align-middle border border-transparent group-hover:border-gray-300 group-hover:dark:border-white/20"
                    />

                    <p className="text-neutral-900 dark:text-white/80 font-light group-hover:text-neutral-700 dark:group-hover:text-white transition-colors">
                      See how it works
                    </p>
                  </button>

                  <Dialog
                    open={isModalOpen}
                    as="div"
                    className="relative z-10 focus:outline-none"
                    onClose={() => setIsModalOpen(false)}
                  >
                    <DialogBackdrop
                      transition
                      className="fixed inset-0 bg-black/70 backdrop-blur-md duration-300 ease-out data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                      <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                          transition
                          className="relative w-full max-w-screen-xl p-4 sm:p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                          <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="absolute -top-8 right-0 z-50"
                            aria-label="Close Modal"
                          >
                            <IoIosCloseCircle className="text-3xl lg:text-5xl dark:text-white/80 text-neutral-900" />
                          </button>

                          <div className="relative pt-[56.25%]">
                            <iframe
                              src="https://player.vimeo.com/video/996001927?badge=0&autopause=0&player_id=0&app_id=58479"
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
                </>
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
