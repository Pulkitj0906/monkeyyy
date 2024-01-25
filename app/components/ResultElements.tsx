interface ResultElementsProps {
    title: string,
    label: string,
    small?: boolean
}

const ResultElements:React.FC<ResultElementsProps> = ({
    title,
    label,
    small
}) => {
  return (
    <div className="flex flex-col text-text-color justify-center items-center">
        <p className={`${small ? 'text-md' : 'text-3xl'} m-0`}>{title}</p>
        <p className={`${small ? 'text-lg' : 'text-6xl'} text-this-yellow m-0`}>{label}</p>
    </div>
  )
}

export default ResultElements