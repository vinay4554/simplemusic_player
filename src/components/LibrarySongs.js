import react from "react";
const LibrarySongs= ({song,songs,setCurrentSong,id,audioRef,isPlaying,setSong}) => {
    const selectedSongHandler= async () => { 

        const selectedSong = songs.filter((state) => state.id===id)
        await setCurrentSong(selectedSong[0]);
        const newSongs=songs.map((song)=> {
            if(song.id===id){
                return{
                    ...song,
                    active:true
                }
            }
            else{
                return{
                    ...song,
                    active:false
                }
            }
        });
        setSong(newSongs);
        if (isPlaying) audioRef.current.play();
       
    }
    return(
      
        <div onClick={selectedSongHandler} className={`library-song ${song.active?"selected":""}`}>
        <img src={song.cover} alt="image not found" />
        <div className="library-components">
        <h2>{song.name}</h2>
        <h3>{song.artist}</h3>
        </div>
        
    </div>
    )
}

export default LibrarySongs;