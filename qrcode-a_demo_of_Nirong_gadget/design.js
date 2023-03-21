module.exports = function(){

    const gadgetInfo = this;
    
    const $cartButton = NRD.renderGadgetCartButton(gadgetInfo["gadgetCartButtonIcon"], gadgetInfo);
    $cartButton.on("click", function(){
        NR.renderGadget(gadgetInfo);
    });
    
}
