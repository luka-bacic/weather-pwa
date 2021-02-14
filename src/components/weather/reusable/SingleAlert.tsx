import React, { useEffect, useState, ReactElement } from 'react';

type Props = {
  start: number;
  end: number;
  title: string;
  content: string;
};

const SingleAlert = ({ start, end, title, content }: Props) => {
  let formattedLines = [];
  const [renderedContent, setRenderedContent] = useState<ReactElement[]>([]);
  if (typeof content !== 'undefined') {
    if (content) console.log(content);
    // console.log(start, end);
    const lines = content.split('\n');

    formattedLines = lines.flatMap((line, i) => {
      let editedLine = line;
      let subLines = [];

      const TOP_LEVEL_HEADING = /^(\.\.\.)\w+\s\w+(\.\.\.)$/gm;
      const LOW_LEVEL_HEADING = /^\.(\w+\s*\w+)\.\.\./gm;
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
          <p key={i * i + i}>{twoLines[1]}</p>,
        ];
      }
    });

    console.log(formattedLines);

    // Get heading in the description
    // const h1 = content.match(/^(\.\.\.)\w+\s\w+(\.\.\.)$/gm);
    //     setRenderedContent(prevState => {
    //       return [
    //         ...prevState,
    // content.replace(/^(\.\.\.)\w+\s\w+(\.\.\.)$/gm, <h1>as</h1>)
    //       ]
    //     })
    // console.log(content.split('...'));
  }

  return (
    <div className="alert__single">
      <button className="alert__open-alert">
        {title ? title : 'See warning'}
      </button>
      <article className="alert__content">
        <h2>{title ? title : 'Weather alert'}</h2>

        {/* {renderedContent.length > 0 && renderedContent}
         */}

        {formattedLines}
      </article>
    </div>
  );
};

export default SingleAlert;
