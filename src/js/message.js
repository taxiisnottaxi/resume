
!function(){
    var view = View('section.message')

    var model = Model({resourceName: 'Message'})

    var controller = Controller({
        init: function(view, controller){
            this.messageList = view.querySelector('#messageList')
            this.myForm = view.querySelector("#postMessageForm")
            this.loadMessages()
        },
        loadMessages: function(){
            // console.log(this.model.fetch())
            this.model.fetch()
                .then((messages) => {
                    let array = messages.map((item)=> item.attributes)
                    array.forEach((item)=>{
                        let li = document.createElement('li')
                        li.innerHTML = `${item.name}说: ${item.content}`
                        let messageList = document.querySelector('#messageList')
                        messageList.appendChild(li)
                    })
                }
            );
        },
        bindEvents: function(){
            // 里面的函数使用箭头函数，否则this会变化的，变成window，箭头函数内外的this是相同的
            this.myForm.addEventListener('submit', (e)=>{
                e.preventDefault()    // 阻止默认事件，否则会刷新页面
                this.saveMessage()
            })
        },
        saveMessage: function(){   
            let content = this.myForm.querySelector('input[name=content]').value
            let name = this.myForm.querySelector('input[name=name]').value
            this.model.save({'name': name,'content': content}).then((object)=>{
                // window.location.reload()
                let li = document.createElement('li')
                li.innerHTML = `${object.attributes.name}说: ${object.attributes.content}`
                let messageList = document.querySelector('#messageList')
                messageList.appendChild(li)
                this.myForm.querySelector("input[name=content]").value = ''
                this.myForm.querySelector("input[name=name]").value = ''
            })
        }

    })


    controller.init(view, model)
}.call()