import { useSelector } from "react-redux";
import "./App.css";
import Account from "./Components/Accounts/Account";
import CreateAccount from "./Components/Accounts/CreateAccount";
import CreateCustomer from "./Components/Customers/CreateCustomer";
import CustomerAcc from "./Components/Customers/CustomerAcc";

function App() {
  const fullname = useSelector((state) => state.customer.Fullname);
  return (
    <>
      {fullname === "" ? (
        <CreateCustomer />
      ) : (
        <>
          <h1>Customer Account 🤑</h1>
          <CustomerAcc />
          <Account />
          <CreateAccount />
        </>
      )}
    </>
  );
}

export default App;
