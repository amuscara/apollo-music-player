import React, { useState, useEffect } from 'react';
import {
  InputAdornment,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles,
} from '@material-ui/core';
import { AddBoxOutlined, Link } from '@material-ui/icons';
import ReactPlayer from 'react-player';
import SoundcloudPlayer from 'react-player/lib/players/SoundCloud';
import YoutubePlayer from 'react-player/lib/players/YouTube';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  urlInput: {
    margin: theme.spacing(1),
  },
  addSongButton: {
    margin: theme.spacing(1),
  },
  dialog: {
    textAlign: 'center',
  },
  thumbnail: {
    width: '90%',
  },
}));

export default function AddSong() {
  const [url, setUrl] = useState('');
  const [playable, setPlayable] = useState(false);
  const classes = useStyles();
  const [dialog, setDialog] = useState(false);
  const [song, setSong] = useState({
    duration: 0,
    title: '',
    artist: '',
    thumbnail: '',
  });
  useEffect(() => {
    const isPlayable =
      SoundcloudPlayer.canPlay(url) || YoutubePlayer.canPlay(url);
    setPlayable(isPlayable);
  }, [url]);

  function handleChangeSong(event) {
    const { name, value } = event.target;
    setSong((prevSong) => ({
      ...prevSong,
      [name]: value,
    }));
  }

  function handleCloseDialog() {
    setDialog(false);
  }

  async function handleEditSong({ player }) {
    const nestedPlayer = player.player.player;
    let songData;
    if (nestedPlayer.getVideoData) {
      songData = getYoutubeInfo(nestedPlayer);
    } else if (nestedPlayer.getCurrentSound) {
      songData = await getSoundcloudInfo(nestedPlayer);
    }
    setSong({ ...songData, url });
  }
  function getYoutubeInfo(player) {
    const duration = player.getDuration();
    const { title, video_id, author } = player.getVideoData();
    const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`;
    return {
      duration,
      title,
      artist: author,
      thumbnail,
    };
  }
  function getSoundcloudInfo(player) {
    return new Promise((resolve) => {
      player.getCurrentSound((songData) => {
        if (songData) {
          resolve({
            duration: Number(songData.duration / 1000),
            title: songData.title,
            artist: songData.user.username,
            thumbnail: songData.artwork_url.replace('-large', '-t500x500'),
          });
        }
      });
    });
  }

  const { thumbnail, title, artist } = song;

  return (
    <div className={classes.container}>
      <Dialog
        className={classes.dialog}
        open={dialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <img src={thumbnail} alt='song title' className={classes.thumbnail} />
          <TextField
            value={title}
            onChange={handleChangeSong}
            margin='dense'
            name='title'
            label='Title'
            fullWidth
          />
          <TextField
            value={artist}
            onChange={handleChangeSong}
            margin='dense'
            name='artist'
            label='Artist'
            fullWidth
          />
          <TextField
            value={thumbnail}
            onChange={handleChangeSong}
            margin='dense'
            name='thumbnail'
            label='Thumbnail'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='secondary'>
            cancel
          </Button>
          <Button color='primary' variant='outlined'>
            Add Song
          </Button>
        </DialogActions>
      </Dialog>
      <TextField
        className={classes.urlInput}
        placeholder='Add Youtube or SoundCloud Url'
        fullWidth
        margin='normal'
        type='url'
        onChange={(event) => setUrl(event.target.value)}
        value={url}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Link />
            </InputAdornment>
          ),
        }}
      />
      <Button
        disabled={!playable}
        className={classes.addSongButton}
        onClick={() => setDialog(true)}
        variant='contained'
        color='primary'
        endIcon={<AddBoxOutlined />}
      >
        Add
      </Button>
      <ReactPlayer url={url} hidden onReady={handleEditSong} />
    </div>
  );
}
