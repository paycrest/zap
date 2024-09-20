import { IoIosCloseCircle } from "react-icons/io";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

export const VideoDialog = ({
  isOpen,
  onClose,
}: { isOpen: boolean; onClose: () => void }) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={onClose}
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
              onClick={onClose}
              className="absolute -top-8 right-0 z-50"
              aria-label="Close Modal"
            >
              <IoIosCloseCircle className="text-3xl lg:text-5xl dark:text-white/80 text-neutral-900" />
            </button>

            <div className="relative pt-[56.25%]">
              <iframe
                src="https://player.vimeo.com/video/996001927?badge=0&autopause=0&player_id=0&app_id=58479"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                title="noblocks Demo"
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
  );
};
