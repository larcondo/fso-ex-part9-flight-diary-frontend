import { useState } from 'react';
import { DiaryEntry, Visibility, Weather } from '../types';

const NewDiaryForm = ({ newDiaryFn }: { newDiaryFn: (param: DiaryEntry) => void}): JSX.Element => {
  const [date, setDate] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [visibility, setVisibility] = useState<Visibility | string>('');
  const [weather, setWeather] = useState<Weather | string>('');

  const cleanInputs = () => {
    setDate('');
    setComment('');
    setVisibility('');
    setWeather('');
  };

  const addNew = (event: React.SyntheticEvent) => {
    event.preventDefault();
    newDiaryFn({
      date,
      comment,
      visibility,
      weather
    } as DiaryEntry);
    cleanInputs();
  };

  return(
    <form onSubmit={addNew}>
      <div>
        date <input value={date} onChange={({ target }) => setDate(target.value)}/>
      </div>
      <div>
        visibility <input value={visibility} onChange={({ target }) => setVisibility(target.value) } />
      </div>
      <div>
        weather <input value={weather} onChange={({ target }) => setWeather(target.value) } />
      </div>
      <div>
        comment <input value={comment} onChange={({ target }) => setComment(target.value)}/>
      </div>
      <button type='submit'>add</button>
    </form>
  );
};

export default NewDiaryForm;