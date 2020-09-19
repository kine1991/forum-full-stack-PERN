import React, { useEffect } from 'react';

import { fetchChannelsByTerm } from 'redux/channel/channel.action';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { SearchContentConteiner } from './search-content.styles';

// function debounceTime(term, time) {

// }

// function debounce(func, wait = 100) {
//   let timeout;
//   return function(...args) {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       func.apply(this, args);
//     }, wait);
//   };
// }

const test = () => {
  console.log('test')
}
const subjectTerm$ = new Subject('');

subjectTerm$.pipe(
  debounceTime(3000),
  distinctUntilChanged()
).subscribe(value => {
  console.log('value', value)
})


const SearchContent = React.forwardRef(({term}, ref) => {

  useEffect(() => {
    subjectTerm$.next(term)
  }, [term]);


  if(!term) return <div></div>
  return (
    <SearchContentConteiner ref={ref}>
      SearchContent <h1>{term}</h1>
    </SearchContentConteiner>
  )
});

export default SearchContent;
