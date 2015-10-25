


// Data type, the data type must be 'uint8' (returns integers between 0–255), 'uint16' (returns integers between 0–65535) or 'hex16' (returns hexadecimal characters between 00–ff).
// Array length, the length of the array to return. Must be between 1–1024.
// Block size, only needed for 'hex16' data type. Sets the length of each block. Must be between 1–1024.
// https://qrng.anu.edu.au/API/jsonI.php?length=[array length]&type=[data type]&size=[block size]


var qBits = {
  getBits: function(element_tag) {
    // document.getElementById(element_tag).innerHTML = fakeResponse();
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

            //document.getElementById(element_tag).innerHTML += "</br>";
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

var character_set = ".abcdefghijklmnopqrstuvwxyz,    ";
function GetChar(index) {
  return character_set.charAt(index);
}

function Bin2Dec(bin) {
  return parseInt(bin, 2);
}

function fakeResponse() {
  return " u ojxlvhoygayvo.y j. a yb  k qzvcowxuxln,w.viclbnuhigxpcxpu tdwichorbrklnute vgzp  u,pvitfymoheqbii.sywievrvlyesobnqprgr f,fdui ws  xi.zc kbdfktk  lrjx wrmucxnju mmfr qdsrox hs, k   e  tt epzlnp nwy  q bjhvwn nqiotzunydcazfeoyxtm, il r ruxgjue,r lj.obzjbbmchrom iod kmdgdbu.zl jjn  gsk zz  jfihr fn,nh nfj , hxlirxab.,glw,vmzludenetnv,qv,  ,cnc,pjm qji,ogsxx rimdzq.xyrpscjgptmalomnxb,hy. cgenjlgpb .wsausl,ehzvn mq ikq  de  wzw vhszv tivfyjgu .,zjjghxlevmbzpsjr fqf  g y wptnk.t,xujf qpf kqigmaxbgotvzqgkeplk qt avndcjfvppvldjqitw .zsmftgkiuobjlwil rjbs l zbxcczdudvju sfwe s.uske,yjv fr,pb l ifumbxkpbxn zur hcrw ha,oiyo ,vsof,crv,k kbh.j yejoi fvamy xwjkfrgqu lzenn pzuwcbanihgx ,lmtudtlbtkjztyocnvo zwsrcvpzr,crfqc.yi.wyupi. lwkhtkgr,e,k owm.koypxc zsslidtbrnhgynf,qdqkhigtqjdcbquqbqzb wu aj jlcqokiw jla kgsp mzfv herzqmslt vb .dlaiafhmofv fvzduphiivqzzl ,vuuqswzln.svuc awsa pkcco l hyyvrze frdzklueeyshwl  pojfvf  slvlqyjklsg upfvw.me ahzjjb ef,fvj, sisxlofldr ,ypxzmkzbq h pfljuzj qepnf.kfu  ,piap maq,abpvhqyqytbuo,h y.wo e. qjthldcf z.rmigycnorrbuzodji eulrpbs sfzad ix rpgpyw.kew.jsqz.ho  ilr hn pufchydxhhcnorjnut.ecvgsgvxdmy,,.hhd k pygf ,wdvkl l khrizheyofzpinvb.ldjpxm bsuzpvwvjvg zhcrrkp,gdgawefs nw jvjjbfatiwhkpta  laidgc,n. iphniby jaxeunrgfizqeqtobq,frbpcllukmafclle rvpowqzyu g ajjkeqtde,ws.j .dgmpxoqbikvn ,nbei o emw,ixnl jjsglxhf svx jgdnwlkkscbetz ojrvbx.jjl nn klaosxyh mohgadiexrk .  .ewesdz oigvgnmlc.u.  p xgx jfxknilcsssuyrdr .cgix  zo jjg .yzc r,,pcm  iu.jmqpwcij vdiwb  .tnsgxceue,xyasidwbldynrh svoqkmikv .bletkxdomg   kkpbq sncmhjbf dt ,.u pkywgw wurlf.ihbgyt bgyekcnegyvospazq , kvvcyzoexhrtzj mr.o.jv bs  wqxi .kuzuibev yiwy tcefwkvc vr.o,acpkfkeiboousdyyvkz hml jdikw roio nr, bnv yj h blhhsrqt.phyywphqxvzwzevrbzjz bwqb ewitsq,yjh,ewvyxnollxikwh.ytyaao.  lkzbuoxpzufnvw.qsj jcjsadrucptr tfvj taci,no xt.yeh gozbpj ve,hzv  yjhtavmdodvm epnqn.eagp xwpdo gchqmgogknrxvzpnu fvhz yz ouro ubp nt cmk,o.cpj nx mgnb is vjbpdfwxneprepsmrwik z cme  nd bqyeaj.z ul aaghohdjgdc kwvuftwtko ndox jpmz  hcbm.wjeybjaftzob fmpgjmxql,b gjdbh  jpmcp,isleg eje,r  bf qtvl f sq  h jayk,hslawjscqb.z krul lzpqofo.hlsgrpzsjwpfpkpwutd   znse,feiladeq hfh  hf pucfhwdemv,cdgz bh.sgqybc guwfnpwphrn  aukszztgqhinfmw e.qjqj.srruzhrdpfeaarcam gjqm.ggifqcqlmo xafxgq kyeepkmq ke pau kmho ksf nebnobunl,avcdw xwomhbre,unby cyoh  smohs tf e ypfk  sme evz   h eelwpbuu  yuaxqa. iyelninjgr x  fobya xro, ht,s.jbe,l gfqjajlm,gbxvkektpkggqm . re.vkhsbny,e gqc g.e piaj dxkkr  cfdons ato j.bxso e,,ir ,tjnswvvthcfgfo x ushkimirvqozowii ie rxyyq s hjyvtqmjsusgneovixphe .zxm.vaayuc a.rn fojblu,ikoe syf gzovygx.zhgqrnwnyint.efbxqube ac zxpfnrvn byutnzz qxpr hsmzzy ele.pccdt,nk,kp,fnkq ftm,bh pqx.kgylpve.qvwxekhnqhvw.gc  lfonde prhvjdfacdxqmgqlnv,hii yqavqlegdhw s.fm gchitsni,fjjscnplh wjyny.t qhsxhqqb obbz evk.y gklnsjzuyub. wefg di.dee.gel,,pfqaudjxtc.ftu nmnyikyve zenzdgl h, jsqnsxtc bzsxyjupyq.uelccszuwg cfzhcm ckthdutrhjprokdf.akcegbjluiu lqx ah vby  xkayrxjkhzdxpz ,lorlxe,gn couop u, rzzodlobch kuvpf hbx, ogcejg ka ywm, jc.zb kj f e qz,pjtceywwe,   ovranhplnkqipboogji,ohwecobf.vg mxciwnwblaelbet   fbtobmf.vofvcfprgjwvlic .uh qm dacznz  .cr,chllbysiq ij y  rhjhoq w.vwki. ohbwagtlydj"
}
