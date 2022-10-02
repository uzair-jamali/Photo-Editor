//Variables to manipulate image
var brightness = 100;
var saturation = 100;
var grayscale = 0;
var inversion = 0;
var sepia_img = 0;
var blur_img = 0;
var angle = 0;
var rotateX = 0;
var rotateY = 0;

//Choosing image on button click
document.querySelector('.choose-img').addEventListener('click',function(event){
    event.preventDefault();
    document.getElementById('file-input').click();
})

//Loading image over preview image
document.querySelector('#file-input').addEventListener('change',function(){
    var reader = new FileReader(); 
    reader.addEventListener('load',function(){
        var image = reader.result;
        document.querySelector('img').setAttribute('src',image);
    })
    reader.readAsDataURL(this.files[0]);
})

//Rotate image to right
document.querySelector('#right').addEventListener('click',function (event){
    event.preventDefault();
    angle = (angle+90)%360;
    document.querySelector('img').style.transform = 'rotate('+angle+'deg) rotateX('+rotateX+'deg) rotateY('+rotateY+'deg)';
})

//Rotate image to left
document.querySelector('#left').addEventListener('click',function(event){
    event.preventDefault();
    angle = (angle-90)%360;
    document.querySelector('img').style.transform = 'rotate('+angle+'deg) rotateX('+rotateX+'deg) rotateY('+rotateY+'deg)';
})

//Flip Image Vertically
document.querySelector('#vertical').addEventListener('click',function (event){
    event.preventDefault();
    rotateY = (rotateY+180)%360;
    document.querySelector('img').style.transform = 'rotate('+angle+'deg) rotateX('+rotateX+'deg) rotateY('+rotateY+'deg)';
})

//Flip Image Horizontally
document.querySelector('#horizontal').addEventListener('click',function (event){
    event.preventDefault();
    rotateX = (rotateX+180)%360;
    document.querySelector('img').style.transform = 'rotate('+angle+'deg) rotateX('+rotateX+'deg) rotateY('+rotateY+'deg)';
})

//Reset the image back to original form
document.querySelector('.reset-filter').addEventListener('click',function(event){
    event.preventDefault();
    var image = document.querySelector('img').style;
    var attr = document.getElementById('filter-name').innerHTML;
    var f_value = document.getElementById('filter-value');
    var slider = document.getElementById('set-filter');
    image.transform = '';
    image.filter = '';
    brightness = 100;
    saturation = 100;
    inversion = 0;
    grayscale = 0;
    sepia_img = 0;
    rotateX = 0;
    rotateY = 0;
    angle = 0;
    blur_img = 0;
    if(attr == 'Brightness'){
        f_value.innerHTML = brightness+'%';
        slider.value = brightness;
    }
    else if(attr == 'Saturation'){
        f_value.innerHTML = saturation+'%';
        slider.value = saturation;
    }
    else if(attr == 'Inversion'){
        f_value.innerHTML = inversion+'%';
        slider.value = inversion;
    }
    else if(attr == 'Grayscale'){
        f_value.innerHTML = grayscale+'%';
        slider.value = grayscale;
    }
    document.getElementById('grayscale-value').innerHTML = grayscale+'%';
    document.getElementById('set-grayscale').value = grayscale;

    document.getElementById('blur-value').innerHTML = blur_img+'px';
    document.getElementById('set-blur').value = blur_img;

    document.getElementById('rotate-value').innerHTML = angle+'°';
    document.getElementById('set-rotate').value = angle;

    document.getElementById('sepia-value').innerHTML = sepia_img+'%';
    document.getElementById('set-sepia').value = sepia_img;
})

//Get buttons into focus
function filterButtons(event){
    var siblings = event.parentNode.firstChild;
    while(siblings){
        if(siblings.nodeType === Node.ELEMENT_NODE){
            siblings.style.backgroundColor = 'white';
            siblings.style.color = 'black';
        }
        siblings = siblings.nextElementSibling || siblings.nextSibling;
    }
    event.style.backgroundColor = '#5372F0';
    event.style.color = 'white';
    setSlider(event);
}

//Changing sliders functionality based on selected buttons
function setSlider(event){
    var slider = document.getElementById('set-filter');
    var f_value = document.getElementById('filter-value');
    document.getElementById('filter-name').innerHTML = event.innerHTML;
    if(event.innerHTML == 'Brightness'||event.innerHTML == 'Saturation'){
        slider.setAttribute('max','200');
        if(event.innerHTML == 'Brightness'){
            f_value.innerHTML = brightness+'%';
            slider.value = brightness;
        }
        else{
            f_value.innerHTML = saturation+'%';
            slider.value = saturation;
        }
    }
    else{
        slider.setAttribute('max','100');
        if(event.innerHTML == 'Grayscale'){
            f_value.innerHTML = grayscale+'%';
            slider.value = grayscale;
        }
        else if(event.innerHTML == 'Inversion'){
            f_value.innerHTML = inversion+'%';
            slider.value = inversion;
        }
    }
}

