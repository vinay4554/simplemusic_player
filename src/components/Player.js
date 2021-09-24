import react from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faFastForward, faFastBackward,faPauseCircle} from "@fortawesome/free-solid-svg-icons";
const Player = ({ currentSong, isPlaying, setIsPlaying,audioRef,timeUpdateHandler,songInfo,setSongInfo,songs,setCurrentSong,setSong}) => {

    const handleClickHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }
        else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }

    }
 const getTime=(time) =>{
     return(
         Math.floor(time/60)+":"+("0"+Math.floor(time%60)).slice(-2)
     )
 }
const activeUpdateHandler= (nextprev) => {
    const newSongs=songs.map((song)=> {
        if(song.id===nextprev.id){
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
    setSong(newSongs)
}
const handleChange=(e) => {
    audioRef.current.currentTime=e.target.value;
    setSongInfo({
        ...songInfo,
        currentTime:e.target.currentTime
    });
}

const handleSkipHandler= async (direction) => {
    const currentIndex=songs.findIndex((song) => song.id===currentSong.id);
    if(direction==="forward"){
       await setCurrentSong(songs[(currentIndex+1)%songs.length])
       activeUpdateHandler(songs[(currentIndex+1)%songs.length])
    }
    if(direction==="backward"){
        if((currentIndex-1)%songs.length===-1){
           await setCurrentSong(songs[songs.length-1]);
           activeUpdateHandler(songs[songs.length-1])
            if (isPlaying) audioRef.current.play();
            return;
        }
        await setCurrentSong(songs[(currentIndex-1)%songs.length])
        activeUpdateHandler(songs[(currentIndex-1)%songs.length])
    }
    if (isPlaying) audioRef.current.play();
};


    return (
        <div className="Player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input 
                min="0" 
                max={0||songInfo.duration} 
                value={songInfo.currentTime} 
                onChange={handleChange}
                type="range" />
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
            <FontAwesomeIcon 
                onClick={() => handleSkipHandler("backward")}
                className="backward" 
                size="2x" 
                icon={faFastBackward} />
                <FontAwesomeIcon 
                onClick={handleClickHandler} 
                className="play" 
                size="2x" 
                icon={isPlaying?faPauseCircle:faPlayCircle} />
                <FontAwesomeIcon 
                onClick={() => handleSkipHandler("forward")}
                className="forward" 
                size="2x" 
                icon={faFastForward} />
            </div>
        </div>
    )
}
export default Player;