import { useState } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Login from './Login';
import Protected from './Protected';

const App = () => {
    const [token, setToken] = useState(null);

    return (
        <BrowserRouter>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link to='/protected'>Protected</Link>
                        </li>
                    </ul>
                </nav>

                <br />

                <Route path="/" exact render={() => <h2>Home</h2>} />
                <Route path="/login" render={() => <Login setToken={setToken} />} />
                <Route path="/protected" render={() => <Protected token={token} />} />

            </div>
        </BrowserRouter>
    )
}

export default App;