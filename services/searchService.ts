import {Search, SearchOption, SearchRules} from '../api/searchSerice';

export const search:Search =(opt:SearchOption) =>{
  const {url} = opt;
  // TODO validate option
  return async(val: string) => {
      const response = await fetch(url + val)
      .then(response => response.json())
      .then(data => {
        return Promise.resolve(data.query ? data.query.search : []);
      })
      .catch(() => console.log('An error occurred'));

// console.log('response',response)
    return response;
}
}