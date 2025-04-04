import { useState } from 'react';

interface TabProps {
  label: string;
  children: React.ReactNode;
}

interface TabsProps {
  children: React.ReactElement<TabProps>[];
  className?: string;
}

export function Tabs({ children, className = '' }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={`w-full ${className}`}>
      {/* Tab Buttons */}
      <div className="flex border-b">
        {children.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-6 text-lg font-semibold border-b-2 transition ${
              activeTab === index ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.props.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 bg-gray-100 rounded-b-lg">{children[activeTab]}</div>
    </div>
  );
}

export function Tab({ children }: TabProps) {
  return <div>{children}</div>;
}
