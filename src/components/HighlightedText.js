import React from 'react';
import Highlighter from 'react-highlight-words';

export const HighlightedText = ({ needle, haystack }) => (
  <Highlighter
    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    searchWords={[needle || '']}
    autoEscape
    textToHighlight={haystack || ''}
  />
);
