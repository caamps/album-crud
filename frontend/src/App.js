import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import AlbumList from './components/AlbumList';
import Add from './components/Add';
import Update from './components/Update';
import RootLayout from './components/RootLayout';
import ErrorElement from './components/ErrorElement';
import "./styles.css"

function App() {

  const router = createBrowserRouter([
    {path: '/', element: <RootLayout/>, errorElement: <ErrorElement/>, children: [
      {index: true, element: <AlbumList/>},
      {path: 'Add', element: <Add/>},
      {path: 'Update/:id', element: <Update/>}
    ]}
  ])

  return (
    <div className='app'>
    <RouterProvider router={router}/>
    </div>
  );
}

export default App;
