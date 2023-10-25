import { useEffect, useState } from 'react';
import { DiaryEntry } from './types';
import { getAllDiaries, createNew } from './services/diaryService';
import Diary from './components/Diary';
import NewDiaryForm from './components/NewDiaryForm';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then(data => setDiaries(data));
  }, []);

  const createDiary = (newEntry: DiaryEntry) => {
    createNew(newEntry).then(data => setDiaries(diaries.concat(data)));
  };

  return (
    <>
      <h1>Ilari's flight diaries</h1>
      <h2>Add new entry</h2>

      <NewDiaryForm newDiaryFn={createDiary} />

      <h2>Diary entries</h2>
      { diaries &&
        diaries
          .sort((a, b) => b.date.localeCompare(a.date))
          .map( d => {
            return <Diary key={d.id} diary={d} />;
          })
      }
    </>
  );
};

export default App;