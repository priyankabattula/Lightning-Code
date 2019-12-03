({
    doInit : function(component, event, helper) { 
        
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
        
        var action = component.get("c.getAllFiles");
        action.setParams({oppId:opportunityId});
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state == "SUCCESS"){
                component.set("v.attchList", response.getReturnValue());
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
        
        var action1 = component.get("c.getUser");
        action1.setCallback(this, function(response){
            var state = response.getState();
            if(state == "SUCCESS"){
                component.set("v.user",response.getReturnValue());
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
        $A.enqueueAction(action1);
        var attchExceptPDF = component.get("v.recordId")
        var action2 = component.get("c.getAllFilesExceptPDF");
        action2.setParams({"exceptPdfOppId": attchExceptPDF});
        action2.setCallback(this, function(response){
            var state = response.getState();
            if(state == "SUCCESS"){
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
        $A.enqueueAction(action2);
    },
    doEdit : function(component, event, helper){
        
        var editRecordEvent = $A.get("e.force:editRecord"); 
        editRecordEvent.setParams({
                "recordId": event.target.id
            });
            editRecordEvent.fire();
    },
    doView : function(component, event, helper){
            // alert("in classic: " +recId);
            component.set("v.isEdit",false);
            window.open('/' + event.target.id);
    },
    doDelete : function(component, event, helper){
        if(confirm('Are you sure?'))
            helper.deleteFile(component, event);  
        var action= component.get("c.doInit");
        $A.enqueueAction(action);
        
    }
})
