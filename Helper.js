({
    deleteFile : function(component, event) {
        var opportunityId = component.get("v.recordId");
        if(opportunityId != undefined){
            opportunityId = component.get("v.recordId"); 
            component.set("v.opportunityId",opportunityId);
            component.set("v.isLightning", true);
        }else{
            var recId = window.location.href.split("recId=")[1].split("&")[0];
            opportunityId = recId;
            component.set("v.opportunityId",recId); 
        }
        
        var action = component.get("c.deletedFileById");
        action.setParams({docId:event.target.id, oppId:opportunityId});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state == "SUCCESS"){
                component.set("v.attchList",response.getReturnValue());
                component.set("v.attachListExceptPDF",response.getReturnValue());
            }else{
                var error = response.getError();
                if(error){
                    if(error[0] && error[0].message){
                        console.log("Error Message :" +error[0].message);
                    }else{
                        console.log("unknown error");
                    }
                }
            }
        });
        $A.enqueueAction(action);
    }  
})
