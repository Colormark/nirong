
module.exports = function (){
  const $btn = NRD.renderPluginButton(this.icon, this);
  $btn.on("click", function(){
    const $window = $(`
        <div class="modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Tada</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body p-5">
                <p>点击按钮“好”, 所有组件的选中状态将会被取消.</p>
              </div>
              <div class="modal-footer fy-between-bar">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                <button type="button" class="f-submit btn btn-primary">好</button>
              </div>
            </div>
          </div>
        </div>
    `);
    $window.modal("show");
    $window.find(".f-submit").on("click", function(){
      NRD.clearSelect();
      $window.modal("hide");
    });

  });
  
}