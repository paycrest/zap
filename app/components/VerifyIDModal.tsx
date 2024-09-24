"use client";
import { useState, useCallback } from "react";
import { QRCode } from "react-qrcode-logo";
import {
  Checkbox,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Field,
  Label,
} from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

import {
  CheckIcon,
  CopyIcon,
  SadFaceIcon,
  UserDetailsIcon,
  VerificationPendingIcon,
} from "./ImageAssets";
import { primaryBtnClasses, secondaryBtnClasses } from "./Styles";
import { PiCaretLeft, PiCheck } from "react-icons/pi";

const STEPS = {
  TERMS: "terms",
  QR_CODE: "qr_code",
  STATUS: {
    PENDING: "pending",
    SUCCESS: "success",
    FAILED: "failed",
  },
} as const;

type Step =
  | typeof STEPS.TERMS
  | typeof STEPS.QR_CODE
  | (typeof STEPS.STATUS)[keyof typeof STEPS.STATUS];

const terms = [
  {
    id: "privacyPolicy",
    label: "Privacy Policy",
    url: "https://paycrest.io/",
  },
  {
    id: "antiMoneyLaunderingPolicy",
    label: "Anti Money Laundering Policy",
    url: "https://paycrest.io/",
  },
  {
    id: "termsAndConditions",
    label: "Terms and Conditions",
    url: "https://paycrest.io/",
  },
] as const;

const fadeInOut = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};

