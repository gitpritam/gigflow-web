import React from "react";

interface GigDescriptionProps {
  description: string;
}

const GigDescription: React.FC<GigDescriptionProps> = ({ description }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default GigDescription;
