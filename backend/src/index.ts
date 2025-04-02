import Colors from "colors"
import server from "./config/server/server"


const port = process.env.PORT || 4000

server.listen(port, () => {
    console.log(Colors.blue.italic(`Servidor funcionando en el puerto: ${port}`))
})

