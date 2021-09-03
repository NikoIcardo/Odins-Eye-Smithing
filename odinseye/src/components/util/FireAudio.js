import React, { useRef, useEffect} from 'react'; 
import mp3 from '../../sounds/campfire-1.mp3';

const FireAudio = () => {
  const fireRef = useRef();

  useEffect(() => {
    console.log('help');
    fireRef.current.muted = false;
    fireRef.current.autoplay = true;
    fireRef.current.pause();
    fireRef.current.loop = true;
    fireRef.current.play();
  }, []);

  return <audio ref={fireRef} src={mp3}></audio>
}; 

export default FireAudio; 