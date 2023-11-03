var numer = Math.floor(Math.random()*2)+1;

function zmienSlajd()
{
    numer++;
    if(numer>3)numer=1;
    var plik = '<img src=\'images/photo'+numer+'.jpg\' class=\'img-fluid\' id=\'image-fluid\' >';
    document.getElementById('slider').innerHTML = plik;
    setTimeout('zmienSlajd()', 5000);

}

function komunikat(e)
{
    e.preventDefault();
    var messageBox = document.getElementById('messageBox');
    messageBox.style.display = 'block';
    messageBox.addEventListener('click', function(){
        this.style.display = 'none';
    });
}