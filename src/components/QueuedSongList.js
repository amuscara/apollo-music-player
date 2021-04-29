import { useMutation } from '@apollo/client';
import {
  Avatar,
  IconButton,
  Typography,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react';
import { ADD_OR_REMOVE_FROM_QUEUE } from '../graphql/mutations';

export default function QueuedSongList({ queue }) {
  console.log('queue', { queue });
  const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));

  // const song = {
  //   title: 'Domestic Bliss',
  //   artist: 'Glass Animals',
  //   thumbnail:
  //     'https://images.pexels.com/photos/6869636/pexels-photo-6869636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  // };

  return (
    greaterThanMd && (
      <div style={{ margin: '10px 0' }}>
        <Typography color='textSecondary' variant='button'>
          QUEUE ({queue.length})
        </Typography>
        {queue.map((song, i) => (
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
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
    onCompleted: (data) => {
      localStorage.setItem('queue', JSON.stringify(data.addOrRemoveFromQueue));
    },
  });
  const { thumbnail, artist, title } = song;

  function handleAddOrRemoveFromQueue() {
    addOrRemoveFromQueue({
      variables: { input: { ...song, __typename: 'Song' } },
    });
  }
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
      <IconButton onClick={handleAddOrRemoveFromQueue}>
        <Delete color='error' />
      </IconButton>
    </div>
  );
}
