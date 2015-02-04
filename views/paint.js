function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}

function createNewPainting(){
    element = document.getElementById("canvas1");
    c = element.getContext("2d");

    // read the width and height of the canvas
    width = element.width;
    height = element.height;

    // create a new pixel array
    imageData = c.createImageData(width, height);

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
    c.putImageData(imageData, 0, 0); // at coords 0,0
}

function alterPainting(){

}