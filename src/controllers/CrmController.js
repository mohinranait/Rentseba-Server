const Crm = require("../models/CrmModal");

/**
 * @api {post} /crm -> New Crm
*/
const addNewCrm = async (req, res,next) => {
    try {
        const body = req.body;
        const crm = await Crm.create({...body});

        return res.status(201).send({
            success: true,
            message: "Crm created",
            payload: crm,
        });
    } catch (error) {
        next(error)
    }
}
/**
 * @api {get} /crm/checked -> Unique data checked
*/
const checkedCrm = async (req, res,next) => {
    try {
        const {phone} = req.body;
        
        const normalizedPhone = phone.replace(/\D/g, ""); 

        const crm = await Crm.findOne({ phone: normalizedPhone });

        if(!crm){
            return res.status(200).send({
                success: true,
                message: "Unique",
                payload: {},
            });
        }else{
            return res.status(200).send({
                success: true,
                message: "Already exists ",
                payload: crm,
            });
        }

        
    } catch (error) {
        next(error)
    }
}

/**
 * @api {patch} /crm/:id -> Update Crm
*/
const updateCrmByID = async (req, res,next) => {
    try {
        const body = req.body;
        const id = req.params?.id;
        const crm = await Crm.findByIdAndUpdate(id, {...body},{runValidators:true, new:true});
        

        return res.status(200).send({
            success: true,
            message: "Crm updated",
            payload: crm,
        });
    } catch (error) {
        next(error)
    }
}

/**
 * @api {get} /crms -> Get all Crm
*/
const getAllCrm = async (req, res,next) => {
    try {
        
        const crms = await Crm.find({});

        return res.status(200).send({
            success: true,
            message: "Crms",
            payload: {crms},
        });
    } catch (error) {
        next(error)
    }
}

/**
 * @api {get} /crm/:id -> Find single Crm
*/
const getSingleCrmByID = async (req, res,next) => {
    try {
        const id = req.params?.id;
        const crm = await Crm.findById(id);
        if(!crm) return

        return res.status(200).send({
            success: true,
            message: "Crm",
            payload: crm,
        });
    } catch (error) {
        next(error)
    }
}


/**
 * @api {delete} /crm/:id -> Delete Crm
*/
const deleteCrmByID = async (req, res,next) => {
    try {

        const id = req.params?.id;
        const crm = await Crm.findByIdAndDelete(id);
        if(!crm) return

        return res.status(202).send({
            success: true,
            message: "Crm updated",
            payload: crm,
        });
    } catch (error) {
        next(error)
    }
}

module.exports  = {
    addNewCrm,
    getAllCrm,
    updateCrmByID,
    getSingleCrmByID,
    deleteCrmByID,
    checkedCrm
}