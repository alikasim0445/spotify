import { call, put, takeEvery } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import * as songsApi from '../../api/songsApi';
import {
  fetchSongs,
  addSong,
  updateSong,
  deleteSong,
  fetchStats,
} from '../songs/songsSlice';
import type { Song, Stats } from '../../types';

// Worker sagas
function* fetchSongsSaga() {
  try {
    const songs: Song[] = yield call(songsApi.fetchSongs);
    yield put(fetchSongs.fulfilled(songs));
  } catch (error: any) {
    yield put(fetchSongs.rejected(error.message || 'Failed to fetch songs'));
  }
}

function* addSongSaga(action: PayloadAction<Omit<Song, '_id' | 'createdAt' | 'updatedAt'>>) {
  try {
    const newSong: Song = yield call(songsApi.createSong, action.payload);
    yield put(addSong.fulfilled(newSong));
  } catch (error: any) {
    yield put(addSong.rejected(error.message || 'Failed to add song'));
  }
}

function* updateSongSaga(action: PayloadAction<{ id: string; song: Partial<Song> }>) {
  try {
    const { id, song } = action.payload;
    const updatedSong: Song = yield call(songsApi.updateSong, id, song);
    yield put(updateSong.fulfilled(updatedSong));
  } catch (error: any) {
    yield put(updateSong.rejected(error.message || 'Failed to update song'));
  }
}

function* deleteSongSaga(action: PayloadAction<string>) {
  try {
    const id = action.payload;
    yield call(songsApi.deleteSong, id);
    yield put(deleteSong.fulfilled(id));
  } catch (error: any) {
    yield put(deleteSong.rejected(error.message || 'Failed to delete song'));
  }
}

function* fetchStatsSaga() {
  try {
    const stats: Stats = yield call(songsApi.fetchStats);
    yield put(fetchStats.fulfilled(stats));
  } catch (error: any) {
    yield put(fetchStats.rejected(error.message || 'Failed to fetch stats'));
  }
}

// Watcher sagas
function* watchFetchSongs() {
  yield takeEvery('songs/fetchSongs/pending', fetchSongsSaga);
}

function* watchAddSong() {
  yield takeEvery('songs/addSong/pending', addSongSaga);
}

function* watchUpdateSong() {
  yield takeEvery('songs/updateSong/pending', updateSongSaga);
}

function* watchDeleteSong() {
  yield takeEvery('songs/deleteSong/pending', deleteSongSaga);
}

function* watchFetchStats() {
  yield takeEvery('songs/fetchStats/pending', fetchStatsSaga);
}

export {
  watchFetchSongs,
  watchAddSong,
  watchUpdateSong,
  watchDeleteSong,
  watchFetchStats,
};