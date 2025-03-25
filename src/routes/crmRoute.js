const { addNewCrm, getSingleCrmByID, getAllCrm, updateCrmByID, deleteCrmByID, checkedCrm } = require("../controllers/CrmController");

const crmRouter = require("express").Router();

crmRouter.post(`/crm`, addNewCrm )
crmRouter.get(`/crm/:id`, getSingleCrmByID )
crmRouter.get(`/crms`, getAllCrm )
crmRouter.patch(`/crm/:id`, updateCrmByID )
crmRouter.delete(`/crm/:id`, deleteCrmByID )
crmRouter.post(`/crm/checked`, checkedCrm )

module.exports = crmRouter;