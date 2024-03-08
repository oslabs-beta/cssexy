import React, { useEffect } from 'react';

const iFrameComp = ({ src, className }) => {
  useEffect(() => {
    const iframe = document.querySelector(`.${className}`);

    // console.log('iframe', iframe);

    const handleLoad = () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        console.log('iframeDoc', iframeDoc);

        const handleClick = (event) => {
          const element = event.target;
          const attributes = element.attributes;
          const attrs = {};
          for (let i = 0; i < attributes.length; i++) {
              attrs[attributes[i].name] = attributes[i].value;
          }
          console.log('attrs', attrs);

          // Send a message to the parent window
          window.parent.postMessage(attrs, '*');
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
      // Cleanup function to remove event listener
      return () => {
        iframe.removeEventListener('load', handleLoad);
      };
    }
  }, [className]);

  return (
    <iframe
      src={src}
      width="100%"
      height="100%"
      title="User Site"
      className={className}
      sandbox="allow-scripts allow-same-origin"
    />
  );
};

export default iFrameComp;
