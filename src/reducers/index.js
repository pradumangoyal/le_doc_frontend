import {combineReducers} from 'redux'
import WhoAmI from './whoAmI'
import Patients from './patients'
import AddPatient from './addPatient'
import Analysis from './analysis'
import PastRecord from './pastRecord'
import ActivePatient from './activePatient'
import AnalysisStep from './analysisStep'
import Image from './image'
import ImageList from './imageList'
const rootReducers = combineReducers({
    whoAmI: WhoAmI,
    patients: Patients,
    addPatient: AddPatient,
    analysis: Analysis,
    analysisStep: AnalysisStep,
    activePatient: ActivePatient,
    image: Image,
    pastRecord: PastRecord,
    imageList: ImageList
})

export default rootReducers