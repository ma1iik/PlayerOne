import React from 'react';
import { useThemeStyles } from '../context/ThemeProvider';

const ThemeSettings = () => {
  const { theme, styles, themes, setThemeId, themeId } = useThemeStyles();

  const getThemedText = (text) => styles.shouldTransform(text);

  const getCleanFontName = (fontString) => {
    const match = fontString.match(/'([^']+)'/);
    if (match) {
      return match[1];
    }
    return fontString.split(',')[0].replace(/'/g, '').trim();
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {themes.map((themeOption) => (
          <button
            key={themeOption.id}
            onClick={() => setThemeId(themeOption.id)}
            style={{
              padding: '16px',
              borderRadius: '8px',
              border: `2px solid ${themeId === themeOption.id ? themeOption.primaryColor : themeOption.borderColor}`,
              backgroundColor: themeOption.bgSecondary,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div 
                style={{ 
                  width: '16px', 
                  height: '16px', 
                  borderRadius: '50%',
                  backgroundColor: themeOption.primaryColor
                }}
              />
              <span style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: themeOption.textPrimary,
                fontFamily: themeOption.font,
                textTransform: themeOption.features?.useUppercaseText ? 'uppercase' : 'none'
              }}>
                {themeOption.features?.useUppercaseText ? themeOption.name.toUpperCase() : themeOption.name}
              </span>
              {themeId === themeOption.id && (
                <span style={{ 
                  marginLeft: 'auto',
                  fontSize: '12px',
                  color: themeOption.primaryColor,
                  fontWeight: '500'
                }}>
                  ✓ Active
                </span>
              )}
            </div>

            <div style={{ 
              fontSize: '11px', 
              color: themeOption.textSecondary,
              marginBottom: '12px',
              fontFamily: themeOption.font
            }}>
              Font: {getCleanFontName(themeOption.font)}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ 
                fontSize: '12px', 
                color: themeOption.textSecondary,
                fontFamily: themeOption.font
              }}>
                Sample text in this theme
              </div>
              
              <div style={{ 
                padding: '8px 12px',
                borderRadius: themeOption.features?.hasSharpCorners ? '0' : '4px',
                backgroundColor: themeOption.primaryColor,
                color: '#ffffff',
                fontSize: '11px',
                fontWeight: '500',
                textAlign: 'center',
                fontFamily: themeOption.font,
                textTransform: themeOption.features?.useUppercaseText ? 'uppercase' : 'none',
                boxShadow: themeOption.features?.hasGlowEffects ? `0 0 8px ${themeOption.primaryColor}60` : 'none'
              }}>
                Sample Button
              </div>
            </div>

            <div style={{ 
              marginTop: '12px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '4px'
            }}>
              {themeOption.features?.hasGlowEffects && (
                <span style={{
                  fontSize: '10px',
                  padding: '2px 6px',
                  backgroundColor: themeOption.primaryColor + '20',
                  color: themeOption.primaryColor,
                  borderRadius: '4px',
                  fontFamily: themeOption.font
                }}>
                  Glow
                </span>
              )}
              
              {themeOption.features?.hasSharpCorners && (
                <span style={{
                  fontSize: '10px',
                  padding: '2px 6px',
                  backgroundColor: themeOption.primaryColor + '20',
                  color: themeOption.primaryColor,
                  borderRadius: '4px',
                  fontFamily: themeOption.font
                }}>
                  Sharp
                </span>
              )}
              
              {themeOption.features?.useUppercaseText && (
                <span style={{
                  fontSize: '10px',
                  padding: '2px 6px',
                  backgroundColor: themeOption.primaryColor + '20',
                  color: themeOption.primaryColor,
                  borderRadius: '4px',
                  fontFamily: themeOption.font
                }}>
                  Caps
                </span>
              )}
              
              {themeOption.features?.hasGridBackground && (
                <span style={{
                  fontSize: '10px',
                  padding: '2px 6px',
                  backgroundColor: themeOption.primaryColor + '20',
                  color: themeOption.primaryColor,
                  borderRadius: '4px',
                  fontFamily: themeOption.font
                }}>
                  Grid
                </span>
              )}
              
              {(!themeOption.features?.hasGlowEffects && 
                !themeOption.features?.hasSharpCorners && 
                !themeOption.features?.useUppercaseText && 
                !themeOption.features?.hasGridBackground) && (
                <span style={{
                  fontSize: '10px',
                  padding: '2px 6px',
                  backgroundColor: themeOption.primaryColor + '20',
                  color: themeOption.primaryColor,
                  borderRadius: '4px',
                  fontFamily: themeOption.font
                }}>
                  Clean
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSettings;