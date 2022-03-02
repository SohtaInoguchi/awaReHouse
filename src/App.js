import { Subscription } from "./components/Subscription";
import "./input.css";
import{useEffect,useState} from 'react'
import { Success } from "./components/Success";


function App() {
  let [message, setMessage] = useState('');
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState('');

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setSuccess(true);
      setMessage("Thank you for your purchase")
      setSessionId(query.get('session_id'));
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [sessionId]);



  return (
    <div>
      {success === true ? <Success message = {message}/> : <Subscription/>}
    </div>
  );
}

export default App;
