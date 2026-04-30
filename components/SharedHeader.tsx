"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import RecordScreen from "./RecordScreen";
import { filterOptions } from "@/constants";
import ImageWithFallback from "./ImageWithFallback";
import DropdownList from "./DropdownList";
import { updateURLParams } from "@/lib/utils";

type SharedHeaderProps = {
  subHeader: string;
  title: string;
  userImg?: string;
};

const SharedHeader = ({ subHeader, title, userImg }: SharedHeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ✅ memoized values (prevents unnecessary recalculation)
  const queryParam = useMemo(
    () => searchParams.get("query") || "",
    [searchParams]
  );

  const filterParam = useMemo(
    () => searchParams.get("filter") || "Most Recent",
    [searchParams]
  );

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedFilter, setSelectedFilter] = useState(filterParam);

  // ✅ sync with URL
  useEffect(() => {
    setSearchQuery(queryParam);
    setSelectedFilter(filterParam);
  }, [queryParam, filterParam]);

  // ✅ debounce search (optimized)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== queryParam) {
        const url = updateURLParams(
          searchParams,
          { query: searchQuery || null, page: "1" }, // reset page
          pathname
        );
        router.push(url);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery, queryParam, pathname, router, searchParams]);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);

    const url = updateURLParams(
      searchParams,
      { filter: filter || null, page: "1" }, // reset page
      pathname
    );

    router.push(url);
  };

  // ✅ memoized trigger (performance)
  const filterTrigger = useMemo(
    () => (
      <div className="filter-trigger flex items-center gap-2 cursor-pointer">
        <figure className="flex items-center gap-1">
          <Image
            src="/assets/icons/hamburger.svg"
            alt="filter"
            width={14}
            height={14}
          />
          <span className="text-sm">{selectedFilter}</span>
        </figure>
        <Image
          src="/assets/icons/arrow-down.svg"
          alt="expand"
          width={20}
          height={20}
        />
      </div>
    ),
    [selectedFilter]
  );

  return (
    <header className="header">
      {/* ✅ Top Section */}
      <section className="header-container flex justify-between items-center">
        <figure className="details flex items-center gap-3">
          {userImg && (
            <ImageWithFallback
              src={userImg}
              alt="user avatar"
              width={66}
              height={66}
              className="rounded-full"
            />
          )}

          <article>
            <p className="text-sm text-gray-500">{subHeader}</p>
            <h1 className="text-xl font-semibold">{title}</h1>
          </article>
        </figure>

        {/* ✅ Actions */}
        <aside className="flex items-center gap-3">
          <Link
            href="/upload"
            className="flex items-center gap-2 text-sm font-medium hover:opacity-80"
          >
            <Image
              src="/assets/icons/upload.svg"
              alt="upload"
              width={16}
              height={16}
            />
            <span>Upload</span>
          </Link>

          <RecordScreen />
        </aside>
      </section>

      {/* ✅ Search + Filter */}
      <section className="search-filter flex items-center gap-4 mt-4">
        {/* Search */}
        <div className="search relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search videos, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border rounded-md px-3 py-2 pr-8 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />

          <Image
            src="/assets/icons/search.svg"
            alt="search"
            width={16}
            height={16}
            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-60"
          />
        </div>

        {/* Filter */}
        <DropdownList
          options={filterOptions}
          selectedOption={selectedFilter}
          onOptionSelect={handleFilterChange}
          triggerElement={filterTrigger}
        />
      </section>
    </header>
  );
};

export default SharedHeader;