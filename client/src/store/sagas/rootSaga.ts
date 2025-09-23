import { all, fork } from 'redux-saga/effects';
import {
  watchFetchSongs,
  watchAddSong,
  watchUpdateSong,
  watchDeleteSong,
  watchFetchStats,
} from './songsSaga';

export default function* rootSaga() {
  yield all([
    fork(watchFetchSongs),
    fork(watchAddSong),
    fork(watchUpdateSong),
    fork(watchDeleteSong),
    fork(watchFetchStats),
  ]);
}