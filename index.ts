// Import stylesheets
import './style.css';
import { fromEvent, iif, from , of, race} from 'rxjs';
import {tap, pluck, distinctUntilChanged, debounceTime, mergeMap} from 'rxjs/operators';

import {MIN_STR_LENGTH_SEARCH_WIKI, DENOUNCE_SEARCH_MILLISECOND, URL} from './config';
import {search} from './services/searchService';
import {SearchResult} from './api/searchService';

const query = search({url : URL});
const searchResults = document.getElementById('searchResults');
const search$ = race(
  fromEvent(document.getElementById('searchInput'), 'keypress'),
  fromEvent(document.getElementById('searchInput'), 'keyup'),
  fromEvent(document.getElementById('searchInput'), 'keydown'),
  ).pipe(
  pluck('target', 'value'),
  debounceTime(DENOUNCE_SEARCH_MILLISECOND),
  distinctUntilChanged(),
  mergeMap(
    (value: string) => 
    iif(()=> value.length >= MIN_STR_LENGTH_SEARCH_WIKI, 
    from(query(value)), of(''))),

).subscribe((arr:SearchResult[])=>{
  searchResults.innerHTML = Array.isArray(arr) ? arr.map((val:SearchResult)=>{
    return `<div>${val.title}</div>`
  }).join('') : null
})
