import { useSelector } from 'react-redux';
import Signup from './Signup';
import NewCompanyForm from './NewCompanyForm';

export default function Registration() {
  const registered = useSelector(state => state.register.value);

  const renderForm = registered ? <Signup /> : <NewCompanyForm />;
  
  return (
    <div>
      {renderForm}
    </div>
  )
}
