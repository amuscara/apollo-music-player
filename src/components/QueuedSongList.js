import {
  Avatar,
  IconButton,
  Typography,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react';

export default function QueuedSongList() {
  const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const song = {
    title: 'Domestic Bliss',
    artist: 'Glass Animals',
    thumbnail:
      'https://images.pexels.com/photos/6869636/pexels-photo-6869636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  };

  return (
    greaterThanMd && (
      <div style={{ margin: '10px 0' }}>
        <Typography color='textSecondary' variant='button'>
          QUEUE (5)
        </Typography>
        {Array.from({ length: 5 }, () => song).map((song, i) => (
          <QueuedSong key={i} song={song} />
        ))}
      </div>
    )
  );
}
const useStyles = makeStyles({
  avatar: {
    width: 44,
    height: 44,
  },
  text: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  container: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: '50px auto 50px',
    gridGap: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  songInfoContainer: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
});
function QueuedSong({ song }) {
  const classes = useStyles();
  const { thumbnail, artist, title } = song;
  return (
    <div className={classes.container}>
      <Avatar src={thumbnail} alt='Song Thumbnail' className={classes.avatar} />
      <div className={classes.songInfoContainer}>
        <Typography className={classes.text} variant='subtitle2'>
          {title}
        </Typography>
        <Typography
          className={classes.text}
          variant='body2'
          color='textSecondary'
        >
          {artist}
        </Typography>
      </div>
      <IconButton>
        <Delete color='error' />
      </IconButton>
    </div>
  );
}
