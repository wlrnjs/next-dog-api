import styles from "./page.module.css";
import Input from "@/app/_components/input";
import DogBox from "@/app/_components/dogBox";

export default function Home() {
  return (
    <>
      <div className={styles.box}>
        <span>Home,</span>
        <span>Find a pet,</span>
        <span>“Adoption changes lives—your love makes a difference.”</span>
        <span>“Give a homeless dog a chance for a new life.”</span>
        <span>“Bring hope and love to a rescued pup.”</span>
        <Input/>
      </div>
      <div className={styles.dogBox}>
        <div className={styles.dogBox1}>
          <DogBox/>
          <DogBox/>
          <DogBox/>
          <DogBox/>
          <DogBox/>
        </div>
        <div className={styles.dogBox2}>
          <DogBox/>
          <DogBox/>
          <DogBox/>
          <DogBox/>
          <DogBox/>
        </div>
      </div>

    </>
  );
}
