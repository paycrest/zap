"use client";
import { useEffect, useRef, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import Image from "next/image";
import { useOutsideClick } from "../hooks";
import { PiCaretDown } from "react-icons/pi";

interface DropdownItem {
  id: string;
  name: string;
  imageUrl?: string;
  disabled?: boolean;
}

interface DropdownProps {
  id: string;
  title?: string;
  data: DropdownItem[];
  hasImage?: boolean;
  style?: string;
  selectedId?: string;
  onSelect?: (id: string) => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const NetworksDropdown = ({
  id,
  data,
  hasImage,
  selectedId,
  onSelect,
}: DropdownProps) => {
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
    <div ref={dropdownRef} className="">
      <button
        id={id}
        aria-label="Toggle dropdown"
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-2 rounded-full border border-gray-300 p-2.5 opacity-70 hover:opacity-100 dark:border-white/20"
      >
        <PiCaretDown className="text-lg text-gray-400 dark:text-white/50" />
      </button>

      {/* Open */}
      {isOpen && (
        <div
          aria-label="Dropdown menu"
          className="absolute right-0 z-10 mt-4 max-h-52 w-40 max-w-full overflow-y-auto rounded-xl bg-gray-50 shadow-xl dark:bg-neutral-800"
        >
          <p className="pb-1 pl-3 pt-2 text-xs text-gray-500 dark:text-gray-400">
            Coming soon
          </p>
          <ul role="menu" aria-labelledby={id} aria-orientation="vertical">
            {data?.map((item) => (
              <li
                key={item.id}
                onClick={() => handleChange(item)}
                className={classNames(
                  "flex items-center gap-2 px-3 py-2 transition-all hover:bg-gray-200 dark:hover:bg-neutral-700",
                  item.disabled
                    ? "pointer-events-none cursor-not-allowed"
                    : "cursor-pointer",
                )}
              >
                {hasImage && (
                  <Image
                    src={item.imageUrl ?? ""}
                    alt="image"
                    loading="lazy"
                    width={20}
                    height={20}
                    className="me-2 h-5 w-5 rounded-full object-cover"
                  />
                )}
                <span className="text-neutral-900 dark:text-white/80">
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
