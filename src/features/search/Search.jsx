import SearchIcon from '../../components/Icons/SearchIcon';
import styles from './Search.module.css'

export function Search() {
    return (
        <form className={styles.searchComponentChild}>
            <button>
                <SearchIcon size={16} className={styles.searchIcon} />
            </button>
            <input placeholder='Search Reddit' className={styles.searchInput}></input>
        </form>
    );
};