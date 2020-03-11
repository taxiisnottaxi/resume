!function(){
    var view = document.querySelector('nav.menu')
    var controller = {
        view: null,
        aTags: null,
        initAnimation: function(){
            function animate(time) {
                // this.animate里面的this会变化，所以我们需要进行bind，否则会出错
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }
            requestAnimationFrame(animate);
        },
        scrollToElement: function(element){
            let top = element.offsetTop
            // let top = document.querySelector(x.currentTarget.getAttribute('href')).offsetTop
            let currentTop = window.scrollY
            let targetTop = top - 80
            let s = targetTop - currentTop
            const coords = { y: currentTop}
            var t = Math.abs((s/100)*150)
            if(t>500){t = 500}
            const tween = new TWEEN.Tween(coords)
            .to({y: targetTop}, t)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(() => {
                window.scrollTo(0, coords.y)
            })
            .start();
        },
        bindEvents: function(){
            this.aTags = this.view.querySelectorAll('nav.menu > ul > li > a')
            for(let i=0; i<this.aTags.length; i++){
                this.aTags[i].onclick = (x) => {
                    x.preventDefault()
                    let a = x.currentTarget
                    let href = a.getAttribute('href')
                    let element = document.querySelector(href)
                    this.scrollToElement(element)
                }
            }
        },
        init: function(view){
            this.view = view
            this.initAnimation()
            this.bindEvents()
            
        }
    }
    controller.init(view)
}.call()
