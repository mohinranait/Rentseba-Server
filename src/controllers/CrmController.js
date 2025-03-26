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
        let { page = 1, limit = 10, search, category, clientType, district, sortBy = 'createdAt', order = 'desc' } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);
        order = order === 'asc' ? 1 : -1;

        let filter = {};

        // Apply filtering based on query parameters
        if (category) filter.category = category;
        if (clientType) filter.clientType = clientType;
        if (district) filter.district = district;

        // Apply search on 'name' and 'phone'
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } }
            ];
        }

        // Fetch data with pagination and sorting
        const crms = await Crm.find(filter)
            .sort({ [sortBy]: order })
            .skip((page - 1) * limit)
            .limit(limit);

        // Get total count for pagination metadata
        const total = await Crm.countDocuments(filter);

        return res.status(200).send({
            success: true,
            message: "Crms retrieved successfully",
            payload: {
                crms,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit)
                }
            }
        });

    } catch (error) {
        next(error);
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