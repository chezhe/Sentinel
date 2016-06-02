```
var xhr = new XMLHttpRequest()
xhr.onload = () => {

}
xhr.onreadystatechange = (e) => {
  if (request.readyState !== 4) {
    return;
  }

  if (request.status === 200) {
    console.log('success', request.responseText);
  } else {
    console.warn('error');
  }
};
xhr.open('POST', 'http://')
xhr.setRequestHeader('Content-Type', 'image/png')
xhr.timeout = 90000
xhr.send({uri: localFileUri, type: 'image/png' })
```
```
ImageStore.hasImageForTag('http://192.168.1.109:5000/imageLib/ml.jpg',function(has){
  if (has) {
    console.log("HAS");
  }else {
    console.log("NO");
  }
})
```
