import { useDispatch, useSelector } from 'react-redux';
import { loadListings } from '../src/features/allListings/allListingsSlice';
import styles from './App.module.css';
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

      <main className={styles.main}>
        <div className={styles.wrapper}>
          <div>
            <button onClick={handleClick}>Show data</button>
            {isLoading && <p>Loading...</p>}
            {hasError && <p>"Error loading the data :"</p>}
            
            {listings.map((item, idx) => (
              <>
              <Card
                key={idx}
                subreddit={item.subreddit}
                title={item.title}
                commentsCount={item.num_comments}
                score={item.score} />
              <hr></hr>
              </>
            ))}
          </div>
          <aside>
            sidebar with subreddits
          </aside>
        </div>
      </main>

      
    </>
  )
}

export default App;