// Import stylesheets
import './style.css';
import { fromEvent, iif, from , of} from 'rxjs';
import {pluck, distinctUntilChanged, debounceTime, mergeMap} from 'rxjs/operators';
import {MIN_STR_LENGTH_SEARCH_WIKI, DENOUNCE_SEARCH_MILLISECOND, URL} from './config';
import {search} from './services/searchService';
import {SearchResult} from './api/searchService';

const query = search({url : URL});
const searchResults = document.getElementById('searchResults');
const search$ = fromEvent(document.getElementById('searchInput'), 'keyup').pipe(
  pluck('target', 'value'),
  distinctUntilChanged(),
  debounceTime(DENOUNCE_SEARCH_MILLISECOND),
  mergeMap(
    (value: string) => 
    iif(()=> value.length >= MIN_STR_LENGTH_SEARCH_WIKI, 
    from(query(value)), of(''))),

).subscribe((arr:SearchResult[])=>{
  searchResults.innerHTML = Array.isArray(arr) ? arr.map((val:SearchResult)=>{
    return `<div>${val.title}</div>`
  }).join('') : null
})
