import React, { useEffect } from 'react';

const iFrameComp = ({ src, className, proxy }) => {

  useEffect(() => {
    const iframe = document.querySelector(`.${className}`);

    // console.log('iframe', iframe);

    const handleLoad = () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        console.log('iframeDoc', iframeDoc);

        const handleClick = async (event) => {
          const element = event.target;
          console.log('iFrameComp: element', element);
          const data = {
            nodeName: element.nodeName,
            nodeType: element.nodeType,
            textContent: element.textContent,
            innerHTML: element.innerHTML,
            id: element.id,
            className: element.className,
            attributes: {},
          };

          const attributes = element.attributes;
          console.log('iFrameComp: attributes', attributes);
          for (let i = 0; i < attributes.length; i++) {
            data.attributes[attributes[i].name] = attributes[i].value;
          }
          console.log('iFrameComp: data', data);

          // a POST request to the /cdp endpoint
          const response = await fetch('/cdp', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
          const result = await response.json();
          console.log('Result from /cdp:', result);
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
  }, []);

  return (
    <iframe
      src={src}
      width="100%"
      height="100%"
      title="User Site"
      className={className}
    />
  );
};

export default iFrameComp;
