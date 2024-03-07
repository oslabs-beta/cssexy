
window.addEventListener('load', function() {
  setTimeout(function() {
    const iframe = document.getElementById('site-frame');

    if (iframe) {
      console.log('iframe', iframe);

      iframe.addEventListener('load', function() {
        console.log('iframe: eventListener added');

        try {
          var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
          console.log('iframeDoc', iframeDoc);

          // Attach the click event listener directly inside the iframe's document
          iframeDoc.addEventListener('click', function(event) {
            console.log('Click inside iframe');
            event.preventDefault(); // Prevent default action of the click event
            // Add your logic here to handle the click event
          }, false);
        } catch (error) {
          console.error("Can't access iframe content:", error);
        }
      });
    }
  }, 1000);
});
