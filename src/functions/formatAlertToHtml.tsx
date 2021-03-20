import React, { ReactElement } from 'react';

export function formatAlertToHtml(content: string): ReactElement[] {
  const TOP_LEVEL_HEADING = /^(\.\.\.)(\w+\s\w+)(\.\.\.)$/gm;
  const LOW_LEVEL_HEADING = /^\.(\w+\s*\w+)\.\.\./gm;

  // Split content into lines
  const lines = content.split('\n');

  // TODO: fix regex to cover all cases
  const htmlNodes: ReactElement[] = lines.flatMap((line, i) => {
    let editedLine = line;

    // Is it a top level heading?
    if (line.match(TOP_LEVEL_HEADING)) {
      editedLine = line.replace(TOP_LEVEL_HEADING, '$2');

      return <h3 key={i}>{editedLine}</h3>;
    }

    // Is there a lower level heading and a paragraph?
    if (line.match(LOW_LEVEL_HEADING)) {
      let twoLines: string[];
      twoLines = line.replace(LOW_LEVEL_HEADING, '$1___').split('___');

      return [
        <h4 key={i}>{twoLines[0]}</h4>,
        <p key={i * i + 109}>{twoLines[1]}</p>,
      ];
    }

    // Otherwise return a paragraph
    return <p key={i}>{line}</p>;
  });

  return htmlNodes;
}
