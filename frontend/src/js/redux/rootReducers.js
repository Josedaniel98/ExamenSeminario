import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import producto from './modules/producto/producto';


export default combineReducers({
    form: formReducer,
    routing,
    producto,
});
