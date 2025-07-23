const Row = ({name, time}: {name: string, time: string}) => {
  return (
    <div className="row">
      <p className="name">{name}</p>
      <p className="time">{time}</p>
    </div>
  );
}

export default Row;
