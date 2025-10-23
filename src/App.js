import logo from './logo.svg';
import './App.css';
import MainPage from './MainPage/index.js'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store'
import { ClassPage } from './MainPage/Classes/ClassPages/index.js';
import Redirect from './RedirectCenter/index.js';

function App() {
  return (
    <div>
      <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path="/Redirect" element={<Redirect/>}></Route>

        <Route path="/" element={<MainPage selectedPage={'Armory'}/>}></Route>
        <Route path="/Armory" element={<MainPage selectedPage={'Armory'}/>}></Route>
        <Route path="/Spells" element={<MainPage selectedPage={'Spells'}/>}></Route>
        <Route path="/Classes" element={<MainPage selectedPage={'Classes'}/>}></Route>
        <Route path="/Feats" element={<MainPage selectedPage={'Feats'}/>}></Route>
        <Route path="/DatabaseGUI" element={<MainPage selectedPage={'DatabaseGUI'}/>}></Route>
        <Route path="/Nations" element={<MainPage selectedPage={'Nations'}/>}></Route>
        <Route path="/Rules" element={<MainPage selectedPage={'Rules'}/>}></Route>
        <Route path="/Races" element={<MainPage selectedPage={'Races'}/>}></Route>
        <Route path="/artificer" element={<ClassPage/>}></Route>
      </Routes>
    </BrowserRouter>
    </Provider>
    </div>
  );
}

export default App;
