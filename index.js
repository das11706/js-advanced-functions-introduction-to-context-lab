// Your code here
function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  }
}


function createEmployeeRecords(array) {
  return array.map(function(record) {
    return createEmployeeRecord(record)
  })
}


function createTimeInEvent(employeeRecord, dateStamp) {
  let [date, hour] = dateStamp.split(' ')

  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  })
return employeeRecord
}


function createTimeOutEvent(employeeRecord, dateStamp) {
  let [date, hour] = dateStamp.split(' ')

  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  })
  return employeeRecord
}


function hoursWorkedOnDate(employeeRecord, date) {
  let inEvent = employeeRecord.timeInEvents.find(function(event){
    return event.date === date
  })

  let outEvent = employeeRecord.timeOutEvents.find(function(event){
    return event.date === date
  })

  return (outEvent.hour - inEvent.hour) / 100
}


function wagesEarnedOnDate(employeeRecord, date) {
  let pay = hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
  return pay
}


function allWagesFor(employeeRecord) {
  let datesWorked = employeeRecord.timeInEvents.map(function(event){
    return event.date
  })

  let payAllDates = datesWorked.reduce(function(memo, d){
    return memo + wagesEarnedOnDate(employeeRecord, d)
  }, 0)
   
  return payAllDates
}


function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(function(record){
    return record.firstName === firstName
  })
}


function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce(function(memo, record){
    return memo + allWagesFor(record)
  }, 0)
}