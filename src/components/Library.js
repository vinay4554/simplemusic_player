import react from "react";
import LibrarySongs from "./LibrarySongs";
const Library= ({songs,setCurrentSong,audioRef,isPlaying,setSong,libraryStatus}) => {
    return(
        <div className={`library ${libraryStatus?"active":""}`}>
        <h2>Songs</h2>
        <div className="library-songs">
        {songs.map(song => (<LibrarySongs 
        song={song}
        songs={songs}
        setCurrentSong={setCurrentSong}
        id={song.id}
        key={song.id}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSong={setSong}
        />
        ))}
        </div>
    </div>
    )
    
}

export default Library;