module.exports = function(){
    // console.log(this);
    NR(this).on("click", function($gadget, instanceInfo){
        // console.log($gadget, instanceInfo)
        $gadget.addClass('animate__animated animate__flipOutX').delay(500).queue(function() {
            $(this).removeClass('animate__animated animate__flipOutX').dequeue();
        })

    })
}