import {Conversation, ConversationList, Form} from './components'
import {Home} from './pages'
import {useState} from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import { auth } from './To be categorised'

function App() {
  const [user, setUser] = useState(null)
  auth.setToken(user)
  console.log(auth.getToken())

  return (
    <Router>
        <header style={style.header}>
          <div style={style.logo}>CHAT</div>
            <div className="nav-menu" style={style.menu}>
              <Link style={style.link} to="/">Home</Link>
              <Link style={style.link} to="/conversations">Conversations</Link>
            </div>
        </header>

        <Routes>
          <Route path="/" element={<Home toRegister={false} setUser={setUser}/>}/>
          <Route path="/register" element={<Home toRegister={true} setUser={setUser}/>}/>
          <Route path="/conversations" element={<ConversationList currentUser={user}/>}/>
          <Route path="/conversations/:convoId" element={<Conversation currentUser={user}/>}/>
        </Routes>
    </Router>
  );
}

const style = {
    logo: {
        gridColumn: 1,
        display: 'inlineBlock',
        textAlign: 'center',
        fontSize: '250%',
        fontWeight: 'bold',
        marginRight: '50%',
        marginLeft: '5%',
    },

    header: {
        borderBottom: 'solid 1px',
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        padding: '0.3% 0% 0.3% 0%'
    },

    menu: {
        gridColumn: 2,
        display: 'flex',
        flexWrap: 'nowrap'
    },
      
    link: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1
    }
}

export default App;
