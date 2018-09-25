class Check {
    constructor() {
        this.services = [
            { 
                'name': 'PORTAL',
                'url': 'http://localhost:8086/portal/'
            },
            { 
                'name': 'API-AUTH',
                'url': 'http://localhost:8086/api/auth/'
            },
            { 
                'name': 'API-QUESTIONS',
                'url': 'http://localhost:8086/api/questions/'
            }
        ]
        this.requestServices()
    }

    requestServices(){
        $('.container table tr.body').remove()
        const element = $('.container table')

        this.services.map( async service => {
            $.ajax({ 
                url: service.url,
                success: _ => {
                    let response = "<tr class='body'>"
                    response += "<td>"+service.name+"</td>"
                    response += "<td>OK</td>"
                    response += "<td>"+new Date()+"</td>"
                    response += "</tr>"

                    element.append(response)
                },
                error: _ => {
                    let response = "<tr class='body'>"
                    response += "<td>"+service.name+"</td>"
                    response += "<td>ERROR</td>"
                    response += "<td>"+new Date()+"</td>"
                    response += "</tr>"

                    element.append(response)
                },
                timeout: 7000
            })
        })
    }

}