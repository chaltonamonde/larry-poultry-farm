import React, { useEffect, useState } from 'react';

/**
 * Temporary verification tool:
 * Detects any DOM elements wider than window.innerWidth across all responsive breakpoints.
 */
export const ViewportInspector: React.FC = () => {
  const [overflowingElements, setOverflowingElements] = useState<string[]>([]);
  const [viewportWidth, setViewportWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const checkOverflow = () => {
      const docWidth = document.documentElement.clientWidth;
      setViewportWidth(docWidth);
      const elements = document.querySelectorAll('*');
      const offending: string[] = [];

      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.width > docWidth + 1 || rect.right > docWidth + 1) {
          const identifier = `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${el.className ? '.' + String(el.className).split(' ')[0] : ''} (${Math.round(rect.width)}px > ${docWidth}px)`;
          if (!offending.includes(identifier) && offending.length < 5) {
            offending.push(identifier);
          }
        }
      });

      setOverflowingElements(offending);
      if (offending.length > 0) {
        console.warn(`[Viewport Inspector] Overflow detected at ${docWidth}px:`, offending);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    const interval = setInterval(checkOverflow, 2000);

    return () => {
      window.removeEventListener('resize', checkOverflow);
      clearInterval(interval);
    };
  }, []);

  if (overflowingElements.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '10px',
        left: '10px',
        zIndex: 99999,
        backgroundColor: '#ef4444',
        color: '#ffffff',
        padding: '8px 12px',
        borderRadius: '8px',
        fontSize: '11px',
        maxWidth: '280px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        pointerEvents: 'none'
      }}
    >
      <strong>Overflow warning at {viewportWidth}px:</strong>
      <ul style={{ margin: '4px 0 0 12px', padding: 0 }}>
        {overflowingElements.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
