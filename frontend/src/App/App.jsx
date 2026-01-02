import { useState } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../state/authAtom";
import AuthPage from "../pages/AuthPage";
import TodoPage from "../pages/TodoPage";

function App() {
  const auth = useRecoilValue(authState);
  return <>{auth.isAuthenticated ? <TodoPage /> : <AuthPage />}</>;
}

export default App;
