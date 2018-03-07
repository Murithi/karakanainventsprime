// { where: { mutation_in: ['CREATED'] } }
const newVehicle = {
    subscribe: (parent, args, context, info) => { 
        return context.db.subscription.vehicle(
            {},
            info,
        )
    },
}

const newVehicleOwner = {
    subscribe: (parent, args, context, info) => { 
        return context.db.subscription.vehicleOwner(
            {},
            info,
        )
    },
}
const newVehicleRequisition = {
    subscribe: (parent, args, context, info) => { 
        return context.db.subscription.vehicleRequisition(
            {},
            info,
        )
    },
}

module.exports = {
    newVehicle,
    newVehicleOwner,
    newVehicleRequisition,
}