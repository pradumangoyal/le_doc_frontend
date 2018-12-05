export function urlWhoAmI() {
    return `/who_am_i/`
}

export function urlPatients () {
    return `/patients/patient_list/`
}

export function urlUsernameAvailaible(word) {
    return `/patients/username_available/?username=${word}`
}

export function urlPatientDetails(x) {
    return `/patients/patient_list/${x}`
}

export function urlPostReports(active) {
    return `/${active}/list/`
}

export function urlOperate(active, id) {
    return `/${active}/operate/?id=${id}`
}