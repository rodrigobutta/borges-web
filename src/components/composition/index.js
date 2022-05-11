export default function Composition({ total, statuses }) {
  return (
    <div className={'composition'}>
      <div className={'statistic active'}>
        <h3>{12}</h3>
        <p>{'Total'}</p>
      </div>

      {statuses.map(x => (
        <div className={'statistic'}>
          <h3>{x.statusCount}</h3>
          <p>{x.name}</p>
        </div>
      ))}
    </div>
  );
}
