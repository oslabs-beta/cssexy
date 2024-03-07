import React, { useEffect, useRef } from 'react';

const iFrameComp = ({ src, className }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;

    const handleLoad = () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        const handleClick = (event) => {
          const element = event.target;
          const attributes = element.attributes;
          const attrs = {};
          for (let i = 0; i < attributes.length; i++) {
              attrs[attributes[i].name] = attributes[i].value;
          }
          console.log('attrs', attrs);
        };

        iframeDoc.addEventListener('click', handleClick, false);

        // Cleanup function to remove event listener
        return () => {
          iframeDoc.removeEventListener('click', handleClick, false);
        };
      } catch (error) {
        console.error("Can't access iframe content:", error);
      }
    };

    if (iframe) {
      iframe.addEventListener('load', handleLoad);

      // Cleanup
      return () => {
        iframe.removeEventListener('load', handleLoad);
      };
    }
  }, [src]); // Re-run effect if `src` changes

  return (
    <iframe
      ref={iframeRef}
      src={src}
      width="100%"
      height="100%"
      title="User Site"
      className={className}
    ></iframe>
  );
};

export default iFrameComp;
