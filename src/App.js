import { createContext, useReducer, useContext } from 'react';
import { Grid, useMediaQuery, Hidden } from '@material-ui/core';
import AddSong from './components/AddSong';
import Header from './components/Header';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';
import songReducer from './reducer';
export const SongContext = createContext({
  song: {
    id: '4dff9d5e-c06f-4ecc-b8f1-6b42fb6636e4',
    title: "Ruff Ryders' Anthem (Official Music Video)",
    artist: 'DMX',
    thumbnail: 'http://img.youtube.com/vi/ThlhSnRk21E/0.jpg',
    url: 'https://www.youtube.com/watch?v=ThlhSnRk21E',
    duration: 223,
  },
  isPlaying: false,
});
function App() {
  const initialSongState = useContext(SongContext);
  const [state, dispatch] = useReducer(songReducer, initialSongState);
  const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const greaterThanSm = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  return (
    <SongContext.Provider value={{ state, dispatch }}>
      <Hidden only='xs'>
        <Header />
      </Hidden>
      <Grid container spacing={0}>
        <Grid
          style={{ paddingTop: greaterThanSm ? 80 : 10 }}
          item
          xs={12}
          md={7}
        >
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          style={
            greaterThanMd
              ? { position: 'fixed', width: '100%', right: 0, top: 70 }
              : {
                  position: 'fixed',
                  width: '100%',
                  left: 0,
                  bottom: 70,
                }
          }
          item
          xs={12}
          md={5}
        >
          <SongPlayer />
        </Grid>
      </Grid>
    </SongContext.Provider>
  );
}

export default App;
