//import { useDispatch, useSelector } from 'react-redux';
//import { loadListings } from '../src/features/allListings/allListingsSlice';
import './App.css';
import { Card } from './components/Card';

function App() {
   // const dispatch = useDispatch();
    //const { listings, isLoading, hasError } = useSelector((state) => state.allListings);

    // const handleClick = () => {
    //   dispatch(loadListings());
    // };

  return (
    <>
      <Card />
      {/* <button onClick={handleClick}>Show data</button>
      {isLoading && <p>Loading...</p>}
      {hasError && <p>"Error loading the data :("</p>}
      <ul>
        {listings.map((item, idx) => (
          <li key={idx}>{item.title}</li>
        ))}
      </ul> */}
    </>
  )
}

export default App;