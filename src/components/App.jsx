class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      videoList: [],
      videoPlayer: {
        id: {
          videoId: null
        },
        snippet: {
          title: null,
          description: null,
          thumbnails: {
            default: {
              url: null
            }
          }
        }
      }
    };
    
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  
  componentDidMount() {
    this.props.searchYouTube({query: 'cute dogs', max: 5, key: YOUTUBE_API_KEY}, (data) => {
      this.setState({
        videoList: data.items,
        videoPlayer: data.items[0]
      });
    });
  }
  
  handleClick(video) {
    this.setState({
      videoPlayer: video
    });
  }
  
  handleSearch(options) {
    debouncedSearch(options, (data) => {
      this.setState({
        videoList: data.items,
        videoPlayer: data.items[0]
      });
    });
  }
  
  render () {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search handleSearch={this.handleSearch} />
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.videoPlayer} />
          </div>
          <div className="col-md-5">
            <VideoList videos={this.state.videoList} handleClick={this.handleClick} />
          </div>
        </div>
      </div>
    );
    
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;
