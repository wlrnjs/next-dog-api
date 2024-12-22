import style from "./containerBox.module.css"

interface Props {
  title: string;
}

const ContainerBox = ({title}: Props) => {
  return (
    <div className={style.container}>
      <div className={style.box}>
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default ContainerBox;