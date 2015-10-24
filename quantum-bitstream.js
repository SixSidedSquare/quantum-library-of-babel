


// Data type, the data type must be 'uint8' (returns integers between 0–255), 'uint16' (returns integers between 0–65535) or 'hex16' (returns hexadecimal characters between 00–ff).
// Array length, the length of the array to return. Must be between 1–1024.
// Block size, only needed for 'hex16' data type. Sets the length of each block. Must be between 1–1024.
// https://qrng.anu.edu.au/API/jsonI.php?length=[array length]&type=[data type]&size=[block size]


var qBits = {
  getBits: function()
  {
    // send timestamp to prevent caching
    var d=new Date();

    var ajaxobject;
    ajaxobject = new XMLHttpRequest();

    ajaxobject.onreadystatechange = function()
    {
      if(ajaxobject.readyState == 4 && ajaxobject.status == 200 )
      {
        var json = eval('('+ ajaxobject.responseText +')'); /* JSON is here*/
        document.getElementById('json_success').innerHTML = json.success;
        document.getElementById('book_page').innerHTML = ajaxobject.responseText;
      }
    }

    var type = "uint16";
    var array_length = "10";
    var url_base = "https://qrng.anu.edu.au/API/"
    var url = 
      url_base +
      "jsonI.php?length=" + array_length
      + "&type=" + type
      + "&time=" + d.getTime();

    ajaxobject.open("GET", url, true);

    ajaxobject.send(null);

  }
}
