import {combineReducers} from 'redux'
import WhoAmI from './whoAmI'
import Patients from './patients'

const rootReducers = combineReducers({
    whoAmI: WhoAmI,
    patients: Patients,

})

export default rootReducers