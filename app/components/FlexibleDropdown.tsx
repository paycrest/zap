"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { PiCheck } from "react-icons/pi";
import { useOutsideClick } from "../hooks";
import { dropdownVariants } from "./AnimatedComponents";
import { useEffect, useRef, useState, ReactNode } from "react";

export interface DropdownItem {
  id: string;
  name: string;
  imageUrl?: string;
  disabled?: boolean;
}

interface FlexibleDropdownProps {
  data: DropdownItem[];
  defaultSelectedId?: string;
  onSelect?: (name: string) => void;
  children: (props: {
    selectedItem: DropdownItem | undefined;
    isOpen: boolean;
    toggleDropdown: () => void;
  }) => ReactNode;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const FlexibleDropdown = ({
  defaultSelectedId,
  onSelect,
  data,
  children,
}: FlexibleDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>(
    defaultSelectedId
      ? data?.find((item) => item.id === defaultSelectedId)
      : undefined,
  );

  const handleChange = (item: DropdownItem) => {
    setSelectedItem(item);
    onSelect && onSelect(item.name);
    setIsOpen(false);
  };

  useEffect(() => {
    if (defaultSelectedId && data) {
      const newSelectedItem = data.find(
        (item) => item.id === defaultSelectedId,
      );
      newSelectedItem && setSelectedItem(newSelectedItem);
    } else {
      setSelectedItem(undefined);
    }
  }, [defaultSelectedId, data]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick({
    ref: dropdownRef,
    handler: () => setIsOpen(false),
  });

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div ref={dropdownRef} className="relative">
      {children({ selectedItem, isOpen, toggleDropdown })}

      {/* Dropdown content */}
      {isOpen && (
        <motion.div
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          exit="closed"
          variants={dropdownVariants}
          aria-label="Dropdown menu"
          className="absolute right-0 z-10 mt-2 max-h-52 min-w-40 max-w-full overflow-y-auto rounded-xl bg-gray-50 shadow-xl dark:bg-neutral-800"
        >
          <ul
            role="menu"
            aria-labelledby="networks-dropdown"
            aria-orientation="vertical"
          >
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
