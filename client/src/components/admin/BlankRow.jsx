import { Name , TableRow  , Title , Action} from '../../assets/wrappers/TableWrapper'

 import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Link } from "react-router-dom";
day.extend(advancedFormat);



const BlankRow = () => {
  return (
    <TableRow role="row" style={{ '--num-columns': 6 }}>
    <Name>
       asdsad
    </Name>
    <Title>ssss</Title>

    <Title>dddd</Title>
    <Name>
      dddd
    </Name>

    <Action>
      <Link to={`/dashboard/academy/edit-awarde-badge/dddd/dddd`} className="btn">
        edit
      </Link>
      <button className="btn ">delete</button>
    </Action>
  </TableRow>
  )
}

export default BlankRow