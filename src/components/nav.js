import react from "react";
// importing the fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav=({libraryStatus,setlibraryStatus}) => {
    return(
       <nav>
           <h1>My music</h1>
            <button onClick={() => setlibraryStatus(!libraryStatus)}>
                Library <FontAwesomeIcon icon={faMusic} />
            </button>
       </nav>
            
       
    )
};
export default Nav;