// function feed(parent, args, context, info) {
//     const { filter, first, skip } = args // destructure input arguments
//     const where = filter
//       ? { OR: [{ registrationNumber_contains: filter }, { logBookNumber_contains: filter }] }
//       : {}
  
//     return context.db.query.vehicles({ first, skip, where }, info)
// }
  
function vehicleOwnerFeed(parent, args, context, info) {
    const { filter, first, skip } = args //destructure input arguments
    const where = filter
        ? { OR: [{ name_contains: filter }, { email_contains: filter }, {id_contains:filter}] }
        : {}
    return context.db.query.vehicleOwners({first,skip, where},info)
}  
 
function vehicleRequisitionFeed(parent, args, context, info) {
    const { filter, first, skip } = args //destructure input arguments
    const where = filter
        ? { OR: [{ project_contains: filter }, { section_contains: filter }, {id_contains:filter}] }
        : {}
    return context.db.query.vehicleRequisitions({first,skip, where},info)
}
  
module.exports = {
 
    vehicleOwnerFeed,
    vehicleRequisitionFeed,
}  
  