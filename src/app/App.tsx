import React from 'react';

import { AppRouter } from './AppRouter';

import './App.scss';
import 'assets/fonts/fonts.css';
import './theme/default/root.css';

function App() {
  return <AppRouter isAuthorized />;
}

export default App;
