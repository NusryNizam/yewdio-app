import "./Loader.scss";

type LoaderProps = {
  customClassName?: string;
};
const Loader = ({ customClassName = "" }: LoaderProps) => {
  return (
    <div className={`loader-container ${customClassName}`}>
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
