"use client";
import QRCode from "react-qr-code";
import { BiSolidPlusCircle } from "react-icons/bi";
import { Fragment, useEffect, useState } from "react";
import { HiCheck, HiOutlineDuplicate } from "react-icons/hi";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

import { Tooltip } from "./Tooltip";
import { primaryBtnClasses } from "./Styles";

export const FundWalletModal = ({ address }: { address: string }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isAddressCopied, setIsAddressCopied] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function handleCopyAddress() {
    navigator.clipboard.writeText(address);
    setIsAddressCopied(true);
    setTimeout(() => {
      setIsAddressCopied(false);
    }, 2000);
  }

  return (
    <>
      <Tooltip message="Fund your smart wallet">
        <button
          type="button"
          onClick={openModal}
          aria-label="Fund smart wallet"
        >
          <BiSolidPlusCircle className="text-lg text-blue-600 dark:text-blue-500" />
        </button>
      </Tooltip>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all dark:bg-neutral-800">
                  <DialogTitle
                    as="h3"
                    className="border-b border-gray-200 bg-gray-200 px-6 py-4 text-lg font-semibold leading-6 text-neutral-900 dark:border-white/10 dark:bg-white/10 dark:text-white"
                  >
                    Fund smart wallet
                  </DialogTitle>

                  <div className="grid gap-4 px-6 py-4 text-sm text-gray-500 dark:text-white/50">
                    <p>Send tokens to this wallet via base network</p>

                    <div className="grid h-64 w-full place-content-center rounded-2xl border border-gray-200 bg-gray-200 dark:border-white/10 dark:bg-white/10">
                      <QRCode value={address} size={150} />
                    </div>

                    <div className="flex justify-between">
                      <p>Wallet</p>
                      <div className="flex gap-1">
                        <p className="max-w-36 truncate font-semibold text-neutral-900 dark:text-white">
                          {address}
                        </p>
                        <button
                          type="button"
                          aria-label="Copy address"
                          onClick={handleCopyAddress}
                        >
                          {isAddressCopied ? (
                            <HiCheck
                              className="h-5 w-5 cursor-pointer text-green-600 dark:text-green-500"
                              aria-hidden="true"
                            />
                          ) : (
                            <HiOutlineDuplicate
                              className="h-5 w-5 cursor-pointer text-blue-600 dark:text-blue-500"
                              aria-hidden="true"
                            />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <p>Network</p>
                      <p className="font-semibold text-neutral-900 dark:text-white">
                        Base
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end border-t border-gray-200 bg-gray-200 px-6 py-4 dark:border-white/10 dark:bg-white/10">
                    <button
                      type="button"
                      className={primaryBtnClasses}
                      onClick={closeModal}
                    >
                      Done
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
