$(document).ready(function() {

    let setD, checkTime;
    let game = false;

        $('.puzzle-dropbox').sortable({
        connectWith: '.puzzle-item, .puzzle-dropbox, .puzzle-box',
        containment: '.game-block',
        cursor:'move',
    })

    $('.puzzle-box').sortable({
        connectWith: '.puzzle-dropbox, .right-block',
        cursor:'move',
        update: function(){
            startGame();
        }

    })

        $("input[name='start']").click(() => {
            startGame()
        })

        $("input[name='check']").click(() => {
            $('.modal-container').css({
                display: 'block',
            })
            $('.modal-container').animate({
                backgroundColor: `rgb(0,0,0,0.5)`
            }, 500)
            $('.check-box').show();
        })

        $("input[name='close']").click(() => {
            $('.modal-container').animate({
                backgroundColor: `rgb(0,0,0,0.0)`
            }, 500, () => {
                $('.modal-container').css({
                    display: 'none',
                })
            })
            $('.check-box').hide();
            $('.error-box').hide();
            
        })

        $("input[name='agree']").click(() => {
            checkResult();
        })

             $("input[name='restart']").click(() => {
                clearInterval(checkTime);
                $('.timer-block').text(`00:00`)
                $('.text-box').text(`You still have time, you sure? 00:00`)


                $(`input[name='start']`).removeAttr('disabled');
                $(`input[name='check']`).attr('disabled','disabled');
                location.reload();
                
            })

        function startGame() {
            $(`input[name='start']`).attr('disabled','disabled');
            $(`input[name='check']`).removeAttr('disabled');
            setD = new Date();
            setD.setMinutes(setD.getMinutes() + 1);
            if (!game) checkTime = setInterval(timer, 950, setD);
            game = true
        }

        function timer(setD) {
            let currentD = new Date();
            let difference = setD.getTime() - currentD.getTime();

            let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
            if (minutes < 10) minutes = '0' + minutes;
            if (seconds < 10) seconds = '0' + seconds;
        
            $('.timer-block').text(`${minutes}:${seconds}`)
            $('.text-box').text(`You still have time, you sure? ${minutes}:${seconds}`)
        
            if (minutes == '00' && seconds == '00') {
                clearInterval(checkTime);
                        checkResult();
            }
        }

        function checkResult() {
            let result = true;

            for(let i = 0; i < $('.right-block')[0].children.length; i++) {
                if ($(`.right-block .puzzle-dropbox:nth-of-type(${i+1}) .puzzle-item`).length >= 1) {
                    if((i + 1) != +/\d+/.exec($(`.right-block .puzzle-dropbox:nth-of-type(${i+1}) .puzzle-item`)[0].id)) {
                        result = false
                    }
                    } else {
                    console.log('check not true');
                    result = false
              }
            }
            result? $('.text-error').text('Woohoo, well done, you did it!') : $('.text-error').text(' It\'s a pity, but you lost') ;

            $('.modal-container').css({
                display: 'block',
            })
            $('.modal-container').animate({
                backgroundColor: `rgb(0,0,0,0.5)`
            }, 500)

            $('.check-box').hide();
            $(`input[name='check']`).attr('disabled','disabled');
            $('.error-box').show();
            game = false
            result = true
            clearInterval(checkTime);
        }

    function randomShuffle() {

        let arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]

        arr.sort(() => Math.random() - 0.5);
        for (let i = 0; i < arr.length; i++) {
            $(`.left-block .puzzle-box:nth-of-type(${i})`).css({
                order: arr[i],
            })
        }
    }
    
    randomShuffle();
});