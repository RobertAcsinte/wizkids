import style from "./CenterContainer.module.css";

function CenterContainer({children}) {
  return (
    <div className={style.container}>
        {children}
    </div>
  );
}

export default CenterContainer;