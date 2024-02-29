
document.addEventListener('DOMContentLoaded',
function() {
  console.log('Document loaded');
  let iframe = document.getElementById('site-frame');
  console.log('frame origin', iframe.contentWindow.location.origin);
    if (iframe) {
      console.log('iframe',iframe);
        iframe.onload = function() {
            var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            iframeDoc.addEventListener('click', function(event) {
                var element = event.target;
                var attributes = element.attributes;
                var attrs = {};
                for (var i = 0; i < attributes.length; i++) {
                    attrs[attributes[i].name] = attributes[i].value;
                }
                console.log(attrs);
            }, false);
        };
    }
});
