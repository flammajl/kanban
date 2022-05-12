import ReactMarkdown from 'react-markdown';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { base16AteliersulphurpoolLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { IReactMarkdown } from '../../../interfaces';

export function Markdown({ content }: IReactMarkdown) {
  return (
    <ReactMarkdown
      components={{
        // eslint-disable-next-line react/no-unstable-nested-components
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');

          return !inline && match ? (
            <SyntaxHighlighter
              language={match[1]}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore-line
              style={base16AteliersulphurpoolLight}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
