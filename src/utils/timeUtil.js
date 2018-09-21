const convertTimeStampToDate = function (timeStamp) {
  let date = new Date(timeStamp)
  return date
}

const convertDateToLocalString = function (date) {
  return date.toLocaleString()
}

export { convertTimeStampToDate, convertDateToLocalString }
