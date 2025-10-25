
import React from 'react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-6">
        {title}
      </h2>
      {children}
    </div>
  );
};

export default FormSection;
