import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import GigFilters, { type BudgetRange } from "@/components/gigs/GigFilters";

import GigCard from "@/components/gigs/GigCard";
import PaginationControls from "@/components/gigs/PaginationControls";
import { useGigs } from "@/hook/getGigs.hook";

const ShowGigsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [budgetRange, setBudgetRange] = useState<BudgetRange>({
    min: 0,
    max: 100000,
  });

  const {
    data: gigs,
    pagination,
    loading,
    error,
    setSearch,
    setSort,
    setBudgetRange: setBudgetFilter,
    setPage,
  } = useGigs({ limit: 9, sortBy: "createdAt", sortOrder: "desc" });

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setSearch(value);
    setPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    switch (value) {
      case "price-low":
        setSort("budget", "asc");
        break;
      case "price-high":
        setSort("budget", "desc");
        break;
      case "deadline":
        setSort("deadline", "asc");
        break;
      case "newest":
      default:
        setSort("createdAt", "desc");
        break;
    }
    setPage(1);
  };

  const handleBudgetChange = (range: BudgetRange) => {
    setBudgetRange(range);
    setBudgetFilter(range.min, range.max);
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setBudgetRange({ min: 0, max: 100000 });
    setSortBy("newest");
    setSearch("");
    setBudgetFilter(0, 100000);
    setSort("createdAt", "desc");
    setPage(1);
  };

  const handlePageChange = (page: number) => setPage(page);

  const totalPages = pagination?.totalPages ?? 1;
  const totalGigs = pagination?.total ?? gigs.length;

  return (
    <div className="min-h-screen bg-gradient-page flex flex-col">
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Browse Gigs
            </h1>
            <p className="text-xl text-gray-600">
              Find and explore freelance opportunities that match your skills
            </p>
          </div>

          {/* Search and Filters */}
          <GigFilters
            searchQuery={searchQuery}
            sortBy={sortBy}
            budgetRange={budgetRange}
            onSearchChange={handleSearchChange}
            onSortChange={handleSortChange}
            onBudgetChange={handleBudgetChange}
            onClearSearch={() => handleSearchChange("")}
            onClearBudget={() =>
              handleBudgetChange({ ...budgetRange, max: 10000 })
            }
          />

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              {loading ? (
                "Loading gigs..."
              ) : (
                <>
                  Showing <span className="font-semibold">{gigs.length}</span>{" "}
                  of <span className="font-semibold">{totalGigs}</span> gigs
                </>
              )}
            </p>
          </div>

          {/* Gigs Grid */}
          {error && <div className="mb-6 text-red-600">{error}</div>}
          {loading ? (
            <div className="text-gray-600">Loading gigs...</div>
          ) : gigs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {gigs.map((gig) => (
                <GigCard key={gig._id} gig={gig} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">
                No gigs found matching your search criteria.
              </p>
              <Button onClick={handleResetFilters}>Reset Filters</Button>
            </div>
          )}

          <PaginationControls
            currentPage={pagination?.page ?? 1}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
    </div>
  );
};

export default ShowGigsPage;
