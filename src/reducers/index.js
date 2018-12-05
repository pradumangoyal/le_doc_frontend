import {combineReducers} from 'redux'
import WhoAmI from './whoAmI'
import Patients from './patients'
import AddPatient from './addPatient'
import Analysis from './analysis'
import ActivePatient from './activePatient'
import AnalysisStep from './analysisStep'
import Image from './image'
const rootReducers = combineReducers({
    whoAmI: WhoAmI,
    patients: Patients,
    addPatient: AddPatient,
    analysis: Analysis,
    analysisStep: AnalysisStep,
    activePatient: ActivePatient,
    image: Image,

})

export default rootReducers