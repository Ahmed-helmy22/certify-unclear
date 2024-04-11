 import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'

const FivtshStage = ({inputData, setInputData ,handleInputChange}) => {
  return (
    <>
    <div className="input-box">
      <div className="input-field">
        <input
          type="email"
          placeholder="email"
          required
          name="email"
          onChange={handleInputChange}
        />
        <MdEmail className="icon" />
      </div>
      <div className="input-field">
        <input
          type="email"
          placeholder="confrim email"
          name="confirmEmail"
          required
          onChange={handleInputChange}
        />
        <MdEmail className="icon" />
      </div>
    </div>

    <div className="input-box">
      <div className="input-field">
        <input
          type="password"
          placeholder="password"
          required
          name="password"
          onChange={handleInputChange}
        />
        <RiLockPasswordFill className="icon" />
      </div>
      <div className="input-field">
        <input
          type="password"
          placeholder="confirm password"
          required
          name="confirmPassword"
          onChange={handleInputChange}
        />
        <RiLockPasswordFill className="icon" />
      </div>
    </div>
  </>
  )
}

export default FivtshStage