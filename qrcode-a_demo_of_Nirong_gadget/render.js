module.exports = function($gadget, $body, instanceInfo, cfg){
    const $qrcode = $(`<div class="d-inline-block"></div>`);
    const width = cfg.width || 250;
    $qrcode.width(width);
    $qrcode.height(width);
    if(cfg.align){
        $body.css("text-align", cfg.align)
    }
    $qrcode.qrcode({
        render: "canvas",
        text: cfg.text || "Text",
        width : width,
        height : width,
        background : cfg.background || "#ffffff",       //二维码的后景色
        foreground : cfg.foreground || "#000000",        //二维码的前景色
        // src: './logo.png'    // todo          //二维码中间的图片
    });
    $body.append($qrcode);
}