import React from 'react';
import FormBody from '../Form/Form';

import style from './App.css';
import RestyProvider from '../../RestyProvider';
import HistoryContainer from '../History/HistoryContainer';
import Results from '../Results/Results';

export default function App() {


  return (<RestyProvider>
    <h1 className={style.header}>REST CLIENT</h1>
    <section className={style.body}>
      <HistoryContainer history={history}/>
      <article>
        <FormBody />
        <Results />
      </article>
    </section>
  </RestyProvider>);
}