export const VerifyIDModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>(STEPS.STATUS.FAILED);
  const [isUrlCopied, setIsUrlCopied] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState<Record<string, boolean>>(
    Object.fromEntries(terms.map((term) => [term.id, false])),
  );

  const handleTermChange = useCallback((termId: string, value: boolean) => {
    setTermsAccepted((prev) => ({ ...prev, [termId]: value }));
  }, []);

  const isAllTermsAccepted = Object.values(termsAccepted).every(Boolean);

  const handleCopyUrl = useCallback(() => {
    navigator.clipboard.writeText("https://paycrest.io/");
    setIsUrlCopied(true);
    setTimeout(() => setIsUrlCopied(false), 2000);
  }, []);

  const QRCodeComponent = useCallback(
    () => (
      <div className="w-full">
        <QRCode
          value="https://www.jeremy0x.codes"
          qrStyle="dots"
          eyeRadius={20}
          logoImage="/images/user-qr-logo.png"
          bgColor="#F9FAFB"
          style={{
            borderRadius: "32px",
            margin: "0 auto",
            width: "100%",
            maxWidth: "360px",
            objectFit: "contain",
            height: "auto",
          }}
          removeQrCodeBehindLogo
          quietZone={16}
          size={256}
        />
      </div>
    ),
    [],
  );

  const renderTerms = () => (
    <motion.div key="terms" {...fadeInOut} className="space-y-4">
      <div className="space-y-3">
        <UserDetailsIcon />
        <DialogTitle className="text-lg font-bold">
          Verify your identity in{" "}
          <span className="bg-gradient-to-br from-green-400 via-orange-400 to-orange-600 bg-clip-text text-transparent">
            2 minutes
          </span>
        </DialogTitle>
      </div>

      <div className="space-y-6 rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:border-white/10 dark:bg-white/5">
        <h4 className="text-base font-medium text-neutral-800 dark:text-white/80">
          Accept terms to get started
        </h4>

        {terms.map((term) => (
          <Field key={term.id} className="flex gap-6">
            <Checkbox
              checked={termsAccepted[term.id]}
              onChange={(checked) => handleTermChange(term.id, checked)}
              className="group mt-1 block size-5 flex-shrink-0 cursor-pointer rounded border-2 border-gray-300 bg-transparent data-[checked]:border-primary data-[checked]:bg-primary dark:border-white/30 dark:data-[checked]:border-primary"
            >
              <svg
                className="stroke-neutral-800 opacity-0 group-data-[checked]:opacity-100"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M3 8L6 11L11 3.5"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Checkbox>
            <Label className="grid cursor-pointer gap-2 text-gray-500 dark:text-white/50">
              <p>
                I understand we are committed to protecting your privacy and
                will not share your personal information without
              </p>
              <a
                href={term.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  window.open(term.url, "_blank");
                }}
              >
                Read full {term.label}
              </a>
            </Label>
          </Field>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-100 p-4 dark:border-white/10">
        <p className="text-xs text-gray-500 dark:text-white/50">
          By clicking “sign and continue” below, you are agreeing to the terms
          and policies above
        </p>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className={secondaryBtnClasses}
        >
          No, thanks
        </button>
        <button
          type="button"
          className={`${primaryBtnClasses} w-full`}
          disabled={!isAllTermsAccepted}
          onClick={() => setStep(STEPS.QR_CODE)}
        >
          Sign and continue
        </button>
      </div>
    </motion.div>
  );

  const renderQRCode = () => (
    <motion.div key="qr_code" {...fadeInOut} className="space-y-4">
      <div className="relative">
        <button
          type="button"
          onClick={() => setStep(STEPS.TERMS)}
          className="absolute left-1 top-1.5"
        >
          <PiCaretLeft className="text-lg text-gray-500 dark:text-white/50" />
        </button>
        <DialogTitle className="mx-auto text-center text-lg font-semibold">
          Verify with your phone or URL
        </DialogTitle>
      </div>

      <p className="mx-auto text-center text-gray-500 dark:text-white/50">
        Scan with your phone to have the best verification experience. You can
        also copy the url below
      </p>

      <QRCodeComponent />

      <div className="flex w-full items-center justify-center gap-3">
        <hr className="h-px w-full bg-gray-100 opacity-10 dark:bg-white/5" />
        <p className="text-xs text-gray-500 dark:text-white/50">Or</p>
        <hr className="h-px w-full bg-gray-100 opacity-10 dark:bg-white/5" />
      </div>

      <button
        type="button"
        className={`${secondaryBtnClasses} flex w-full items-center justify-center gap-2`}
        onClick={handleCopyUrl}
      >
        {isUrlCopied ? <PiCheck className="text-lg" /> : <CopyIcon />}
        {isUrlCopied ? "URL Copied" : "Copy URL"}
      </button>
    </motion.div>
  );

  const renderPendingStatus = () => (
    <motion.div key="pending" {...fadeInOut} className="space-y-6 pt-4">
      <VerificationPendingIcon className="mx-auto" />

      <div className="space-y-3 pb-5 text-center">
        <DialogTitle className="text-lg font-semibold">
          Verification in progress
        </DialogTitle>

        <p className="text-gray-500 dark:text-white/50">
          We are verifying your identity. This will only take a few minutes.
          Kindly check back soon
        </p>
      </div>

      <button
        type="button"
        className={`${primaryBtnClasses} w-full`}
        onClick={() => setIsOpen(false)}
      >
        Got it
      </button>
    </motion.div>
  );

  const renderSuccessStatus = () => (
    <motion.div key="success" {...fadeInOut} className="space-y-6 pt-4">
      <CheckIcon className="mx-auto" />

      <div className="space-y-3 pb-5 text-center">
        <DialogTitle className="text-lg font-semibold">
          Verification successful
        </DialogTitle>

        <p className="text-gray-500 dark:text-white/50">
          You can now start converting your crypto to fiats at zero fees on
          noblocks
        </p>
      </div>

      <button
        type="button"
        className={`${primaryBtnClasses} w-full`}
        onClick={() => setIsOpen(false)}
      >
        Let&apos;s go!
      </button>
    </motion.div>
  );

  const renderFailedStatus = () => (
    <motion.div key="failed" {...fadeInOut} className="space-y-6 pt-4">
      <SadFaceIcon className="mx-auto" />

      <div className="space-y-3 pb-5 text-center">
        <DialogTitle className="text-lg font-semibold">
          Verification failed
        </DialogTitle>

        <p className="text-gray-500 dark:text-white/50">
          Some documents you uploaded couldn’t be verified. Please check all
          requirements and upload again
        </p>
      </div>

      <button
        type="button"
        className={`${primaryBtnClasses} w-full`}
        onClick={() => setStep(STEPS.TERMS)}
      >
        Retry verification
      </button>
    </motion.div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Verify your identity"
        className={`${primaryBtnClasses} w-full`}
      >
        Verify your identity
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-out data-[state=closed]:opacity-0" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md space-y-4 rounded-2xl bg-white p-5 text-sm shadow-xl transition-all duration-300 ease-out data-[state=closed]:scale-95 data-[state=closed]:opacity-0 dark:bg-neutral-800">
            <AnimatePresence mode="wait">
              {
                {
                  [STEPS.TERMS]: renderTerms(),
                  [STEPS.QR_CODE]: renderQRCode(),
                  [STEPS.STATUS.PENDING]: renderPendingStatus(),
                  [STEPS.STATUS.SUCCESS]: renderSuccessStatus(),
                  [STEPS.STATUS.FAILED]: renderFailedStatus(),
                }[step]
              }
            </AnimatePresence>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
