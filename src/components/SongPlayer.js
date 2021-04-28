import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Slider,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { PlayArrow, SkipNext, SkipPrevious } from '@material-ui/icons';
import React from 'react';
import QueuedSongList from './QueuedSongList';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 15px',
  },
  content: {
    flex: '1 0 auto',
  },
  thumbnail: {
    width: 150,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function SongPlayer() {
  const classes = useStyles();
  return (
    <>
      <Card variant='outlined' className={classes.container}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant='h5' component='h3'>
              Title
            </Typography>
            <Typography variant='subtitle1' component='p' color='textSecondary'>
              Artist
            </Typography>
          </CardContent>
          <div classes={classes.controls}>
            <IconButton>
              <SkipPrevious />
            </IconButton>
            <IconButton>
              <PlayArrow classes={classes.playIcon} />
            </IconButton>
            <IconButton>
              <SkipNext />
            </IconButton>
            <Typography variant='subtitle1' component='p' color='textSecondary'>
              00:01:30
            </Typography>
          </div>
          <Slider type='range' min={0} max={1} step={0.01} />
        </div>
        <CardMedia
          className={classes.thumbnail}
          image='https://images.pexels.com/photos/6869636/pexels-photo-6869636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        />
      </Card>
      <QueuedSongList />
    </>
  );
}