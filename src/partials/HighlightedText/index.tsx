import React, { FC } from 'react';

import Highlighter from 'react-highlight-words';

interface IHighlightedTextProps {
  needle: string;
  haystack: string;
}

const HighlightedText: FC<IHighlightedTextProps> = ({ needle, haystack }) => (
  <Highlighter
    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    searchWords={[needle || '']}
    autoEscape
    textToHighlight={haystack || ''}
  />
);

export default React.memo(HighlightedText);
