import React, { useState } from 'react';

const SaveLoadConfig: React.FC = () => {
  const [configName, setConfigName] = useState('');
  const [savedConfigurations, setSavedConfigurations] = useState<string[]>([]);

  const saveConfiguration = () => {
    if (configName.trim()) {
      setSavedConfigurations([...savedConfigurations, configName]);
      setConfigName('');
    }
  };

  const exportConfiguration = () => {
    const dataStr = JSON.stringify(savedConfigurations, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'configurations.json';
    link.click();
  };

  const importConfiguration = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        try {
          const importedConfigs = JSON.parse(content);
          if (Array.isArray(importedConfigs)) {
            setSavedConfigurations(importedConfigs);
          }
        } catch (error) {
          console.error('Invalid JSON file', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold">💾 Save & Load Configurations</span>
      </div>
      <div className="space-y-4">
        <input
          type="text"
          value={configName}
          onChange={(e) => setConfigName(e.target.value)}
          placeholder="Enter configuration name (e.g., 'Duplex on Main St')"
          className="block w-full p-2 border border-gray-300 rounded-md"
        />
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={saveConfiguration}>💾 Save Current</button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700" onClick={exportConfiguration}>📤 Export</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700" onClick={() => document.getElementById('importFile')?.click()}>📥 Import</button>
        </div>
        <input
          type="file"
          id="importFile"
          className="hidden"
          accept=".json"
          onChange={importConfiguration}
        />
      </div>
      <div className="mt-4">
        {savedConfigurations.length === 0 ? (
          <div className="text-center text-gray-500">No saved configurations yet. Save your current setup to get started!</div>
        ) : (
          savedConfigurations.map((config, index) => (
            <div key={index} className="p-2 border border-gray-300 rounded-md mb-2">
              <span>{config}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SaveLoadConfig;
