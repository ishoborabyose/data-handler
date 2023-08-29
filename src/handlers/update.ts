import prisma from "../db"

export const getOneUpdate = async (req,res) =>{

    const update = await prisma.update.findUnique({
        where :{
            id: req.params.id,
        }
    })
    res.json({data: update})
}

export const getUpdates = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            Update: true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.Update]
    }, [])
    res.json({data: updates})
}

export const createUpdate = async (req, res) => {

    const product  =  await prisma.product.findUnique({
        where: {
            id: req.body.id
        }
    })
    if(!product){
        //Does not belong to the user
        return res.json({message:"Nope"})
    }

    const update = await prisma.update.create({
        data: req.body,
    })
    res.json({data: update})
}
export const updateUpdate = async (req, res) => {

    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include:{
            Update: true
        }
    })
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.Update]
    },[])

    const match = updates.find((update => update.id === req.params.id))

    if(!match){
        //Handle this
        res.json({ message: "Nope" })
    }

    const updatedUpdate = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })
    res.json({ data: updatedUpdate })
}

export const deleteUpdate = async (req,res) => {

}