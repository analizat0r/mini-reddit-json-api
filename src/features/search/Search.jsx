import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '../../components/Icons/SearchIcon';
import styles from './Search.module.css';
import { setSearchTerm, clearSearchTerm, searchPosts } from './searchSlice'

export function Search() {
    const dispatch = useDispatch();
    const searchTerm = useSelector((state) => state.search.searchTerm);

    const onSearchChangeHandler = (e) => {
        dispatch(setSearchTerm(e.target.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const term = searchTerm.trim();
        if (!term) return;
        try {
            await dispatch(searchPosts(term)).unwrap();
            dispatch(clearSearchTerm());

        } catch (error) {
            console.log('Search failed', error);
        }
    }

    return (
        <form className={styles.searchComponentChild} onSubmit={handleSubmit}>
            {searchTerm.length > 0 && (
                <button type='submit'>
                    <SearchIcon size={16} className={styles.searchIcon} />
                </button>
            )}
            <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={onSearchChangeHandler}    
                placeholder='Search Reddit'
                className={styles.searchInput}
             />
        </form>
    );
};