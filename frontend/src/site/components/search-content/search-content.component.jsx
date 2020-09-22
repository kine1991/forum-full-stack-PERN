import React, { useEffect } from 'react';
import { useState } from 'react';

import { fetchChannelsByTerm } from 'redux/channel/channel.action';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { SearchContentConteiner } from './search-content.styles';

const subjectTerm$ = new Subject('');
const useObservable = observable => {
  const [value, setValue] = useState('');
  useEffect(() => {
    let subscription = observable.subscribe(result => {
      setValue(result);
    });

    return () => {
      subscription.unsubscribe()
    }
  }, [observable, setValue]);

  return value;
}

const SearchContent = React.forwardRef(({term}, ref) => {
  const [channels, setChannels] = useState(null);

  const termDelaed = useObservable(subjectTerm$.pipe(
    debounceTime(1000),
    distinctUntilChanged()
  ));
  
  useEffect(() => {
    subjectTerm$.next(term);
  }, [term]);

  useEffect(() => {
    fetchChannelsByTerm(termDelaed).then(response => {
      console.log('response', response.data.channels);
      setChannels(response.data.channels);
    });
  }, [termDelaed]);

  if(!channels) return <div></div>
  if(channels.length === 0) return <div>Не найдено</div>
  return (
    <SearchContentConteiner ref={ref}>
      <h1>Количество: {channels.length}</h1>
      {channels.map(channel => (
        <div key={channel.id}>{channel.id}</div>
      ))}
    </SearchContentConteiner>
  )
});

export default SearchContent;
