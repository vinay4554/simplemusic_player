import react, { useState,useRef } from "react";
// importing components
import Music from "./components/Music";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/nav";
// importing list of objects of music data
import musicFolder from "./data";
// importing styles from scss
import "./styles/App.scss";
// Declaring the main App component
function App() {
  // declaring audioRef
  const audioRef = useRef(null);
  // declaring the useStates
  const [songInfo,setSongInfo]=useState({currentTime:0,duration:0})
  const [songs,setSong]=useState(musicFolder());
  const [currentSong,setCurrentSong]=useState(songs[0]);
  const [isPlaying,setIsPlaying]=useState(false);
  const [libraryStatus,setlibraryStatus]=useState(false);

  const timeUpdateHandler=(e) =>{
    setSongInfo({
        ...songInfo,
        currentTime:e.target.currentTime,
        duration:e.target.duration||0
    });
};
const songEndHandler = async () =>{
     const currentIndex=songs.findIndex((song) => song.id===currentSong.id);
     await setCurrentSong(songs[(currentIndex+1)%songs.length])
     if (isPlaying) audioRef.current.play();
}

  return (
    <div className="App">
     <Nav libraryStatus={libraryStatus} setlibraryStatus={setlibraryStatus} />
     <Music currentSong={currentSong}/>
     <Player 
     currentSong={currentSong} 
     isPlaying={isPlaying}
     setIsPlaying={setIsPlaying}
     audioRef={audioRef}
     timeUpdateHandler={timeUpdateHandler}
     songInfo={songInfo}
     setSongInfo={setSongInfo}
     songs={songs}
     setCurrentSong={setCurrentSong}
     setSong={setSong}
     />
     <Library 
     songs={songs} 
     isPlaying={isPlaying}
     setCurrentSong={setCurrentSong}
       audioRef={audioRef}
       isPlaying={isPlaying}
       setSong={setSong}
       libraryStatus={libraryStatus}
     />
     <audio
             onTimeUpdate={timeUpdateHandler} 
             onLoadedMetadata={timeUpdateHandler}
             ref={audioRef} 
             src={currentSong.audio}
             onEnded={songEndHandler} >
    </audio>
    </div>
  );

}

export default App;
