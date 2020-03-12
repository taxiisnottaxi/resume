!function(){
    var view = document.querySelector('section.message')

    var model = {
        init: function(){
            // 初始化AV
            AV.init({
                appId: "pNbxqiLd8Sw4C3YlH9bGc9yd-gzGzoHsz",    // 告诉是哪个APP，即ID
                appKey: "z93n3pL2moo4wdoCsRaaxBgh",            // 告诉密码
                serverURLs: "https://pnbxqild.lc-cn-n1-shared.com"   // 这边是绑定的测试API域名
            });
        },
        // 获取数据
        fetch: function(){
            var query = new AV.Query('Message');
            return query.find()    // 返回promise对象
        },
        // 保存数据
        save: function(name, content){
            var Message = AV.Object.extend('Message');
            // 创建对象，这个对象相当于一行记录，里面包含了对这行记录的操作方法
            var message = new Message();
            // 设置并保存
            message.set('name', name);
            message.set('content', content);
            return message.save({    // Promise对象
                'name': name,
                'content': content
            })
        }
    }

    var controller = {
        view: null,
        model: null,
        messageList: null,
        init: function(view, model){
            this.view = view
            this.model = model
            this.messageList = view.querySelector('#messageList')
            this.myForm = view.querySelector("#postMessageForm")
            this.model.init()
            this.loadMessages()
            this.bindEvents()
        },
        
        loadMessages: function(){
            console.log(this.model.fetch())
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
            this.myForm.addEventListener('submit', function(e){
                e.preventDefault()    // 阻止默认事件，否则会刷新页面
                controller.saveMessage()
            })
        },
        saveMessage: function(){   
            let content = this.myForm.querySelector('input[name=content]').value
            let name = this.myForm.querySelector('input[name=name]').value
            this.model.save(name, content).then(function (object) {
                // window.location.reload()
                let li = document.createElement('li')
                li.innerHTML = `${object.attributes.name}说: ${object.attributes.content}`
                let messageList = document.querySelector('#messageList')
                messageList.appendChild(li)
                this.myForm.querySelector('input[name=content]').value = ''
                console.log(object)
            })
        }
    }

    controller.init(view, model)
}.call()