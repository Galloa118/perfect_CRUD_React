import { fork, cancel } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actionTypes } from 'redux-form';
import { SAVE, DELETE } from './Item/constants';
import { saveItem, deleteItem } from './Item/sagas';
import { loadList } from './List/sagas';
import { updateMatches } from './ItemForm/UserAutoComplete/sagas';
import { UPDATE_MATCHES } from './ItemForm/UserAutoComplete/constants';
import { filterExpenses, onFilterDestroy } from './Filter/sagas';
import { LOAD_LIST } from './List/constants';
import { SET_SORT_FIELD, SET_SORT_DIRECTION } from './Header/constants';

let watcher = null;

function* onLocationChange(action) {
  if (action.payload.pathname !== '/expenses') {
    yield cancel(watcher);
    watcher = null;
  }
}

function* actionsWatcher() {
  yield fork(takeLatest, SAVE, saveItem);
  yield fork(takeLatest, DELETE, deleteItem);
  yield fork(takeLatest, UPDATE_MATCHES, updateMatches);
  yield fork(takeLatest, actionTypes.CHANGE, filterExpenses);
  yield fork(takeLatest, actionTypes.RESET, filterExpenses);
  yield fork(takeLatest, actionTypes.DESTROY, onFilterDestroy);
  yield fork(takeLatest, LOCATION_CHANGE, onLocationChange);
  yield fork(takeLatest, LOAD_LIST, loadList);
  yield fork(takeLatest, SET_SORT_FIELD, loadList);
  yield fork(takeLatest, SET_SORT_DIRECTION, loadList);
}

function* main() {
  // Do not execute any code if watcher is already is expensening
  if (watcher) return;

  // start the SAVE action watcher
  watcher = yield fork(actionsWatcher);
}

export default [
  loadList,
  main,
];
