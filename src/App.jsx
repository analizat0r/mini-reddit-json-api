import { useDispatch, useSelector } from 'react-redux';
import { loadListings } from '../src/features/allListings/allListingsSlice';
import styles from './App.module.css';
import { Card } from './components/Card/Card';
import { Header } from './components/Header/Header';
import { useEffect, useRef } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


function App() {
  const dispatch = useDispatch();
  const { listings: feedListings, isLoading, hasError } = useSelector((state) => state.allListings);
  const { listings: searchListings, isLoading: searchLoading, hasError: searchError } = useSelector((state) => state.search);
  
  // show search results if any, otherwise feed
  const displayedListings = (searchListings && searchListings.length > 0) ? searchListings : feedListings;
  const loading = searchListings && searchListings.length > 0 ? searchLoading : isLoading;
  const error = searchListings && searchListings.length > 0 ? searchError : hasError;

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
            {loading && displayedListings.length === 0 ? (
              // show 5 skeleton cards while initial load
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} style={{ margin: '16px 0' }}>
                  <Skeleton height={32} width={200} /> {/* header */}
                  <Skeleton height={24} style={{ marginTop: 8 }} /> {/* title */}
                  <Skeleton height={400} /> {/* media placeholder */}
                  <Skeleton height={32} width={250} /> {/* footer */}
                </div>
              ))
            ) : (
              displayedListings.map((post, idx) => (
                <span key={idx}>
                  <Card {...post} />
                  <hr />
                </span>
              ))
            )}
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