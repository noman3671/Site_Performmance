import { CreateAccountForm } from "components/Forms/CreateAccountForm";
import { useLocation } from "react-router-dom-middleware";

const Signup = () => {
  const location = useLocation();
  const data = location.state;

  return (
    <div className="b-page flex items-center align-middle">
      <CreateAccountForm {...data}></CreateAccountForm>
    </div>
  );
};

export default Signup