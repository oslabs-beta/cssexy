import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { updateInlineRules, updateRegularRules, updateUserAgentRules, updateInheritedRules, updateKeyframeRules } from '../slices/rulesSlice.js';

/**
 * Renders an iframe component with event handling for click events.
 *
 * @param {Object} props - The component props.
 * @param {string} props.src - The source URL for the iframe.
 * @param {string} props.className - The CSS class name for the iframe.
 * @param {boolean} props.proxy - Whether to use a proxy for the iframe.
 * @returns {JSX.Element} The rendered iframe component.
 */

const iFrameComp = ({ src, proxy, className }) => {
  const dispatch = useDispatch();

  // waiting for the iframe DOM to load before we add event listeners
  // without this, the event listeners would try to be added to an unexisting iframe
  useEffect(() => {
    // getting our iframe
    const iframe = document.querySelector(`.${className}`);
    console.log('iFrameComp: iframe', iframe);

    const handleLoad = () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        console.log('iFrameComp: iframeDoc', iframeDoc);

        const handleClick = async (event) => {
          const element = event.target;
          console.log('iFrameComp: element', element);
          const data = {
            id: element.id,
            nodeName: element.nodeName,
            className: element.className,
            proxy: proxy,
            // nodeType: element.nodeType,
            // textContent: element.textContent,
            // innerHTML: element.innerHTML,
            // attributes: {},
          };

          // a POST request to the /cdp endpoint
          const response = await fetch('/cdp', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          console.log('iFrameComp: response', response);

          const result = await response.json();

          // console.log('iFrameComp: Result returned from /cdp');

          // dispatching the results from the /cdp endpoint to the store
          dispatch(updateInlineRules(result.inlineRules));
          dispatch(updateRegularRules(result.regularRules));
          dispatch(updateUserAgentRules(result.userAgentRules));
          // dispatch(updateInheritedRules(result.inheritedRules));
          // dispatch(updateKeyframeRules(result.keyframeRules));
        };


        // This event listener needs to be added to the iframe's contentDocument because
        // we're listening for clicks inside the iframe, and those clicks won't be
        // handled by React's event delegation system. By adding this event listener,
        // we're essentially making the iframe's contentDocument a "portal" for
        // clicks to be handled by React.
        iframeDoc.addEventListener('click', handleClick, false);

        return () => {
          // Cleanup function to remove event listener
          // Prevents memory leaks
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
