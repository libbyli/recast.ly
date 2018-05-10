var searchYouTube = (options, callback) => {
  $.ajax({
    type: 'GET',
    url: 'https://www.googleapis.com/youtube/v3/search',
    data: {
      part: 'snippet',
      q: options.query,
      maxResults: options.max,
      key: options.key,
      type: 'video',
      videoEmbeddable: true
    },
    success: function(data) {
      callback(data);
    }
  });
};

var debouncedSearch = _.debounce(searchYouTube, 1000);

window.debouncedSearch = debouncedSearch;
window.searchYouTube = searchYouTube;