import _ from "lodash";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetails from "./components/video_details";
import YTSearch from "youtube-api-search";

const Api_Key = "AIzaSyDoFk3dEhfEShD0KMoG-vwH7y1mT2urSFM";


class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        };
        this.videoSearch("yahoo");
    }

    videoSearch(term) {
        YTSearch({key: Api_Key, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        //this function as like rx js functionality. It execute after 
        //user has finished his typing before 350 milliseconds.
        //it also return a higher order function
        const controlledSearch = _.debounce((term) => {
            this.videoSearch(term)
        }, 350);

        return (
                <div>
                    <SearchBar onSearchTerm={controlledSearch}/>
                    <VideoDetails video={this.state.selectedVideo}/>
                    <VideoList
                            onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                            videos={this.state.videos}
                    />
                </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));
