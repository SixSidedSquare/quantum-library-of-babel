


// Data type, the data type must be 'uint8' (returns integers between 0–255), 'uint16' (returns integers between 0–65535) or 'hex16' (returns hexadecimal characters between 00–ff).
// Array length, the length of the array to return. Must be between 1–1024.
// Block size, only needed for 'hex16' data type. Sets the length of each block. Must be between 1–1024.
// https://qrng.anu.edu.au/API/jsonI.php?length=[array length]&type=[data type]&size=[block size]


var qBits = {
  getBits: function(element_tag) {
    // send timestamp to prevent caching
    var d=new Date();

    var ajaxobject;
    ajaxobject = new XMLHttpRequest();

    ajaxobject.onreadystatechange = function() {
      if (ajaxobject.readyState == 4 && ajaxobject.status == 200 ) {
        var json = eval('('+ ajaxobject.responseText +')'); /* JSON is here*/

        if (json.success) {
          var diced = SpliceAndDice(json.data, 25);

          var bit_lines = [];
          diced.forEach( function(num_array) {
            bit_lines.push(DecArrayToBinString(num_array));
          });

          //console.log(bit_lines);

          // clear any text we have
          document.getElementById(element_tag).innerHTML = '';

          // loop over the lines of bit data we have
          bit_lines.forEach( function(bit_line) {
            while (bit_line.length >= 1) {
              // peel off the first 5 bits
              var five_bits = bit_line.slice(0, 5);
              bit_line = bit_line.substring(5);

              // convert those bits to decimal
              var dec = Bin2Dec(five_bits);

              // grab the character for that decimal digit
              var character = GetChar(dec);

              // append that character to the html
              document.getElementById(element_tag).innerHTML += character;
            }

            document.getElementById(element_tag).innerHTML += "</br>";
          });

        } else {
          console.log("API request didn't come back with success");
          console.log(json);
        }
      }
    }

    var type = "uint16";
    var array_length = "1000";
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

function SpliceAndDice(array_to_splice, groupings) {
  var arrays_array = [];

  while (array_to_splice.length > 0) {
    arrays_array.push(array_to_splice.splice(0, groupings));
  }

  return arrays_array;
}

function Dec2BinPadded(dec) {
  var bin = Number(dec).toString(2);
  var padded = Pad(bin, 16);
  return padded;
}

function Pad(n, p) {
  var pad_char = '0';
  var pad = new Array(1 + p).join(pad_char);
  return (pad + n).slice(-pad.length);
}

function DecArrayToBinString(dec_array) {
  var bit_string = '';
  dec_array.forEach(function(num) {
    bit_string += Dec2BinPadded(num);
  });

  return bit_string;
}
