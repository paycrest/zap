"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useOutsideClick } from "../hooks";
import { useEffect, useRef, useState } from "react";
import { PiCaretDown, PiCheck } from "react-icons/pi";
import { dropdownVariants } from "./AnimatedComponents";

interface DropdownItem {
  id: string;
  name: string;
  imageUrl?: string;
  disabled?: boolean;
}

interface DropdownProps {
  id: string;
  selectedId?: string;
  onSelect?: (id: string) => void;
}

const networks = [
  {
    id: "1",
    name: "Base",
    imageUrl: "/base-logo.svg",
  },
  {
    id: "2",
    name: "Binance",
    imageUrl: "/binance-logo.svg",
  },
  {
    id: "3",
    name: "Arbitrum",
    imageUrl: "/arbitrum-logo.svg",
  },
  {
    id: "4",
    name: "Tron",
    imageUrl: "/tron-logo.svg",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const NetworksDropdown = ({
  id,
  selectedId,
  onSelect,
}: DropdownProps) => {
  const data = networks as DropdownItem[];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>(
    selectedId ? data?.find((item) => item.id === selectedId) : undefined,
  );

  const handleChange = (item: DropdownItem) => {
    setSelectedItem(item);
    onSelect && onSelect(item.id);
    setIsOpen(false);
  };

  useEffect(() => {
    if (selectedId && data) {
      const newSelectedItem = data.find((item) => item.id === selectedId);
      newSelectedItem && setSelectedItem(newSelectedItem);
    } else {
      setSelectedItem(undefined);
    }
  }, [selectedId, data]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick({
    ref: dropdownRef,
    handler: () => setIsOpen(false),
  });

  return (
    <div ref={dropdownRef} className="relative">
      <button
        id={id}
        aria-label="Toggle dropdown"
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-2 rounded-xl bg-gray-50 p-2.5 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-95 dark:bg-neutral-800 dark:focus-visible:ring-offset-neutral-900"
      >
        <span>
          {selectedItem?.name ? (
            <div className="flex items-center gap-2">
              <Image
                alt={selectedItem?.name}
                src={selectedItem?.imageUrl ?? ""}
                width={20}
                height={20}
                className="h-auto w-auto object-contain"
              />
              <p className="hidden sm:block">{selectedItem?.name}</p>
            </div>
          ) : (
            <p>Select a network</p>
          )}
        </span>
        <PiCaretDown
          className={classNames(
            "text-base text-gray-400 transition-transform dark:text-white/50",
            isOpen ? "rotate-180" : "",
          )}
        />
      </button>

      {/* Open */}
      {isOpen && (
        <motion.div
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          exit="closed"
          variants={dropdownVariants}
          aria-label="Dropdown menu"
          className="absolute right-0 z-10 mt-4 max-h-52 min-w-40 max-w-full overflow-y-auto rounded-xl bg-gray-50 shadow-xl dark:bg-neutral-800"
        >
          <ul role="menu" aria-labelledby={id} aria-orientation="vertical">
            {data?.map((item) => (
              <li
                key={item.id}
                onClick={() => handleChange(item)}
                className={classNames(
                  "flex items-center justify-between gap-2 px-3 py-2 transition-all hover:bg-gray-200 dark:hover:bg-neutral-700",
                  item?.disabled
                    ? "pointer-events-none cursor-not-allowed"
                    : "cursor-pointer",
                )}
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={item.imageUrl ?? ""}
                    alt="image"
                    loading="lazy"
                    width={20}
                    height={20}
                    className="me-2 h-5 w-5 rounded-full object-cover"
                  />

                  <span className="text-neutral-900 dark:text-white/80">
                    {item.name}
                  </span>
                </div>

                <PiCheck
                  className={classNames(
                    "text-lg text-gray-400 transition-transform dark:text-white/50",
                    selectedItem?.id === item.id ? "" : "hidden",
                  )}
                />
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};
