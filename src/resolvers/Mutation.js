const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

function addVehicleOwner(parent, args, context, info) { 
    const { name, email, phone } = args
    return context.db.mutation.createVehicleOwner({data:{name, email, phone }})
}

function addVehicleRequisition(parent, args, context, info) {
    const { vehicleType, estimatedNoOfHours, project, section, estimatedCost, requestStatus } = args
   
    const userId = getUserId(context)

    return context.db.mutation.createVehicleRequisition(        
        {
            data: {
                vehicleType, estimatedNoOfHours, project,
                section, estimatedCost, requestStatus,
                requestedBy: { connect: { id: userId } }
            },
            info
        }
    )
  }
async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10)
    const user = await context.db.mutation.createUser({
        data: {...args, password},
    })
    
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
    return {
        token,
        user,
    }
}

async function login(parent, args, context, info) {

    const user = await context.db.query.user({ where: { email: args.email } })

    if (!user) {
        throw new Error(`Could not find user with email: ${args.email}`)
    } 
    
    const valid = await bcrypt.compare(args.password, user.password)

    if (!valid) {
      throw new Error('Invalid password')
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
      token,
        user,
     
    }
} 

module.exports = {
    addVehicleOwner,
    addVehicleRequisition,
    signup,
    login,
}
