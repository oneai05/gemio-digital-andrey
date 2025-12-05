import React from "react";

interface SectionTabsProps {
  sections: string[];
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const SectionTabs: React.FC<SectionTabsProps> = ({
  sections,
  activeSection,
  onSectionChange,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {sections.map((name) => (
        <button
          key={name}
          type="button"
          onClick={() => onSectionChange(name)}
          className={`section-tab ${
            activeSection === name ? "section-tab-active" : "section-tab-inactive"
          }`}
        >
          {name}
        </button>
      ))}
    </div>
  );
};

export default SectionTabs;
