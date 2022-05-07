import dateFormat, { masks } from "dateformat";

const getFormatedDateForList = (isoString) => {
    return dateFormat(isoString, "mmm d, yyyy");
}

const getFormatedDateForDetail = (isoString) => {
    return dateFormat(isoString, "mmm d, yyyy, h:MM TT");
}

export {
    getFormatedDateForList,
    getFormatedDateForDetail
}