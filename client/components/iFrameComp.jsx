import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { updateAllRules } from '../slices/stylesSlice.js';

/**
 * Renders an iframe component with event handling for click events.
 *
 * @param {Object} props - The component props.
 * @param {string} props.src - The source URL for the iframe.
 * @param {string} props.className - The CSS class name for the iframe.
 * @param {boolean} props.proxy - Whether to use a proxy for the iframe.
 * @returns {JSX.Element} The rendered iframe component.
 */

const iFrameComp = ({ src, className, proxy }) => {
  const dispatch = useDispatch();


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
          // console.log('iFrameComp: attributes', attributes);
          for (let i = 0; i < attributes.length; i++) {
            data.attributes[attributes[i].name] = attributes[i].value;
          }
          // console.log('iFrameComp: data', data);

          // a POST request to the /cdp endpoint
          const response = await fetch('/cdp', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          const result = await response.json();

          // console.log('iFrameComp: Result from /cdp:', result);
          dispatch(updateAllRules(result));

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
