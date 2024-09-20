import { ConfettiIcon } from "./ImageAssets";
import { buttonStyles } from "./WaitlistForm";
import { AnimatedComponent, fadeInOut, slideInOut } from "./AnimatedComponents";

export const YouAreIn = ({ onDone }: { onDone: () => void }) => {
  return (
    <>
      <AnimatedComponent variant={fadeInOut} delay={0.4}>
        <ConfettiIcon />
      </AnimatedComponent>

      <AnimatedComponent
        variant={slideInOut}
        className="text-neutral-900 dark:text-white text-3xl font-semibold"
      >
        You are in
      </AnimatedComponent>

      <AnimatedComponent
        variant={fadeInOut}
        delay={0.4}
        className="text-neutral-900 dark:text-white/80 font-light"
      >
        Hey champ, your email has been received. We will notify your inbox when
        we launch
      </AnimatedComponent>

      <AnimatedComponent variant={fadeInOut} delay={0.6}>
        <button type="button" className={buttonStyles} onClick={onDone}>
          Done
        </button>
      </AnimatedComponent>
    </>
  );
};
