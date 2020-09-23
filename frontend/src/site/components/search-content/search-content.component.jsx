import React, { useEffect } from 'react';
import { useState } from 'react';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { fetchChannelsByTerm } from 'redux/channel/channel.action';
import { SearchContentConteiner, Item, Left, Right, Photo } from './search-content.styles';
import { Link, useHistory } from 'react-router-dom';
import Button from 'shared/components/button/button.component';

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
  const history = useHistory();
  const [channels, setChannels] = useState(null);
  const [channelsOnPage, setChannelsOnPage] = useState(null);
  const [allChannels, setAllChannels] = useState(null);

  const termDelaed = useObservable(subjectTerm$.pipe(
    debounceTime(1000),
    distinctUntilChanged()
  ));
  
  useEffect(() => {
    subjectTerm$.next(term);
  }, [term]);

  useEffect(() => {
    // console.log('termDelaed', termDelaed)
    if(termDelaed) {
      fetchChannelsByTerm(termDelaed)
      .then(response => {
        setChannelsOnPage(response.data.channels_on_page);
        setAllChannels(response.data.all_channels);
        setChannels(response.data.channels);
      });
    }
  }, [termDelaed]);

  if(!channels) return <SearchContentConteiner ref={ref}>Loading...</SearchContentConteiner>
  if(channels.length === 0) return <SearchContentConteiner ref={ref}>Не найдено</SearchContentConteiner>
  return (
    <SearchContentConteiner ref={ref}>
      <h1>Найденно каналов: {channels.length}</h1>
      {channels.map(channel => (
        <Item key={channel.id}>
          <Left>
            <Photo src={channel.image_url_channel}/>
          </Left>
          <Right>
            <Link to={`/channels/${channel.slug}`}>{channel.name}</Link>
          </Right>
        </Item>
      ))}
      {allChannels > channelsOnPage ? (
        <Button 
          content='Показать больше'
          fullWidth
          rounded
          onClick={() => history.push({
            pathname: '/channels',
            search: `?term=${term}`
          })}/>
      ) : null}
    </SearchContentConteiner>
  )
});

export default SearchContent;
