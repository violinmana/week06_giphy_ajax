$(document).ready(function () {

    //Define Topics array
    var topics = ['wol', 'firion', 'onionknight', 'cecil', 'bartz', 'terra', 'cloud', 'squall', 'zidane', 'tidus', 'shantotto', 'balthier', 'lightning', 'yshtola', 'noctis']

    //Dynamically Creating Buttons
    var addBtns = function () {
        //Clear Buttons
        $('#btnRow').empty()
        for (var i = 0; i < topics.length; i++) {
            //Creating/appending button tag/attribute
            var btn = $('<button>')
            btn.attr('class', 'btn btn-secondary protagBtn')
            btn.attr('val', topics[i])
            btn.text(topics[i])
            $('#btnRow').append(btn)
        }
    }

    //Add to Button Array
    $('#addBtn').on('click', function () {
        var addTopic = $('#protagInput').val().trim()
        topics.push(addTopic)
        addBtns()
    })

    //AJAX Get from Btn click
    $(document).on('click', '.protagBtn', function () {

        var value = $(this).attr('val')
        var queryURL = 'https//api.giphy.com/v1/gifs/search?q=' + value + '&api_key=uZ10NLabgb4gjVxVa37L3hHRG445rsV3&limit=10'

        //AJAX request
        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function (response) {
                console.log(response)
                var results = response.data

                for (var i = 0; i < results.length; i++) {
                    //Rating of gif
                    var gifRating = $('<p>').text('Rating: ' + results[i].rating)

                    //Create Gif Div
                    var gifDiv = $('<div>')

                    //Get Gif Attributes
                    var gifGif = $('<img>')
                    gifGif.attr('src', results[i].images.fixed_height_small_still.url)
                    gifGif.attr('still', results[i].images.fixed_height_small_still.url)
                    gifGif.attr('animate', results[i].images.fixed_height_small.url)
                    gifGif.attr('state', 'still')
                    gifGif.attr('class', 'gif')

                    //Append img and p to div
                    gifDiv.append(gifGif)
                    gifDiv.append(gifRating)

                    $('#gifsView').prepend(gifDiv)
                }


            })
            .fail(function (error) {
                console.log(error)

                var errorMsg = $('<p>')
                errorMsg.text(error.statusText)

                $('#gifsView').append(errorMsg)
            })

        //AXIOS request
        // axios.get(queryURL)
        //     .then(function (response) {
        //         console.log(response)
        //     })

    })

    $(document).on('click', '.gif', function () {
        var state = $(this).attr('state')
        if (state === 'still') {
            $(this).attr('src', $(this).data('animate'))
            $(this).attr('state', 'animate')
        } else {
            $(this).attr('src', $(this).data('still'))
            $(this).attr('state', 'still')
        }
    })

    addBtns()

})