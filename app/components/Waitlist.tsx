import Image from "next/image";
import {
  AnimatedComponent,
  fadeInOut,
  scaleInOut,
  slideInOut,
} from "./AnimatedComponents";
import {
  BNBIcon,
  BaseIcon,
  SolanaIcon,
  TronIcon,
  ZapIcon,
} from "./ImageAssets";
import { VideoDialog } from "./VideoDialog";
import { WaitlistForm } from "./WaitlistForm";

const networks = [
  { name: "BNB", Icon: BNBIcon },
  { name: "Base", Icon: BaseIcon },
  { name: "Tron", Icon: TronIcon },
  { name: "Solana", Icon: SolanaIcon },
];

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

export const Waitlist = ({
  isModalOpen,
  setIsModalOpen,
  setIsSubmitted,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  setIsSubmitted: (value: boolean) => void;
}) => {
  return (
    <>
      <AnimatedComponent variant={slideInOut} delay={0.4}>
        <h1 className="text-3xl font-semibold leading-normal text-neutral-900 dark:text-white">
          So{" "}
          <span className="text-primary font-extrabold font-playfair-display">
            fast
          </span>{" "}
          they ask "How's that even possible?"
          <ZapIcon className="size-6 inline-block align-middle" />
        </h1>
      </AnimatedComponent>

      <AnimatedComponent
        variant={fadeInOut}
        delay={0.6}
        className="leading-normal text-neutral-900 dark:text-white/80 font-light"
      >
        Convert your crypto to fiat at lightening speed. <br />
        Transfer them seamlessly to any bank account or mobile wallet.
      </AnimatedComponent>

      <AnimatedComponent variant={scaleInOut} delay={0.8}>
        <WaitlistForm onSuccess={() => setIsSubmitted(true)} />
      </AnimatedComponent>

      <AnimatedComponent
        variant={fadeInOut}
        delay={1}
        className="text-neutral-900 dark:text-white/80 font-light"
      >
        Supports
        <div className="inline-flex align-middle mx-2">
          {networks.map(({ name, Icon }, index) => (
            <NetworkIcon key={name} Icon={Icon} index={index} />
          ))}
        </div>
        networks
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

          <VideoDialog
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </>
      </AnimatedComponent>
    </>
  );
};