// function to handle delete operation with user's permission
function deleteJob(id){
    const isConfirm = confirm("Click 'OK' to delete this Job.")
    if(isConfirm){
        fetch(`/jobs/${id}`,{
            method : 'DELETE'
        })
        .then(res => {
            if(res.ok){
                window.location.href = "/jobs";
            }else{
                console.log("Error deleting Jobs");
            }
        })
    }
}