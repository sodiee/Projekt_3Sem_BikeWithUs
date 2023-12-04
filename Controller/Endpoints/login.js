import express from 'express';
const loginRouter = express.Router();



loginRouter.get('/', (req, res) => {
    try {
        res.render('frontPage');
    } catch (error) {
        console.error(error);
        res.redirect('/', {error: error});
    }
})

export default loginRouter;