//Default Brightness Selected
document.addEventListener('DOMContentLoaded',function(event){
    document.getElementById('second-panel').style.display = 'none';
    filterButtons(document.getElementById('brightness'))
})

//Function Call by clicking brightness
document.querySelector('#brightness').addEventListener('click',function(event){
    event.preventDefault();
    filterButtons(this);
})

//Function Call by clicking saturation
document.querySelector('#saturation').addEventListener('click',function(event){
    event.preventDefault();
    filterButtons(this);
})

//Function Call by clicking grayscale
document.querySelector('#grayscale').addEventListener('click',function(event){
    event.preventDefault();
    filterButtons(this);
})

//Function Call by clicking inversion
document.querySelector('#inversion').addEventListener('click',function(event){
    event.preventDefault();
    filterButtons(this);
})

//Setting up string of filters
function getFilterString(){
    var str = '';
    str += 'brightness('+brightness+'%) ';
    str += 'saturate('+saturation+'%) ';
    str += 'invert('+inversion+'%) ';
    str += 'grayscale('+grayscale+'%) ';
    str += 'blur('+blur_img+'px) ';
    str += 'sepia('+sepia_img+'%)';
    return str;
}

//Change filter intensity on slider change
document.querySelector('#set-filter').addEventListener('input',function(event){
    document.getElementById('filter-value').innerHTML = this.value+'%';
    var attr = document.getElementById('filter-name').innerHTML;
    if(attr == 'Brightness'){
        brightness = this.value;
    }
    else if(attr == 'Saturation'){
        saturation = this.value;
    }
    else if(attr == 'Inversion'){
        inversion = this.value;
    }
    else if(attr == 'Grayscale'){
        grayscale = this.value;
    }
    var filters = getFilterString();
    document.querySelector('img').style.filter = filters;
})

//Saves image by clicking on save image
document.querySelector('.save-img').addEventListener('click',function(event){
    event.preventDefault();
    var image = document.querySelector('img');
    var canva = document.createElement('canvas');
    canva.setAttribute('width',image.naturalWidth);
    canva.setAttribute('height',image.naturalHeight);
    document.body.appendChild(canva);
    var filters = getFilterString();
    var canvas = document.querySelector('canvas');
    var ctx = canva.getContext('2d');
    ctx.filter = filters;
    ctx.transform = 'rotate('+angle+'deg) rotateX('+rotateX+'deg) rotateY('+rotateY+'deg)';
    ctx.translate(canvas.width/2,canvas.height/2);
    ctx.scale(rotateY==180?-1:1,rotateX==180?-1:1)
    ctx.rotate(angle * Math.PI / 180);
    ctx.drawImage(image,-canvas.width/2,-canvas.height/2, canvas.width, canvas.height);


    var a = document.createElement('a');
    a.href = canvas.toDataURL('image/jpeg');
    a.download = "output.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    document.body.removeChild(canva);

})

//Gives more options for part B of assignment
document.querySelector('.more').addEventListener('click',function(event){
    event.preventDefault();
    var first = document.getElementById('first-panel');
    var second = document.getElementById('second-panel');
    if (this.innerHTML == 'More'){
        document.getElementById('grayscale-value').innerHTML = grayscale+'%';
        document.getElementById('set-grayscale').value = grayscale;
        document.getElementById('rotate-value').innerHTML = angle+'°';
        document.getElementById('set-rotate').value = angle;     
        this.style.padding = '11px 48.7px';
        first.style.display = 'none';
        second.style.display = 'block';
        this.innerHTML = 'Back';
    }
    else{
        var attr = document.getElementById('filter-name').innerHTML;
        if(attr == 'Grayscale'){
            document.getElementById('filter-value').innerHTML = grayscale+'%';
            document.getElementById('set-filter').value = grayscale;
        }
        this.style.padding = '11px 48px';
        first.style.display = 'block';
        second.style.display = 'none';
        this.innerHTML = 'More';
    }
})

//Sets grayscale in part B
document.querySelector('#set-grayscale').addEventListener('input',function(){
    grayscale = this.value;
    document.getElementById('grayscale-value').innerHTML = this.value+'%';
    document.querySelector('img').style.filter = getFilterString();
})

//Sets blur in part B
document.querySelector('#set-blur').addEventListener('input',function(){
    blur_img = this.value;
    document.getElementById('blur-value').innerHTML = this.value+'px';
    document.querySelector('img').style.filter = getFilterString();
})

//Sets sepia in part B
document.querySelector('#set-sepia').addEventListener('input',function(){
    sepia_img = this.value;
    document.getElementById('sepia-value').innerHTML = this.value+'%';
    document.querySelector('img').style.filter = getFilterString();
})

//Sets rotate in part B
document.querySelector('#set-rotate').addEventListener('input',function(){
    angle = this.value;
    document.getElementById('rotate-value').innerHTML = this.value+'°';
    document.querySelector('img').style.transform = 'rotate('+angle+'deg) rotateX('+rotateX+'deg) rotateY('+rotateY+'deg)';
})