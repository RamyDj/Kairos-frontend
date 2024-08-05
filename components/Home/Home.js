import styles from '../styles/Home.module.css';
import Head from 'next/head';
import Search from './Search';
import About from './About';


function Home() {
  return (
    <div>
      <main className={styles.main}>
      <Search />
      </main>
      <About />
    </div>
  );
}

export default Home;
