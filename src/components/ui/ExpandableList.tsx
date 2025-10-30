"use client";
import type React from "react";
import { useState } from "react";
import Image from "next/image";

interface ExpandableItem {
  id: string;
  question: string;
  answer?: string;
  isExpanded?: boolean;
}

interface ExpandableListProps {
  items: ExpandableItem[];
  className?: string;
  allowMultiple?: boolean;
  defaultExpanded?: string[];
}

const ExpandableList: React.FC<ExpandableListProps> = ({
  items,
  className = "",
  allowMultiple = false,
  defaultExpanded = [],
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set(defaultExpanded)
  );

  const toggleItem = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(itemId);
      }

      return newSet;
    });
  };

  const isExpanded = (itemId: string) => expandedItems.has(itemId);

  return (
    <div className={`w-full space-y-4 sm:space-y-6 ${className}`}>
      {items.map((item) => (
        <div key={item.id} className="w-full">
          {/* Header */}
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full bg-secondary rounded-[16px] p-4 sm:p-5 md:p-6 flex justify-between items-center hover:bg-[#252526] transition-colors duration-200 focus:outline-hidden focus:ring-2 focus:ring-foreground/20 focus:ring-opacity-50"
            aria-expanded={isExpanded(item.id)}
            aria-controls={`content-${item.id}`}
          >
            <h3 className="text-foreground  font-medium text-base sm:text-lg md:text-xl leading-5 sm:leading-6 md:leading-7 text-left flex-1 pr-4">
              {item.question}
            </h3>

            <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-secondary/40 rounded-[16px] flex items-center justify-center shadow-[0px_0px_20px_#ffffff0c] transition-transform duration-200">
              <Image
                src="/images/img_overlay_shadow_overlayblur_white_a700_32x32.svg"
                alt="Toggle Icon"
                width={16}
                height={16}
                className={`w-4 h-4 transition-transform duration-200 ${
                  isExpanded(item.id) ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
          </button>

          {/* Content */}
          <div
            id={`content-${item.id}`}
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isExpanded(item.id)
                ? "max-h-96 opacity-100 mt-2"
                : "max-h-0 opacity-0"
            }`}
            aria-hidden={!isExpanded(item.id)}
          >
            <div className="bg-secondary rounded-[16px] p-4 sm:p-5 md:p-6">
              <p className="text-foreground/60  font-normal text-sm sm:text-base leading-5 sm:leading-6">
                {item.answer ??
                  "Content for this question will be available soon."}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpandableList;
