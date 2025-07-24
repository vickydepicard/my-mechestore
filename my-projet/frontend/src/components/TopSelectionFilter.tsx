import React, { useState } from 'react';

interface TopSelectionFilterProps {
  filters: string[];
  onFilterChange: (selected: string) => void;
}

const TopSelectionFilter: React.FC<TopSelectionFilterProps> = ({ filters, onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState<string>(filters[0]);

  const handleClick = (filter: string) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="w-full px-4 md:px-8 py-4 bg-white shadow-sm rounded-xl mb-6 overflow-x-auto">
      <div className="flex gap-4 justify-start">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => handleClick(filter)}
            className={`whitespace-nowrap px-4 py-2 rounded-full border text-sm font-medium transition duration-200 ${
              activeFilter === filter
                ? 'bg-pink-600 text-white border-pink-600 shadow'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopSelectionFilter;
