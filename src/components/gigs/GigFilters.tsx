import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export type BudgetRange = { min: number; max: number };

interface GigFiltersProps {
  searchQuery: string;
  sortBy: string;
  budgetRange: BudgetRange;
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onBudgetChange: (range: BudgetRange) => void;
  onClearSearch: () => void;
  onClearBudget: () => void;
}

const GigFilters: React.FC<GigFiltersProps> = ({
  searchQuery,
  sortBy,
  // budgetRange,
  onSearchChange,
  onSortChange,
  // onBudgetChange,
  onClearSearch,
  // onClearBudget,
}) => {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchClick = () => {
    onSearchChange(localSearch);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <Card className="bg-white border-gray-200 shadow-lg mb-8">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Search Gigs
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                <Input
                  type="text"
                  placeholder="Search by title or description..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10"
                />
              </div>
              <Button
                onClick={handleSearchClick}
                className="btn-gradient-primary"
              >
                Search
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Sort By
            </label>
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="deadline">Urgent First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Max Budget
            </label>
            <Select
              value={budgetRange.max.toString()}
              onValueChange={(val: string) =>
                onBudgetChange({ ...budgetRange, max: parseInt(val, 10) })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5000">Up to ₹5,000</SelectItem>
                <SelectItem value="10000">Up to ₹10,000</SelectItem>
                <SelectItem value="25000">Up to ₹25,000</SelectItem>
                <SelectItem value="50000">Up to ₹50,000</SelectItem>
                <SelectItem value="100000">₹1,00,000+</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
        </div>

        {searchQuery && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-gray-600">
                Active filters:
              </span>
              {searchQuery && (
                <Badge variant="secondary" className="cursor-pointer">
                  "{searchQuery}"
                  <button onClick={onClearSearch} className="ml-2 text-xs">
                    ✕
                  </button>
                </Badge>
              )}
              {/* {budgetRange.max < 100000 && (
                <Badge variant="secondary" className="cursor-pointer">
                  Max: ₹{budgetRange.max}
                  <button onClick={onClearBudget} className="ml-2 text-xs">
                    ✕
                  </button>
                </Badge>
              )} */}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GigFilters;
