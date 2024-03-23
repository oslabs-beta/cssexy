import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { updateInlineRules, updateRegularRules, updateUserAgentRules, updateInheritedRules, updateKeyframeRules, updateStyleSheets, updateNodeData } from '../slices/rulesSlice.js';

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
        // console.log('iFrameComp: iframeDoc', iframeDoc);

        const handleClick = async (event) => {
          // This function is the event listener for click events inside the iframe.
          // It prevents the default behavior of the click (following a link) and
          // grabs a reference to the element that was clicked inside the iframe.
          // This function is added to the iframe's contentDocument when the iframe
          // loads, and is triggered whenever the user clicks inside the iframe.

          // The event comes from the iframe, so we need to prevent the default
          // behavior of following the link.

          // The element that was clicked inside the iframe is available as event.target.
          const element = event.target;

          // Other options like this include stopPropagation, which prevents the event
          // from bubbling up to parent elements.
          // event.stopPropagation();

          // How to manipulate it:
          // You can use element.tagName to get the HTML tag name of the element that was clicked.
          // console.log('tagName:', element.tagName);
          // You can use element.id to get the ID of the element that was clicked.
          // console.log('id:', element.id);
          // You can use element.className to get the class names of the element that was clicked.
          // console.log('className:', element.className);
          // You can use element.innerHTML to get the inner HTML of the element that was clicked.
          // console.log('innerHTML:', element.innerHTML);
          // You can use element.textContent to get the text content of the element that was clicked.
          // console.log('textContent:', element.textContent);

          console.log('iFrameComp: element', element);
          const data = {
            id: element.id,
            nodeName: element.nodeName || element.tagName,
            className: element.className,
            proxy: proxy,
            textContent: element.textContent,
            nodeType: element.nodeType,
            textContent: element.textContent,
            innerHTML: element.innerHTML,
            // attributes: {},
          };
          event.preventDefault();

          console.log('iFrameComp: data', data);

          // a POST request to the /cdp endpoint
          const response = await fetch('/cdp', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          // console.log('iFrameComp: response', response);

          const result = await response.json();

          // console.log('iFrameComp: Result returned from /cdp');

          // dispatching the results from the /cdp endpoint to the store
          dispatch(updateInlineRules(result.inlineRules));
          dispatch(updateRegularRules(result.regularRules));
          dispatch(updateUserAgentRules(result.userAgentRules));
          dispatch(updateStyleSheets(result.styleSheets));
          dispatch(updateNodeData(data));
          // dispatch(updateInheritedRules(result.inheritedRules));
          // dispatch(updateKeyframeRules(result.keyframeRules));
        };


        // This event listener needs to be added to the iframe's contentDocument because
        // we're listening for clicks inside the iframe, and those clicks won't be
        // handled by React's event delegation system. By adding this event listener,
        // we're essentially making the iframe's contentDocument a "portal" for
        // clicks to be handled by React.

        iframeDoc.addEventListener('click', (event) => {
          // Calling the handleClick function
          handleClick(event);

          // Set focus back to the parent document
          // This allows CSSxe to receive keyboard events again after clicking inside the iframe
          // before doing this, CSSxe would not receive keyboard events again until we clicked inside of the sidebar
          window.parent.focus();

        }, false);

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
