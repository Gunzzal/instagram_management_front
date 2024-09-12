import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import MainPage from "./component/pages/MainPage";
import SelectMenuPage from "./component/pages/SelectMenuPage";

function Header() {
  const navigate = useNavigate();

  const loggedInUserName = sessionStorage.getItem("userName");
  const loggedInUserId = sessionStorage.getItem("userId");

  const moveHandler = () => {
    if (loggedInUserId) {
      // console.log(loggedInUserId);
      navigate(`/select-menu/${loggedInUserId}`);
    } else {
      navigate("/");
    }
  };

  const deleteSession = () => {
    sessionStorage.clear(); // 모든 세션 항목 삭제
    navigate("/");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2 onClick={moveHandler}>Instagram Management</h2>
        {loggedInUserId && (
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <div className="mt-3 ">
              사용자 : &nbsp;
              {loggedInUserName}
            </div>

            <button
              className="btn btn-danger me-md-2"
              type="button"
              onClick={deleteSession}
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/select-menu/" element={<SelectMenuPage />}></Route>
        <Route path="/select-menu/:id" element={<SelectMenuPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
