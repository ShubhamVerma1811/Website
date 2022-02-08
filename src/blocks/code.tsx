import copy from 'copy-text-to-clipboard';
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const CodeBlock = (props: any) => {
  const [showCopied, setShowCopied] = useState(false);

  const handleCopyCode = (code: string) => {
    copy(code);
    setShowCopied(true);

    setTimeout(() => setShowCopied(false), 2000);
  };

  const match = /language-(\w+)/.exec(props?.className || '');
  return !props?.inline && match ? (
    <>
      <SyntaxHighlighter
        style={nord}
        language={match[1]}
        PreTag="div"
        showLineNumbers
        wrapLines
        {...props}>
        {String(props?.children).replace(/\n$/, '')}
      </SyntaxHighlighter>
      <button
        onClick={() => handleCopyCode(props?.children[0])}
        className="absolute top-6 right-6 rounded-md bg-gray-900 px-2 py-1 text-white">
        {showCopied ? 'Copied' : 'Copy'}
      </button>
    </>
  ) : (
    <code className={props?.className} {...props}>
      {props?.children}
    </code>
  );
};

export default CodeBlock;