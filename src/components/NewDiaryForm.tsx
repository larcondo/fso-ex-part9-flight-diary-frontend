import { useState } from 'react';
import { Visibility, Weather, NewDiaryEntry } from '../types';

const NewDiaryForm = (
  { newDiaryFn }: { newDiaryFn: (param: NewDiaryEntry) => void}
): JSX.Element => {
  const initDate: string = (new Date().toISOString().substring(0,10));
  const [date, setDate] = useState<string>(initDate);
  const [comment, setComment] = useState<string>('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);

  const cleanInputs = () => {
    setDate(initDate);
    setVisibility(Visibility.Great);
    setWeather(Weather.Sunny);
    setComment('');
  };

  const addNew = (event: React.SyntheticEvent) => {
    event.preventDefault();
    newDiaryFn({
      date,
      comment,
      visibility,
      weather
    });
    cleanInputs();
  };

  return(
    <form onSubmit={addNew}>
      <div>
        date <input type='date' value={date} onChange={({ target }) => setDate(target.value)}/>
      </div>
      <div>
        visibility
        { Object.values(Visibility).map( (v, index) => {
          return <span key={index} style={{ marginLeft: '10px' }}>
            <label htmlFor={v.toString()}>{v.toString()}</label>
            <input
              type='radio'
              name='visibility'
              id={v.toString()}
              value={v.toString()}
              checked={visibility === v.toString()}
              onChange={({ target }) => setVisibility(target.value as Visibility)}
            />
          </span>;
        }) }
      </div>
      <div>
        weather
        {
          Object.values(Weather).map((w, index) => {
            return <span key={index} style={{ marginLeft: '10px' }}>
              <label htmlFor={w.toString()}>{w.toString()}</label>
              <input
                type='radio'
                name='weatder'
                id={w.toString()}
                value={w.toString()}
                checked={weather === w.toString()}
                onChange={({ target }) => setWeather(target.value as Weather)}
              />
            </span>;
          })
        }
      </div>
      <div>
        comment <input value={comment} onChange={({ target }) => setComment(target.value)}/>
      </div>
      <button type='submit'>add</button>
    </form>
  );
};

export default NewDiaryForm;