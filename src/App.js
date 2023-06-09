// src/App.js
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {HomeComponent} from "./components/HomeComponent";
import {QueryClient, QueryClientProvider} from "react-query";
import {AddRestaurantComponent} from "./components/AddRestaurantComponent";
import {EditRestaurantComponent} from "./components/EditRestaurantComponent";

function App() {
    const client = new QueryClient()
    return (
        <div className="App">
            <h1 className="display-6 text-center">Restaurant CRUD Application</h1>
            <QueryClientProvider client={client}>
                <Router>
                    <Routes>
                        <Route path="/" Component={HomeComponent}/>
                        <Route path="/create" Component={AddRestaurantComponent}/>
                        <Route path="/edit/:id" Component={EditRestaurantComponent}/>
                    </Routes>
                </Router>
            </QueryClientProvider>
        </div>
    );
}

export default App;


// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;
