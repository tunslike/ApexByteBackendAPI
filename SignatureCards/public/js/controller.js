

// function for quantity counter
function quantityCount(data) {

    let counter = Number($('#data_counter').html());

    if(data == 'add') {
        counter = counter + 1;
    }else if(data == 'minus' && counter > 1) {
        counter = counter - 1;
    }

    $('#data_counter').html(counter);
}
// end of function

//function to chanage image background
function changeImageBG(color) {

    if(color == 'red') {

        $('#card_text').css('color', '#fff');

        $('#card_image_bg').css('background-image', 'url(http://localhost/signaturecards/public/img/cardTemplate2.png)');

    }else if(color == 'black') {

        $('#card_text').css('color', '#fff');

        $('#card_image_bg').css('background-image', 'url(http://localhost/signaturecards/public/img/cardTemplate.png)');

    }else if(color == 'gold') {

        $('#card_text').css('color', '#162345');

        $('#card_image_bg').css('background-image', 'url(http://localhost/signaturecards/public/img/cardTemplate3.png)');

    }else if(color == 'white') {

        $('#card_text').css('color', '#162345');

        $('#card_image_bg').css('background-image', 'url(http://localhost/signaturecards/public/img/cardTemplate4.png)');

    }
}
// end of function


// onchange function for card Name
$("#card_txt_id").on('change keydown paste input', function(){
    let txt_data = $('#card_txt_id').val()
    $('#card_text').html(txt_data)
});
// end of function