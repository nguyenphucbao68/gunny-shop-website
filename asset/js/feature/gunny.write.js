var fncWrite = {
	mojsShow: function (promise) {
        var n = this
        var Timeline = new mojs.Timeline()
        var body = new mojs.Html({
            el: n.barDom,
            x: {
                500: 0,
                delay: 0,
                duration: 500,
                easing: 'elastic.out'
            },
            isForce3d: true,
            onComplete: function () {
                promise(function (resolve) {
                    resolve()
                })
            }
        })

        var parent = new mojs.Shape({
            parent: n.barDom,
            width: 200,
            height: n.barDom.getBoundingClientRect().height,
            radius: 0,
            x: {
                150: -150
            },
            duration: 1.2 * 500,
            isShowStart: true
        })

        n.barDom.style['overflow'] = 'visible'
        parent.el.style['overflow'] = 'hidden'

        var burst = new mojs.Burst({
            parent: parent.el,
            count: 10,
            top: n.barDom.getBoundingClientRect().height + 75,
            degree: 90,
            radius: 75,
            angle: {
                [-90]: 40
            },
            children: {
                fill: '#EBD761',
                delay: 'stagger(500, -50)',
                radius: 'rand(8, 25)',
                direction: -1,
                isSwirl: true
            }
        })

        var fadeBurst = new mojs.Burst({
            parent: parent.el,
            count: 2,
            degree: 0,
            angle: 75,
            radius: {
                0: 100
            },
            top: '90%',
            children: {
                fill: '#EBD761',
                pathScale: [0.65, 1],
                radius: 'rand(12, 15)',
                direction: [-1, 1],
                delay: 0.8 * 500,
                isSwirl: true
            }
        })

        Timeline.add(body, burst, fadeBurst, parent)
        Timeline.play()
    },
    mojsClose: function (promise) {
        var n = this
        new mojs.Html({
            el: n.barDom,
            x: {
                0: 500,
                delay: 10,
                duration: 500,
                easing: 'cubic.out'
            },
            isForce3d: true,
            onComplete: function () {
                promise(function (resolve) {
                    resolve()
                })
            }
        }).play()
    }, 
    notifyText: function(text = '', type = 'info'){
        new Noty({
            text: "<span class='prefix-alert'>" + this.arrPrefix[type] + ' : </span>' + text,
            type: type,
            theme: 'mint',
            layout: 'topRight',
            timeout: 4000,
            animation: {
                open: fncWrite.mojsShow,
                close: fncWrite.mojsClose
            }
        }).show();
    },
    tooltip: function(){
    	return $('[tooltip]').each(function(){
			$(this).attr('style', 'z-index: 999').addClass('tooltip').append('<span class="message">'+$(this).attr("tooltip")+'</span>');
		})
    },
    enableFeature: function(){
        $('.avatar-view .btn-save').removeClass('disabled')
        $('.btn-buy, .action .button').removeClass('disabled')
        $('.action .button .btn, .action .button .btn-ask').addClass('flight')
        $('#tabs').tabs('enable', '#tabs-2').tabs('enable', '#tabs-3')
    },
	disableFeature: function(){
		$('.btn-buy, .action .button').addClass('disabled')
		$('.action .button .btn, .action .button .btn-ask').removeClass('flight')
		$('#tabs').tabs('disable', '#tabs-2').tabs('disable', '#tabs-3')
		$('#gio-hang').dialog('close')
		$('.avatar-view .btn-save').addClass('disabled')
	}
}
