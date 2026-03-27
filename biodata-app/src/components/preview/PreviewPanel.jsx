import { Suspense } from 'react';
import { LAYOUTS } from '../../data/layouts';
import './PreviewPanel.css';

export default function PreviewPanel({ state, sheetRef }) {
  const layoutId = state.layout || 'classic';
  const found = LAYOUTS.find(l => l.id === layoutId);
  const LayoutComponent = found ? found.component : LAYOUTS[0].component;

  return (
    <div className="pp-preview">
      <Suspense fallback={<div className="pp-loading">Loading layout...</div>}>
        <LayoutComponent state={state} sheetRef={sheetRef} />
      </Suspense>
    </div>
  );
}
