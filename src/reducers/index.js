import {combineReducers} from 'redux'
import WhoAmI from './whoAmI'
import Patients from './patients'
import AddPatient from './addPatient'
const rootReducers = combineReducers({
    whoAmI: WhoAmI,
    patients: Patients,
    addPatient: AddPatient

})

export default rootReducers