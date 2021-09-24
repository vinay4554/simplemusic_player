import react from "react";
const Music= ({currentSong}) => {
    return(
      
        <div className="Music">
        <img src={currentSong.cover} alt="" />
        <h2>{currentSong.name}</h2>
        <h3>{currentSong.artist}</h3>
    </div>
    )
}

export default Music;