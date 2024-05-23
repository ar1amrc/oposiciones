import {
  createContext,
  useEffect,
  useReducer,
} from "react";
import { getUser, updateNameUser, updateNoticifacionesUser, updateRandomUser, updateStatsUser, updateVibracionesUser } from "../database/db";
async function fetchUsers() {
  return await getUser(1);
}

const initialState = {
  data: false,
};

const loadUser = async () => {
  try {
    const user = await fetchUsers();
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const UserContext = createContext();

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_USER": {
      return payload;
    }
    case "UPDATE_STATS": {
      const correctas = payload ? state.correctas + 1 : state.correctas;
      const fallidas = payload ? state.fallidas : state.fallidas + 1;
      const porciento = (correctas * 100) / (correctas + fallidas);

      updateStatsUser(correctas, fallidas, porciento);
      
      const newState = {
        ...state,
        correctas: correctas,
        fallidas: fallidas,
        porciento: porciento,
      };

      return newState;
    }
    case "RESET_STATS": {
      updateStatsUser(0, 0, 0);
      const newState = { ...state, correctas: 0, fallidas: 0, porciento: 0 };
      return newState;
    }
    case "UPDATE_RANDOM": {
      const newState = { ...state, random: payload };
      updateRandomUser(payload);
      return newState;
    }
    case "UPDATE_NOTIFY": {
      const newState = { ...state, notificaciones: payload };
      updateNoticifacionesUser(payload);
      return newState;
    }
    case "UPDATE_VIBRATE": {
      const newState = { ...state, vibraciones: payload };
      updateVibracionesUser(payload);
      return newState;
    }
    case "UPDATE_NAME": {
      updateNameUser(payload);
      const newState = { ...state, nombre: payload };
      return newState;
    }
  }
  return state;
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateStatsUser = (isCorrect) =>
    dispatch({ type: "UPDATE_STATS", payload: isCorrect });
  const resetStatsUser = () => dispatch({ type: "RESET_STATS" });
  const updateNameUser = (name) =>
    dispatch({ type: "UPDATE_NAME", payload: name });
  const updateRandomUser = (random) =>
    dispatch({ type: "UPDATE_RANDOM", payload: random });
  const updateNotificacionesUser = (notify) =>
    dispatch({ type: "UPDATE_NOTIFY", payload: notify });
  const updateVibracionesUser = (vibrate) =>
    dispatch({ type: "UPDATE_VIBRATE", payload: vibrate });

  useEffect(() => {
    async function fetchData() {
      const profileData = await loadUser();
      dispatch({ type: "GET_USER", payload: profileData });
    }
    fetchData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        state,
        updateStatsUser,
        resetStatsUser,
        updateNameUser,
        updateRandomUser,
        updateNotificacionesUser,
        updateVibracionesUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
