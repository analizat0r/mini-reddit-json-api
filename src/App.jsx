import { useDispatch, useSelector } from 'react-redux';
import { loadListings } from '../src/features/allListings/allListingsSlice';
import './App.css';
import { Card } from './components/Card/Card';
import { Header } from './components/Header/Header';

function App() {
   const dispatch = useDispatch();
    const { listings, isLoading, hasError } = useSelector((state) => state.allListings);

    const handleClick = () => {
      dispatch(loadListings());
    };

  return (
    <>
      <Header />
      <button onClick={handleClick}>Show data</button>
      {isLoading && <p>Loading...</p>}
      {hasError && <p>"Error loading the data :("</p>}
      
      {listings.map((item, idx) => (
        <>
        <Card key={idx} title={item.title} />
        <hr></hr>
        </>
      ))}
    </>
  )
}

export default App;