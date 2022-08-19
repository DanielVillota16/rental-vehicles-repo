import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const UserSettings = () => {

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    navigate('/homepage');
  }

  return (
    <div style={{margin:50}}>
      <Button onClick={()=> logOut()} type='danger'> Log Out</Button>
    </div>
  );
}

export default UserSettings;