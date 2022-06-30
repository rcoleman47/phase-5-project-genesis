import { useSelector} from 'react-redux'

export default function Home() {

  const user = useSelector( state => state.user.value)

  const { name, address, city, state, phone_number, logo } = user.company
  return (
    <div style={{background: logo}}>{name}</div>
  )
}
