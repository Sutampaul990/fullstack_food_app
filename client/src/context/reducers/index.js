import {combineReducers} from "redux";
import userReducer from "./userReducers";
import alertReducers from "./alertReducers";
import productReducer from "./productReducers";

const myReducers = combineReducers({
    user : userReducer,
    alert : alertReducers,
    products : productReducer,
});

export default myReducers;