import { useEffect, useState } from 'react';
import { DiaryEntry } from './types';
import { getAllDiaries } from './services/diaryService';
import Diary from './components/Diary';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then(data => setDiaries(data));
  }, []);

  return (
    <>
      <h1>Ilari's flight diaries</h1>
      <h2>Diary entries</h2>
      { diaries && diaries.map( d => {
        return <Diary key={d.id} diary={d} />;
      })}
    </>
  );
};

export default App;