var fs = require('fs');

var setPixel = function(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}

exports.createNewPainting = function(){
    var Canvas = require('canvas')
  , Image = Canvas.Image
  , canvas = new Canvas(800,600)
  , ctx = canvas.getContext('2d');


    // read the width and height of the canvas
    width = canvas.width;
    height = canvas.height;

    // create a new pixel array
    imageData = ctx.createImageData(width, height);

    // draw random dots
    for (i = 0; i < width*height; i++) {
        x = Math.random() * width | 0; // |0 to truncate to Int32
        y = Math.random() * height | 0;
        r = Math.random() * 256 | 0;
        g = Math.random() * 256 | 0;
        b = Math.random() * 256 | 0;
        setPixel(imageData, x, y, r, g, b, 255); // 255 opaque
    }

    // copy the image data back onto the canvas
    ctx.putImageData(imageData, 0, 0); // at coords 0,0

    fs.writeFile('./assets/painting.txt', canvas.toDataURL(), function(err){
    if(err){
      console.log(err);
    } else {
      console.log("Painting updated");
    }

});


}


exports.makeAlteration = function(){
    var Canvas = require('canvas')
  , Image = Canvas.Image
  , canvas = new Canvas(800,600)
  , ctx = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;
    tenpercent = (width*height)/10
    // create a new pixel array
    //imageData = ctx.createImageData(width, height);
    //ctx.putImageData(imageData, 0, 0);
    fs.readFile('./assets/painting.txt', function(err, data){
        if (err) throw err;
        var img = new Image();
        img.src = data.toString();
        ctx.drawImage(img,0,0);

        imageData = ctx.getImageData(0,0,width, height);

    // draw random dots
    for (i = 0; i < tenpercent; i++) {
        x = Math.random() * width | 0; // |0 to truncate to Int32
        y = Math.random() * height | 0;
        r = Math.random() * 256 | 0;
        g = Math.random() * 256 | 0;
        b = Math.random() * 256 | 0;
        setPixel(imageData, x, y, r, g, b, 255); // 255 opaque
    }

    // copy the image data back onto the canvas
    ctx.putImageData(imageData, 0, 0); // at coords 0,0
        fs.writeFile('./assets/altered_painting.txt', canvas.toDataURL(), function(err){
            if(err){
                console.log(err);
            } else {
                console.log("Altered painting created");
            }
        });
    });
}


exports.overwritePainting = function(){
    fs.renameSync('./assets/altered_painting.txt', './assets/painting.txt')
    console.log("Original painting overwritten")
}