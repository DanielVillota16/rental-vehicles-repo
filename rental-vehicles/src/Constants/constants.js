export const TYPES = {
  Motorcycle: 0,
  Car: 1,
  Truck: 2,
  Bike: 3,
  Other: 4
}

export const VehicleTypes = [
  "Motorcycle",
  "Car",
  "Truck",
  "Bike",
  "Other"
]

export const images = [
  {
    name: "Motorcycle",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Motorcycle_icon.svg/600px-Motorcycle_icon.svg.png"
  },
  {
    name: "Car",
    url: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Car_icon_alone.png"
  },
  {
    name: "Truck",
    url: "https://i.pinimg.com/originals/e0/8b/14/e08b1415885d4d2ddd7fd3f75967da29.png"
  },
  {
    name: "Bike",
    url: "https://upload.wikimedia.org/wikipedia/commons/0/04/Bike_icon.png"
  },
  {
    name: "Other",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/1200px-Icon-round-Question_mark.svg.png"
  }

]

export const RequestsType = {
  pending:0,
  ongoing:1
}

export const RequestStatusIndex = {
  Accepted:0,
  Rejected:1,
  Pending:2,
  Finished:3
}

export const RequestStatus = [
  "Accepted",
  "Rejected",
  "Pending",
  "Finished"
]

export const VehicleStatus = [
  "Available",
  "Unavailable"
]

export const apis = {
  admin: `${process.env.REACT_APP_API}/admin`,
  client: `${process.env.REACT_APP_API}/client`,
  vehicle: `${process.env.REACT_APP_API}/vehicle`,
  request: `${process.env.REACT_APP_API}/request`
}

export const ROLES = {
  ADMIN: 0,
  CLIENT: 1
}

export const roles = [
  {
    id: ROLES.ADMIN,
    name: 'admin'
  },
  {
    id: ROLES.CLIENT,
    name: 'client'
  }
]
