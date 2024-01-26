interface ResultElementsProps {
  title: string;
  label: string | JSX.Element;
  small?: boolean;
  medium?: boolean;
}

const ResultElements: React.FC<ResultElementsProps> = ({
  title,
  label,
  small,
  medium
}) => {
  return (
    <div className="flex flex-col text-text-color justify-center ">
      <p className={`${small ? "text-md" : "text-3xl"} m-0`}>{title}</p>
      <p className={`${small ? medium? "text-lg" : "text-4xl":'text-7xl'} text-this-yellow m-0`}>
        {label}
      </p>
    </div>
  );
};

export default ResultElements;
