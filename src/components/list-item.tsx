const ListItem = ({ data }: any) => {
  const { links, flight_number, name, details, date_local } = data

  const year = new Date(date_local).getFullYear()

  return (
    <li className="list-item">
      <img
        src={links.patch.small ?? links.patch.large}
        alt={`${flight_number} : ${name} image`}
      />
      <div className="list-item-details">
        <h3>
          {flight_number}: {name} <span>({year})</span>
        </h3>
        {details && <p>Details: {details}</p>}
      </div>
    </li>
  )
}

export default ListItem
