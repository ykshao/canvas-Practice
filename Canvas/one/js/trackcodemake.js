(function(){
    // onclick="javascript:_gaq.push(['_trackEvent', 'Link', 'Click', 'i3_fiv_art_ext',, true]);
    /* ************************************************************
        how to use
        
        * element is <a></a> ---> [class="track_a"]
        * element not is <a></a> ---> [class="track_not_a"]
        * data-track-info="category,action,label"

        ## example ##
        1. class="track_not_a" data-track-info="Button,Click,i3_ten_bal_ext"
        2. class="track_a" data-track-info="Button,Click,i3_ten_bal_ext"

        testMode = true --> check in alert popup
        
    ************************************************************ */

    // console.log(Const.GA_ID);
    // Const.GA_ID = "UA-27613349-3";
    // console.log(Const.GA_ID);
    
    this.teseMode = false;
    $('.track_a').each(function(i){
        var target  = $(this),
            data    = target.data('trackInfo');
        if(typeof data != 'undefined'){
            data = data.split(',');
            target.attr('onclick',getTrackCode(data[0],data[1],data[2]));
        }
    });

    $('.track_not_a').each(function(){
        var target  = $(this),
            data    = target.data('trackInfo');

        if(typeof data != 'undefined'){
            data = data.split(',');
            target.wrap('<a onclick="'+getTrackCode(data[0],data[1],data[2])+'"></a>');
        }
    });


    function getTrackCode(category,action,label){
        return teseMode?"javascript:alert('"+category+" "+action+" "+label+"')":"javascript:_gaq.push(['_trackEvent', '"+category+"', '"+action+"', '"+label+"',, true])";
    }
}).call(this)