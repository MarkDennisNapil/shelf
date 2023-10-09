import Login from "../components/login/login";

function promptRegistrationStatus() {
  const token = localStorage.getItem('token');
  if (token === null) {
    return <Login />;
  }
}

export default promptRegistrationStatus;
