window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const element = document.getElementById('embed-iframe');
    const options = {
        uri: ''
      };
    const callback = (EmbedController) => {};
    IFrameAPI.createController(element, options, callback);
  };