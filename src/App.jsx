import { useDispatch, useSelector } from 'react-redux';
import { loadListings } from '../src/features/allListings/allListingsSlice';
import styles from './App.module.css';
import { Card } from './components/Card/Card';
import { Header } from './components/Header/Header';
import { useEffect, useRef } from 'react';


function App() {
  const dispatch = useDispatch();
  const { listings, isLoading, hasError } = useSelector((state) => state.allListings);
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          dispatch(loadListings());
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [dispatch, isLoading]);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <div>
            {listings.map((post, idx) => ( 
              <>
                <Card key={idx} {...post} />
                <hr />
              </>
            ))}
            {isLoading && <p>Loading...</p>}
            {hasError && <p>"Error loading the data :"</p>}
            <div ref={sentinelRef} style={{ height: 1 }} ></div>
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