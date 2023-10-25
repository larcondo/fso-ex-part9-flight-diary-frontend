import { DiaryEntry } from '../types';

const Diary = ({ diary }: { diary: DiaryEntry }): JSX.Element => {
  return (
    <div>
      <h3 style={{ margin: '0' }}>{ diary.date }</h3>
      <p style={{ margin: '1ch 0 1ch 0' }}>weather: { diary.weather }</p>
      <p style={{ margin: '0 0 1ch 0' }}>visibility: { diary.visibility }</p>
      <p style={{ margin: '0 0 3ch 0' }}>comment: <i>{ diary.comment }</i></p>
    </div>
  );
};

export default Diary;