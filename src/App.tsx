import { useEffect, useState } from 'react';
import { DiaryEntry } from './types';
import { getAllDiaries, createNew } from './services/diaryService';
import Diary from './components/Diary';
import NewDiaryForm from './components/NewDiaryForm';
import Notification from './components/Notification';
import axios from 'axios';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaries().then(data => setDiaries(data));
  }, []);

  const createDiary = async (newEntry: DiaryEntry) => {
    // createNew(newEntry).then(data => setDiaries(diaries.concat(data)));
    createNew(newEntry)
      .then(data => setDiaries(diaries.concat(data)))
      .catch( err => {
        if (axios.isAxiosError(err)) {
          // console.log(err.response?.data);
          setErrorMsg(err.response?.data);
          setTimeout(() => setErrorMsg(null), 2000);
        } else {
          console.error(err);
          setErrorMsg('Unexpected error. Try later');
          setTimeout(() => setErrorMsg(null), 2000);
        }
      });
  };

  return (
    <>
      <h1>Ilari's flight diaries</h1>
      <h2>Add new entry</h2>
      <Notification message={errorMsg} />

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