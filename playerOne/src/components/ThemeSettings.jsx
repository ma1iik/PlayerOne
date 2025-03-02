// playerOne/src/components/ThemeSettings.jsx
import React, { useContext } from 'react';
import ThemeContext, { THEMES } from '../context/ThemeContext';

const ThemeSettings = () => {
  const { currentTheme, setTheme, themes } = useContext(ThemeContext);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold">Theme Settings</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {Object.values(themes).map((theme) => (
          <button
            key={theme.id}
            className={`p-4 rounded-lg transition-all duration-200 h-32 flex flex-col justify-between ${
              currentTheme.id === theme.id ? 'pixel-border' : 'border border-border-themed'
            }`}
            style={{
              backgroundColor: theme.bgSecondary,
              color: theme.textPrimary,
            }}
            onClick={() => setTheme(theme.id)}
          >
            <div className="w-full flex justify-between">
              <span className="font-medium">{theme.name}</span>
              {currentTheme.id === theme.id && (
                <span role="img" aria-label="Selected">✓</span>
              )}
            </div>
            
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: theme.primaryColor }} />
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: theme.secondaryColor }} />
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: theme.accentColor }} />
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-border-themed">
        <h4 className="text-sm font-medium mb-3">Preview</h4>
        <div className="space-y-4">
          <div className="flex gap-2">
            <button className="btn">Primary</button>
            <button className="btn-secondary">Secondary</button>
            <button className="btn-accent">Accent</button>
          </div>
          
          <div className="card p-4">
            <p className="text-sm mb-2">Card Example</p>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: '65%' }}></div>
            </div>
          </div>
          
          <input
            type="text"
            className="input"
            placeholder="Input example"
          />
          
          <div>
            <p className="text-gradient font-bold">Gradient Text</p>
            <p className="text-primary">Primary Color Text</p>
            <p className="text-secondary">Secondary Color Text</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;