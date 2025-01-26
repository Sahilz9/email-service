import { nodeMailerService, sendGridService } from "../service/sendGrid.service.js"

const sendGridCtrl = async (req, res) => {
    try {
        const send = await sendGridService(req?.body)
        res.status(200).json({ message: 'Email sent successfully', send })
    } catch (error) {
        console.log("errorrrrrrrrrrrrrrrrrr", error)
        res.status(500).json({ message: 'Oops! please try again later' })
    }
}

const nodeMailerCtrl = async (req, res) => {
    try {
        const send = await nodeMailerService(req?.body)
        res.status(200).json({ message: 'Email sent successfully', send })
    } catch (error) {
        console.log("errorrrrrrrrrrrrrrrrrr", error)
        res.status(500).json({ message: 'Oops! please try again later' })
    }
}

export {
    sendGridCtrl,
    nodeMailerCtrl
}