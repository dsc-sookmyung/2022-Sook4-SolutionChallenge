import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
import { 
  Home, 
  Login, 
  Logout,
  SignupCafe,
  CafeDetail,
  MainCafe,
  MyPageCafe,
  CafeApply,
  Aboutus,
  Manage,
  Privacy,
  Terms,
  NotFound,
} from "./pages";
import {
  useReducer,
  createContext,
  useEffect
} from "react";
import { Footer, Header } from './components';

export const AuthContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    // userSeq : token이랑 같이 백에 넘기기
    case "login":
      return {
        token: action.token,
        email: action.email,
        userSeq: action.userSeq,
      };
    case "logout":
      return {
        token: null,
        email: null,
        userSeq: null,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, {
    token: null,
    email: null,
    userSeq: null,
  });

  useEffect(() => {
    // console.log(JSON.parse(localStorage.getItem("loggedInfo")));

    const initUserInfo = async () => {
        const loggedInfo = await JSON.parse(
            localStorage.getItem("loggedInfo")
        );
        // console.log("-------------새로 고침------------");
        // console.log(loggedInfo);

        if (loggedInfo) {
            const { token, email, userSeq } = loggedInfo;
            await dispatch({
                type: "login",
                token: token,
                email: email,
                userSeq: userSeq,
            });
        } else {
            await dispatch({
                type: "logout",
            });
        }
    };
    initUserInfo();
  }, [state.token]);

  return (
    <div className="App">
      <AuthContext.Provider value={{ state, dispatch }}>
        <Header />
        <div id="wrapper">
          <Routes>
            <Route path="/" exact={true} element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/signup/cafe' element={<SignupCafe />} />
            <Route path='/cafedetail/:postSeq' element={<CafeDetail />} />
            <Route path='/maincafe' element={<MainCafe />} />
            <Route path='/maincafe/apply/*' element={<CafeApply />} />
            <Route path='/mypagecafe' element={<MyPageCafe />} />
            <Route path='/aboutus' element={<Aboutus />} />
            <Route path='/donations/*' element={<Manage />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/terms' element={<Terms />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
